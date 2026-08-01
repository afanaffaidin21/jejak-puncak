import "server-only";

const LOCAL_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(value: string) {
  const url = new URL(
    value.startsWith("http://") || value.startsWith("https://")
      ? value
      : `https://${value}`,
  );

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Unsupported site URL protocol.");
  }

  return url.origin;
}

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  return configuredUrl ? normalizeSiteUrl(configuredUrl) : LOCAL_SITE_URL;
}
