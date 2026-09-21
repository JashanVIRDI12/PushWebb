import { CONTACT_EMAIL } from '@/lib/site';

/* Callback requests from the phone-number card on /contact.
 *
 * Mail goes out through Resend's REST API — one HTTPS call, no SMTP socket
 * to keep open and no npm dependency, which is what a serverless handler
 * wants. The key is server-only and never reaches the browser.
 *
 * Required: RESEND_API_KEY.
 * Optional: CALLBACK_TO_EMAIL, CALLBACK_FROM_EMAIL (see .env.example).
 *
 * POST is never cached, so the route needs no segment config. */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/** Wide enough for any real number, tight enough to reject prose. */
const PHONE_DIGITS = { min: 7, max: 15 };
const LIMITS = { name: 120, phone: 40, email: 200, note: 1000 };

/* A speed bump, not a wall: the counter lives in one server instance's
   memory, so it slows a single noisy client without pretending to be
   distributed rate limiting. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);

  // Keep the map from growing without bound on a long-lived instance.
  if (recent.size > 500) {
    for (const [key, times] of recent) {
      if (times.every((t) => now - t >= WINDOW_MS)) recent.delete(key);
    }
  }

  return hits.length > MAX_PER_WINDOW;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

function asString(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function fail(reason: string, status: number) {
  return Response.json({ ok: false, reason }, { status });
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return fail('Too many requests. Please try again shortly.', 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail('Malformed request.', 400);
  }

  const payload = (body ?? {}) as Record<string, unknown>;
  const name = asString(payload.name, LIMITS.name);
  const phone = asString(payload.phone, LIMITS.phone);
  const email = asString(payload.email, LIMITS.email);
  const note = asString(payload.note, LIMITS.note);

  // Honeypot: a real visitor never sees this field, so anything in it is a bot.
  // Answer 200 so the bot has nothing to learn from the response.
  if (asString(payload.company, 200)) {
    return Response.json({ ok: true });
  }

  if (!name) return fail('Please add your name.', 422);

  const digits = phone.replace(/\D/g, '');
  if (digits.length < PHONE_DIGITS.min || digits.length > PHONE_DIGITS.max) {
    return fail('Please enter a phone number we can reach you on.', 422);
  }

  // Optional — but a malformed address would break the Reply-To header,
  // so it is either usable or not sent at all.
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail('That email address does not look right.', 422);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // A missing key is a deployment problem, not the visitor's — say so
    // plainly in the log and let the form offer its fallbacks.
    console.error('[callback-request] RESEND_API_KEY is not set; request was not delivered.');
    return fail('Callback requests are not configured right now.', 503);
  }

  const to = process.env.CALLBACK_TO_EMAIL || CONTACT_EMAIL;
  const from = process.env.CALLBACK_FROM_EMAIL || `PUSHWebb Website <noreply@pushwebb.com>`;

  const received = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Dubai',
  }).format(new Date());

  const lines = [
    `Name:  ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || 'Not provided'}`,
    note ? `About: ${note}` : null,
    '',
    `Received: ${received} (Dubai time)`,
    'Source: pushwebb.com/contact — "Leave your number" card',
  ].filter(Boolean);

  // Kept deliberately close to the EmailJS template, so a lead delivered by
  // the fallback path looks no different from one delivered by the primary.
  const html = `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f1f3f7;padding:32px 12px;font-family:Helvetica,Arial,sans-serif">
  <tr><td align="center">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border:1px solid rgba(11,26,43,0.10);border-radius:14px;overflow:hidden">
      <tr><td style="height:3px;background:#b8860b;font-size:0;line-height:0">&nbsp;</td></tr>
      <tr><td style="padding:24px 32px 0">
        <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.22em;color:#0b1a2b">PUSHWEBB</p>
      </td></tr>
      <tr><td style="padding:20px 32px 0">
        <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8c97a5">New callback request</p>
        <p style="margin:0;font-size:26px;font-weight:700;letter-spacing:-0.02em;color:#0b1a2b">${escapeHtml(
          name,
        )}</p>
      </td></tr>
      <tr><td style="padding:20px 32px 0">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f8f9fb;border:1px solid rgba(11,26,43,0.08);border-radius:10px">
          <tr><td style="padding:18px 20px">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8c97a5">Phone</p>
            <p style="margin:0 0 16px;font-size:22px;font-weight:700;letter-spacing:-0.01em">
              <a href="tel:${digits}" style="color:#0b1a2b;text-decoration:none">${escapeHtml(
                phone,
              )}</a>
            </p>
            <a href="tel:${digits}" style="display:inline-block;background:#0b1a2b;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:11px 22px;border-radius:8px;margin-right:8px">Call now</a>
            <a href="https://wa.me/${digits}" style="display:inline-block;background:#25D366;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:11px 22px;border-radius:8px">WhatsApp</a>
            <p style="margin:16px 0 0;padding-top:14px;border-top:1px solid rgba(11,26,43,0.08);font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8c97a5">Email</p>
            <p style="margin:4px 0 0;font-size:15px;color:#0b1a2b">${
              email
                ? `<a href="mailto:${escapeHtml(email)}" style="color:#0b1a2b">${escapeHtml(email)}</a>`
                : '<span style="color:#8c97a5">Not provided</span>'
            }</p>
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:16px 32px 0">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="border-left:3px solid #b8860b;padding:2px 0 2px 14px">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8c97a5">What they need</p>
              <p style="margin:0;font-size:15px;line-height:1.6;color:#0b1a2b">${escapeHtml(
                note || 'No extra details added.',
              )}</p>
            </td>
          </tr>
        </table>
      </td></tr>
      <tr><td style="padding:24px 32px 28px">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid rgba(11,26,43,0.08)">
          <tr><td style="padding-top:14px">
            <p style="margin:0;font-size:12px;line-height:1.7;color:#8c97a5">
              Received ${escapeHtml(received)} &middot; Dubai time<br>
              pushwebb.com/contact &mdash; &ldquo;Leave your number&rdquo; card
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </td></tr>
</table>
  `;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Callback request — ${name} (${phone})`,
        // Hitting reply reaches the visitor when they left an address.
        ...(email ? { reply_to: email } : {}),
        text: lines.join('\n'),
        html,
      }),
    });

    if (!response.ok) {
      // Resend's message says which side is wrong (unverified domain, bad
      // key, rejected address) — it belongs in the log, not in the browser.
      console.error(
        `[callback-request] Resend refused the send (${response.status}): ${await response.text()}`,
      );
      return fail('We could not send that just now.', 502);
    }
  } catch (error) {
    console.error('[callback-request] Could not reach Resend:', error);
    return fail('We could not send that just now.', 502);
  }

  return Response.json({ ok: true });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
