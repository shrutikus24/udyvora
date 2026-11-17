
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !user.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Only allow synchronization for verified email accounts.
    if (!user.email_confirmed_at) {
      return NextResponse.json(
        { error: "Please verify your email before syncing your profile." },
        { status: 403 }
      );
    }

    const normalizedEmail = user.email.toLowerCase();

    // First, find an existing user by Supabase Auth ID.
    let userRecord = await prisma.user.findUnique({
      where: {
        authUserId: user.id,
      },
    });

    if (!userRecord) {
      // If no Auth ID match exists, find the existing verified email.
      const existingUser = await prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

      if (existingUser) {
        // Link the existing Prisma record to the Supabase account.
        userRecord = await prisma.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            authUserId: user.id,
            name:
              user.user_metadata?.full_name ??
              existingUser.name,
          },
        });
      } else {
        // Create a new user only when no matching record exists.
        userRecord = await prisma.user.create({
          data: {
            authUserId: user.id,
            email: normalizedEmail,
            name: user.user_metadata?.full_name ?? null,
            role: "CANDIDATE",
          },
        });
      }
    } else if (userRecord.email !== normalizedEmail) {
      // Keep the email synchronized for an already linked account.
      userRecord = await prisma.user.update({
        where: {
          id: userRecord.id,
        },
        data: {
          email: normalizedEmail,
        },
      });
    }

    // Ensure the candidate profile exists.
    await prisma.candidateProfile.upsert({
      where: {
        userId: userRecord.id,
      },
      update: {},
      create: {
        userId: userRecord.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User profile synchronized successfully.",
    });
  } catch (error) {
    console.error("User sync error:", error);

    return NextResponse.json(
      { error: "Profile synchronization failed" },
      { status: 500 }
    );
  }
}
