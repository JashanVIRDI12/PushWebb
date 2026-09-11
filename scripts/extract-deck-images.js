/* One-off: pull the image XObjects out of the PUSHWebb capability deck and
   write them as PNG/JPEG, named by the deck page they sit on. */
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const PDF = process.argv[2];
const OUT = process.argv[3] || 'deck-images';
const buf = fs.readFileSync(PDF);
const s = buf.toString('latin1');
fs.mkdirSync(OUT, { recursive: true });

/* ── object index ───────────────────────────────────────────── */
const offsets = new Map();
for (const m of s.matchAll(/(?:^|[\s>])(\d+)\s+0\s+obj\b/g)) {
  offsets.set(Number(m[1]), m.index + m[0].indexOf(m[1]));
}

function rawObj(num) {
  const start = offsets.get(num);
  if (start === undefined) return null;
  const objStart = s.indexOf('obj', start) + 3;
  const end = s.indexOf('endobj', objStart);
  return s.slice(objStart, end === -1 ? objStart + 4000 : end);
}

function deref(token) {
  const m = /^\s*(\d+)\s+0\s+R\s*$/.exec(token);
  return m ? rawObj(Number(m[1])) : token;
}

/** Slice a balanced << … >> dictionary starting at `from`. */
function dictAt(str, from) {
  const open = str.indexOf('<<', from);
  if (open < 0) return null;
  let depth = 0;
  for (let i = open; i < str.length - 1; i++) {
    if (str[i] === '<' && str[i + 1] === '<') { depth++; i++; }
    else if (str[i] === '>' && str[i + 1] === '>') { depth--; i++; if (!depth) return str.slice(open, i + 1); }
  }
  return null;
}

function entry(dict, key) {
  const i = dict.indexOf('/' + key);
  if (i < 0) return null;
  const rest = dict.slice(i + key.length + 1);
  if (/^\s*<</.test(rest)) return dictAt(rest, 0);
  const m = /^\s*(\[[^\]]*\]|\/[A-Za-z0-9.#+-]+|\d+\s+0\s+R|-?[\d.]+|\([^)]*\))/.exec(rest);
  return m ? m[1] : null;
}

/* ── page order ─────────────────────────────────────────────── */
const catalog = [...s.matchAll(/\/Type\s*\/Catalog/g)]
  .map((m) => dictAt(s, s.lastIndexOf('<<', m.index)))
  .find(Boolean);
const rootRef = entry(catalog, 'Pages');

const pages = [];
(function walk(nodeSrc) {
  const dict = dictAt(nodeSrc, 0);
  if (!dict) return;
  if (/\/Type\s*\/Page\b/.test(dict)) { pages.push(dict); return; }
  const kids = entry(dict, 'Kids') || '';
  for (const k of kids.matchAll(/(\d+)\s+0\s+R/g)) walk(rawObj(Number(k[1])) || '');
})(deref(rootRef));

console.log('pages found:', pages.length);

/* ── image extraction ───────────────────────────────────────── */
function colorType(csRaw) {
  const cs = csRaw || '';
  if (/DeviceRGB/.test(cs)) return { type: 2, comps: 3 };
  if (/DeviceGray/.test(cs)) return { type: 0, comps: 1 };
  if (/ICCBased/.test(cs)) {
    const ref = /(\d+)\s+0\s+R/.exec(cs);
    const n = ref ? Number(entry(dictAt(rawObj(Number(ref[1])) || '', 0) || '', 'N') || 3) : 3;
    return n === 1 ? { type: 0, comps: 1 } : { type: 2, comps: 3 };
  }
  return null;
}

function png(width, height, comps, type, data) {
  const stride = width * comps;
  const rows = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    rows[y * (stride + 1)] = 0;
    data.copy(rows, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const chunk = (name, body) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(body.length);
    const tag = Buffer.concat([Buffer.from(name, 'latin1'), body]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(tag) >>> 0);
    return Buffer.concat([len, tag, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = type;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(rows, { level: 6 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

let crcTable = null;
function crc32(bufr) {
  if (!crcTable) {
    crcTable = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      crcTable[n] = c;
    }
  }
  let c = -1;
  for (let i = 0; i < bufr.length; i++) c = crcTable[(c ^ bufr[i]) & 0xff] ^ (c >>> 8);
  return c ^ -1;
}

function streamBytes(num) {
  const start = offsets.get(num);
  if (start === undefined) return null;
  const st = s.indexOf('stream', start);
  if (st < 0) return null;
  let b = st + 6;
  if (buf[b] === 13) b++;
  if (buf[b] === 10) b++;
  const dict = dictAt(s, start) || '';
  let len = Number(entry(dict, 'Length'));
  if (!Number.isFinite(len)) {
    const ref = /(\d+)\s+0\s+R/.exec(entry(dict, 'Length') || '');
    len = ref ? Number((rawObj(Number(ref[1])) || '').trim()) : NaN;
  }
  const end = Number.isFinite(len) && len > 0 ? b + len : s.indexOf('endstream', b);
  return { dict, bytes: buf.subarray(b, end) };
}

const manifest = [];

/** Page mapping only covers images referenced straight off a page's
 *  resources; the deck nests most of them in form XObjects, so the sweep
 *  below walks every image object in the file and the page number is a
 *  best-effort label. */
function dump(num, pageIdx) {
  const got = streamBytes(num);
  if (!got || !/\/Subtype\s*\/Image/.test(got.dict)) return;
  const w = Number(entry(got.dict, 'Width'));
  const h = Number(entry(got.dict, 'Height'));
  const bpc = Number(entry(got.dict, 'BitsPerComponent') || 8);
  const filter = entry(got.dict, 'Filter') || '';
  if (!w || !h || w < 200 || h < 150) return;
  if (manifest.some((m) => m.obj === num)) return;

  const label = pageIdx === null ? 'x' : String(pageIdx + 1).padStart(2, '0');
  const base = `p${label}_o${num}_${w}x${h}`;
  try {
    if (/DCTDecode/.test(filter)) {
      fs.writeFileSync(path.join(OUT, base + '.jpg'), got.bytes);
      manifest.push({ page: pageIdx === null ? null : pageIdx + 1, obj: num, w, h, file: base + '.jpg' });
    } else if (/FlateDecode/.test(filter) && bpc === 8) {
      const ct = colorType(entry(got.dict, 'ColorSpace'));
      if (!ct) return;
      const data = zlib.inflateSync(got.bytes);
      if (data.length < w * h * ct.comps) return;
      fs.writeFileSync(path.join(OUT, base + '.png'), png(w, h, ct.comps, ct.type, data));
      manifest.push({ page: pageIdx === null ? null : pageIdx + 1, obj: num, w, h, file: base + '.png' });
    }
  } catch (e) {
    /* unreadable stream: skip */
  }
}

pages.forEach((pageDict, pageIdx) => {
  let res = entry(pageDict, 'Resources');
  if (res && /^\s*\d+\s+0\s+R/.test(res)) res = dictAt(deref(res) || '', 0);
  if (!res) return;
  let xo = entry(res, 'XObject');
  if (xo && /^\s*\d+\s+0\s+R/.test(xo)) xo = dictAt(deref(xo) || '', 0);
  if (!xo) return;

  /* Follow the page's own XObjects, then one level into any form
     XObject's resources, which is where the deck keeps its grids. */
  const seen = new Set();
  const queue = [...xo.matchAll(/\/([A-Za-z0-9_.]+)\s+(\d+)\s+0\s+R/g)].map((m) => Number(m[2]));
  while (queue.length) {
    const num = queue.shift();
    if (seen.has(num)) continue;
    seen.add(num);
    const got = streamBytes(num);
    if (!got) continue;
    if (/\/Subtype\s*\/Image/.test(got.dict)) {
      dump(num, pageIdx);
      continue;
    }
    let inner = entry(got.dict, 'Resources');
    if (inner && /^\s*\d+\s+0\s+R/.test(inner)) inner = dictAt(deref(inner) || '', 0);
    if (!inner) continue;
    let innerXo = entry(inner, 'XObject');
    if (innerXo && /^\s*\d+\s+0\s+R/.test(innerXo)) innerXo = dictAt(deref(innerXo) || '', 0);
    if (!innerXo) continue;
    for (const m of innerXo.matchAll(/\/([A-Za-z0-9_.]+)\s+(\d+)\s+0\s+R/g)) queue.push(Number(m[2]));
  }
});

/* Sweep anything the page walk never reached. */
for (const num of [...offsets.keys()].sort((a, b) => a - b)) dump(num, null);

fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
const byPage = {};
manifest.forEach((x) => { byPage[x.page] = (byPage[x.page] || 0) + 1; });
console.log('extracted:', manifest.length);
console.log('per page:', byPage);
