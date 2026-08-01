import { NextResponse, type NextRequest } from "next/server";

import {
  addAuthAnalyticsEvent,
  getSafeRedirectPath,
} from "@/lib/auth/redirect";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const isGoogleFlow =
    request.nextUrl.searchParams.get("provider") === "google";
  const nextPath = getSafeRedirectPath(
    request.nextUrl.searchParams.get("next"),
  );

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const destination = isGoogleFlow
        ? addAuthAnalyticsEvent(nextPath, "google_success")
        : nextPath;

      return NextResponse.redirect(
        new URL(destination, request.nextUrl.origin),
      );
    }
  }

  const loginUrl = new URL("/login", request.nextUrl.origin);
  loginUrl.searchParams.set("next", nextPath);
  loginUrl.searchParams.set("error", "oauth_callback");
  if (isGoogleFlow) {
    loginUrl.searchParams.set("_auth_event", "google_failed");
  }

  return NextResponse.redirect(loginUrl);
}
