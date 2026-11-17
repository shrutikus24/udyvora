"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validate() {
    const next: {
      name?: string;
      email?: string;
      password?: string;
    } = {};

    const trimmedName = name.trim();

    if (!trimmedName) {
      next.name = "Full name is required.";
    } else if (trimmedName.length < 2) {
      next.name = "Full name must be at least 2 characters.";
    }

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      next.email = "Email address is required.";
    } else if (!isValidEmail(trimmedEmail)) {
      next.email = "Please enter a valid email address.";
    }

    if (!password) {
      next.password = "Password is required.";
    } else if (password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setErrors({});

    if (!validate()) return;

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
            role: "CANDIDATE",
          },
          emailRedirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
        },
      });

      if (error) {
        let msg = error.message;

        if (
          msg.includes("already registered") ||
          msg.includes("already exists") ||
          msg.includes("duplicate")
        ) {
          msg =
            "An account with this email already exists. Please log in instead.";
        }

        setMessage(msg);
        return;
      }

      if (data.session) {
        const syncResponse = await fetch("/api/auth/sync", {
          method: "POST",
        });

        if (!syncResponse.ok) {
          setMessage(
            "Account created, but profile setup failed. Please try logging in."
          );
          return;
        }

        router.replace("/dashboard");
        router.refresh();
        return;
      }

      setMessage(
        "Account created! Please verify your email to continue. Check your inbox for the confirmation link."
      );
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f8ff] p-3 sm:p-5 lg:p-7">
      <div className="mx-auto grid min-h-[calc(100vh-24px)] max-w-[1440px] overflow-hidden rounded-[28px] border border-blue-100/80 bg-white shadow-[0_20px_80px_rgba(31,72,150,0.08)] sm:min-h-[calc(100vh-40px)] lg:grid-cols-[0.95fr_1fr]">
        {/* Left branded panel */}
        <section className="relative hidden overflow-hidden bg-[#0b1d43] px-12 py-12 text-white lg:flex lg:flex-col lg:justify-between xl:px-16">
          <div className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-3xl" />

          <Link href="/" className="relative z-10 inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-300 text-xl font-black text-[#0b1d43] shadow-lg shadow-blue-500/20">
              U
            </span>
            <span className="text-2xl font-bold tracking-tight">
              Udyvora<span className="text-cyan-300">.</span>
            </span>
          </Link>

          <div className="relative z-10 max-w-xl py-16">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/[0.07] px-4 py-2 text-xs font-semibold tracking-wide text-blue-100">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              MAKE YOUR NEXT MOVE
            </span>

            <h1 className="text-5xl font-semibold leading-[1.12] tracking-tight xl:text-6xl">
              Your journey.
              <br />
              <span className="bg-gradient-to-r from-cyan-200 via-blue-200 to-white bg-clip-text text-transparent">
                Your next move.
              </span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-8 text-blue-100/70">
              Find startups that inspire you, discover opportunities that
              match your skills and build a career on your terms.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-400/15 text-lg text-cyan-200">
                  ↗
                </div>
                <p className="text-sm font-semibold">Discover</p>
                <p className="mt-1 text-xs leading-5 text-blue-100/60">
                  Explore emerging startups.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-400/15 text-lg text-cyan-200">
                  ✦
                </div>
                <p className="text-sm font-semibold">Grow</p>
                <p className="mt-1 text-xs leading-5 text-blue-100/60">
                  Find opportunities to grow.
                </p>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-xs text-blue-200/50">
           © 2026 Udyvora. Built for what's next.
          </p>
        </section>

        {/* Signup form */}
        <section className="flex flex-col justify-center px-5 py-10 sm:px-12 lg:px-14 xl:px-20">
          <div className="mx-auto w-full max-w-[430px]">
            <Link href="/" className="mb-10 inline-flex items-center gap-2 lg:hidden">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-lg font-black text-white">
                U
              </span>
              <span className="text-xl font-bold tracking-tight text-[#10244a]">
                Udyvora<span className="text-blue-600">.</span>
              </span>
            </Link>

            <div className="mb-8">
              <span className="text-sm font-semibold text-blue-600">
                GET STARTED
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#10244a] sm:text-4xl">
                Create your account
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Join Udyvora and discover what's possible for your career.
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${
                    errors.name ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${
                    errors.email ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className={`w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${
                    errors.password ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {errors.password ? (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.password}
                  </p>
                ) : (
                  <p className="mt-1.5 text-xs text-slate-400">
                    Use at least 8 characters.
                  </p>
                )}
              </div>

              {message && (
                <div
                  role="status"
                  className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-700"
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create your account"}
                {!loading && (
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">ALREADY A MEMBER?</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-blue-600 transition hover:text-blue-800"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-10 text-center text-xs leading-6 text-slate-400">
              By creating an account, you agree to provide accurate information
              and use Udyvora responsibly.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}