const MISSING_ENVIRONMENT_MESSAGE =
  "Supabase environment variables are missing. Copy .env.local.example to .env.local and provide the project values.";

export function getSupabaseEnvironment() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !publishableKey) {
    throw new Error(MISSING_ENVIRONMENT_MESSAGE);
  }

  return { url, publishableKey };
}
