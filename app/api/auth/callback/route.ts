
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const requestedNext = searchParams.get("next") ?? "/dashboard";

  // Prevent redirects to external websites.
  const next =
    requestedNext.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/";

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", origin));
  }

  const supabase = await createClient();

  const { error: authError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (authError) {
    return NextResponse.redirect(
      new URL("/login?error=auth_callback_failed", origin)
    );
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user || !user.email) {
    return NextResponse.redirect(
      new URL("/login?error=user_not_found", origin)
    );
  }

  try {
  
const userRecord = await prisma.user.upsert({
  where: {
    email: user.email!.toLowerCase(),
  },
  update: {
    authUserId: user.id,
    name: user.user_metadata?.full_name ?? undefined,
  },
  create: {
    authUserId: user.id,
    email: user.email!.toLowerCase(),
    name: user.user_metadata?.full_name ?? null,
    role: "CANDIDATE",
  },
});

    // Ensure a candidate profile exists without duplicating it.
    await prisma.candidateProfile.upsert({
      where: { userId: userRecord.id },
      update: {},
      create: { userId: userRecord.id },
    });

    return NextResponse.redirect(new URL(next, origin));
  } catch (error) {
    console.error("User synchronization failed:", error);

    return NextResponse.redirect(
      new URL("/signup?error=profile_creation_failed", origin)
    );
  }
}
