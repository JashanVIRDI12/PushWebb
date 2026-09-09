import { CLIENTS, type LiveStats } from '@/lib/clients';

/* Live YouTube stats for the client roster.
 *
 * Cached for six hours: the upstream quota is 10,000 units/day and these
 * numbers move slowly, so there is no reason to spend a unit per visitor.
 * Channels addressed by id are batched into one request (1 unit for all of
 * them); `forHandle` only accepts a single channel, so those cost 1 each.
 *
 * The key is server-only — it is never shipped to the browser. */
export const revalidate = 21600;

const ENDPOINT = 'https://www.googleapis.com/youtube/v3/channels';

type YouTubeChannel = {
  id: string;
  statistics?: {
    subscriberCount?: string;
    viewCount?: string;
    hiddenSubscriberCount?: boolean;
  };
};

type YouTubeResponse = { items?: YouTubeChannel[] };

function toNumber(raw?: string): number | null {
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function statsOf(channel: YouTubeChannel): LiveStats {
  return {
    // A channel can hide its subscriber count while still reporting views.
    subscribers: channel.statistics?.hiddenSubscriberCount
      ? null
      : toNumber(channel.statistics?.subscriberCount),
    views: toNumber(channel.statistics?.viewCount),
  };
}

export async function GET() {
  const key = process.env.YOUTUBE_API_KEY;

  // No key configured is a normal state, not an error: the roster falls back
  // to its hand-entered figures and the section renders exactly the same.
  if (!key) {
    return Response.json(
      { live: false, reason: 'YOUTUBE_API_KEY is not set', channels: {} },
      { status: 200 },
    );
  }

  const byId = CLIENTS.filter((c) => c.youtube?.channelId);
  const byHandle = CLIENTS.filter((c) => c.youtube?.handle && !c.youtube.channelId);
  const channels: Record<string, LiveStats> = {};

  try {
    // One request covers every id-addressed channel.
    if (byId.length) {
      const ids = byId.map((c) => c.youtube!.channelId!).join(',');
      const url = `${ENDPOINT}?part=statistics&id=${encodeURIComponent(ids)}&key=${key}`;
      const res = await fetch(url, { next: { revalidate } });
      if (res.ok) {
        const data = (await res.json()) as YouTubeResponse;
        for (const item of data.items ?? []) {
          const client = byId.find((c) => c.youtube!.channelId === item.id);
          if (client) channels[client.name] = statsOf(item);
        }
      }
    }

    // forHandle takes one channel per call, so these go out together.
    await Promise.all(
      byHandle.map(async (client) => {
        const handle = client.youtube!.handle!;
        const url = `${ENDPOINT}?part=statistics&forHandle=${encodeURIComponent(handle)}&key=${key}`;
        const res = await fetch(url, { next: { revalidate } });
        if (!res.ok) return;
        const data = (await res.json()) as YouTubeResponse;
        const item = data.items?.[0];
        if (item) channels[client.name] = statsOf(item);
      }),
    );
  } catch {
    // Upstream trouble should never take the section down with it.
    return Response.json(
      { live: false, reason: 'upstream request failed', channels },
      { status: 200 },
    );
  }

  return Response.json({ live: Object.keys(channels).length > 0, channels });
}
