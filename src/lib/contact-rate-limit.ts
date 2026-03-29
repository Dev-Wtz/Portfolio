/** In-memory sliding window per IP — best-effort on serverless (resets per instance). */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_SUBMISSIONS = 8;

interface BucketEntry {
  count: number;
  windowStart: number;
}

const bucket = new Map<string, BucketEntry>();

function pruneExpired(now: number): void {
  if (bucket.size < 200) return;
  for (const [ip, e] of bucket) {
    if (now - e.windowStart > WINDOW_MS) bucket.delete(ip);
  }
}

export function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real;
  return "unknown";
}

export function allowContactSubmission(ip: string): boolean {
  const now = Date.now();
  pruneExpired(now);
  let e = bucket.get(ip);
  if (!e || now - e.windowStart > WINDOW_MS) {
    e = { count: 1, windowStart: now };
    bucket.set(ip, e);
    return true;
  }
  if (e.count >= MAX_SUBMISSIONS) return false;
  e.count += 1;
  return true;
}
