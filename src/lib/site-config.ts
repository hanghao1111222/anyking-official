const LOCAL_SITE_URL = 'http://localhost:3000';

function sanitizeUrl(value: string | undefined): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.toString().replace(/\/$/, '');
  } catch {
    return null;
  }
}

export function getSiteUrl(): string {
  const fromEnv = sanitizeUrl(process.env.NEXT_PUBLIC_SITE_URL)
    || sanitizeUrl(process.env.SITE_URL);

  if (fromEnv) {
    return fromEnv;
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return LOCAL_SITE_URL;
}

export function getSiteMetadataBase(): URL {
  return new URL(getSiteUrl());
}
