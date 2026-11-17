import { Suspense } from "react";

import Link from "next/link";

import { redirect } from "next/navigation";

import { connection } from "next/server";

import { createClient } from "@/lib/supabase/server";

import { prisma } from "@/lib/prisma";



// ---------------------------------------------

// HELPERS

// ---------------------------------------------



function initials(name: string) {

  return name

    .split(" ")

    .filter(Boolean)

    .slice(0, 2)

    .map((part) => part[0])

    .join("")

    .toUpperCase();

}



function titleCase(value: string) {

  return value

    .replaceAll("_", " ")

    .toLowerCase()

    .replace(/\b\w/g, (letter) => letter.toUpperCase());

}



function formatSalary(job: {

  salaryMin: unknown;

  salaryMax: unknown;

  currency: string;

  salaryPeriod: string | null;

}) {

  if (job.salaryMin == null && job.salaryMax == null) {

    return "Salary not disclosed";

  }



  const format = (value: unknown) =>

    new Intl.NumberFormat("en-IN", {

      style: "currency",

      currency: job.currency || "INR",

      maximumFractionDigits: 0,

    }).format(Number(value));



  const range =

    job.salaryMin != null && job.salaryMax != null

      ? `${format(job.salaryMin)} – ${format(job.salaryMax)}`

      : job.salaryMin != null

        ? `From ${format(job.salaryMin)}`

        : `Up to ${format(job.salaryMax)}`;



  return `${range}${

    job.salaryPeriod ? ` / ${job.salaryPeriod.toLowerCase()}` : ""

  }`;

}



function StatusBadge({ status }: { status: string }) {

  const styles: Record<string, string> = {

    SUBMITTED: "bg-blue-50 text-blue-700",

    UNDER_REVIEW: "bg-amber-50 text-amber-700",

    SHORTLISTED: "bg-emerald-50 text-emerald-700",

    INTERVIEW: "bg-violet-50 text-violet-700",

    OFFERED: "bg-green-50 text-green-700",

    REJECTED: "bg-red-50 text-red-700",

    WITHDRAWN: "bg-slate-100 text-slate-600",

  };



  return (

    <span

      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${

        styles[status] || "bg-slate-100 text-slate-600"

      }`}

    >

      {titleCase(status)}

    </span>

  );

}



function SectionHeading({

  eyebrow,

  title,

  description,

  href,

  linkText,

}: {

  eyebrow?: string;

  title: string;

  description?: string;

  href?: string;

  linkText?: string;

}) {

  return (

    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">

      <div>

        {eyebrow && (

          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">

            {eyebrow}

          </p>

        )}



        <h2 className="text-lg font-bold tracking-tight text-slate-900">

          {title}

        </h2>



        {description && (

          <p className="mt-1 text-xs text-slate-500">{description}</p>

        )}

      </div>



      {href && linkText && (

        <Link

          href={href}

          className="text-xs font-semibold text-blue-700 transition hover:text-blue-900"

        >

          {linkText} →

        </Link>

      )}

    </div>

  );

}



// ---------------------------------------------

// DYNAMIC DASHBOARD CONTENT

// ---------------------------------------------



async function DashboardContent() {

  // Wait for the incoming request before accessing

  // authenticated and time-dependent data.

  await connection();



  const supabase = await createClient();



  const {

    data: { user },

  } = await supabase.auth.getUser();



  if (!user) {

    redirect("/login");

  }



  const userRecord = await prisma.user.findUnique({

    where: {

      authUserId: user.id,

    },

    include: {

      candidateProfile: {

        include: {

          skills: true,

        },

      },

    },

  });



  if (!userRecord) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">

        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <h1 className="text-xl font-bold text-slate-900">

            Profile synchronization needed

          </h1>



          <p className="mt-3 text-sm leading-6 text-slate-500">

            Your account is authenticated, but your Udyvora profile has not

            been synchronized yet.

          </p>



          <Link

            href="/login"

            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"

          >

            Return to login

          </Link>

        </div>

      </main>

    );

  }



  const profile = userRecord.candidateProfile;



  if (!profile) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">

        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">

          <h1 className="text-xl font-bold">

            Candidate profile unavailable

          </h1>



          <p className="mt-2 text-sm text-slate-500">

            Your account exists, but its candidate profile needs attention.

          </p>

        </div>

      </main>

    );

  }



  const now = new Date();



  const [

    applicationCount,

    savedCount,

    interviewCount,

    recentApplications,

    availableJobs,

    startups,

  ] = await Promise.all([

    prisma.jobApplication.count({

      where: {

        candidateProfileId: profile.id,

      },

    }),



    prisma.savedJob.count({

      where: {

        candidateProfileId: profile.id,

      },

    }),



    prisma.jobApplication.count({

      where: {

        candidateProfileId: profile.id,

        status: "INTERVIEW",

      },

    }),



    prisma.jobApplication.findMany({

      where: {

        candidateProfileId: profile.id,

      },

      orderBy: {

        submittedAt: "desc",

      },

      take: 5,

      include: {

        job: {

          include: {

            startup: true,

          },

        },

      },

    }),



    prisma.job.findMany({

      where: {

        status: "PUBLISHED",

        OR: [

          { expiresAt: null },

          { expiresAt: { gte: now } },

        ],

        startup: {

          status: "VERIFIED",

        },

      },

      orderBy: [

        { postedAt: "desc" },

        { createdAt: "desc" },

      ],

      take: 16,

      include: {

        startup: true,

        skills: true,

      },

    }),



    prisma.startup.findMany({

      where: {

        status: "VERIFIED",

      },

      orderBy: {

        createdAt: "desc",

      },

      take: 3,

    }),

  ]);



  // ---------------------------------------------

  // PROFILE COMPLETION

  // ---------------------------------------------



  const completedFields = [

    profile.headline,

    profile.bio,

    profile.phone,

    profile.location,

    profile.education,

    profile.graduationYear,

    profile.linkedinUrl,

    profile.portfolioUrl,

    profile.resumeStoragePath,

    profile.skills.length > 0 ? "skills" : null,

  ].filter(Boolean).length;



  const profileCompletion = Math.round(

  (completedFields / 10) * 100

  );



  // ---------------------------------------------

  // RECOMMENDATION LOGIC

  // ---------------------------------------------



  const skillNames = profile.skills.map((skill) =>

    skill.name.toLowerCase()

  );



  const appliedJobIds = new Set(

    recentApplications.map((application) => application.jobId)

  );



  const recommendedJobs = availableJobs

    .filter((job) => !appliedJobIds.has(job.id))

    .map((job) => ({

      job,

      match: job.skills.filter((skill) =>

        skillNames.includes(skill.name.toLowerCase())

      ).length,

    }))

    .sort((a, b) => b.match - a.match)

    .slice(0, 4);



  // ---------------------------------------------

  // PERSONALIZATION

  // ---------------------------------------------



  const firstName =

    userRecord.name?.trim().split(/\s+/)[0] || "there";



  const currentHour = new Date().getHours();



  const greeting =

    currentHour < 12

      ? "Good morning"

      : currentHour < 17

        ? "Good afternoon"

        : "Good evening";



  const stats = [

    {

      icon: "↗",

      label: "Applications",

      value: applicationCount,

      description: "Your application activity",

      color: "blue",

    },

    {

      icon: "♡",

      label: "Saved jobs",

      value: savedCount,

      description: "Opportunities bookmarked",

      color: "cyan",

    },

    {

      icon: "✳",

      label: "Interviews",

      value: interviewCount,

      description: "Interview-stage applications",

      color: "violet",

    },

    {

      icon: "◉",

      label: "Profile strength",

      value: `${profileCompletion}%`,

      description: "Your profile completion",

      color: "emerald",

    },

  ];



  // ---------------------------------------------

  // DASHBOARD UI

  // ---------------------------------------------



  return (

    <div className="min-h-screen bg-[#f5f7fc] text-slate-900">

      <div className="flex min-h-screen">



        {/* SIDEBAR */}



        <aside className="fixed inset-y-0 left-0 z-30 hidden w-[238px] flex-col border-r border-slate-200/80 bg-white lg:flex">



          <Link

            href="/"

            className="flex h-[76px] items-center gap-2 border-b border-slate-100 px-6"

          >

            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-black text-white">

              U

            </span>



            <span className="text-xl font-black tracking-tight text-slate-900">

              udyvora<span className="text-blue-600">.</span>

            </span>

          </Link>



          <div className="px-4 pt-7">

            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">

              Workspace

            </p>



            <nav className="space-y-1">

              <Link

                href="/dashboard"

                className="flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-3 text-sm font-semibold text-blue-700"

              >

                <span className="text-lg">▦</span>

                Overview

                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600" />

              </Link>



              {[

                ["⌕", "Explore Startups", "#startups"],

                ["↗", "Find Opportunities", "#opportunities"],

                ["▤", "My Applications", "#applications"],

                ["♡", "Saved Jobs", "#saved"],

                ["◉", "My Profile", "#profile"],

              ].map(([icon, name, href]) => (

                <a

                  key={name}

                  href={href}

                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-blue-700"

                >

                  <span className="w-5 text-center text-lg">

                    {icon}

                  </span>

                  {name}

                </a>

              ))}

            </nav>

          </div>



          <div className="mt-8 px-4">

            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">

              More

            </p>



            <nav className="space-y-1">

              <a

                href="#profile"

                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50"

              >

                <span className="text-lg">⌘</span>

                Career Resources

              </a>



              <a

                href="#profile"

                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50"

              >

                <span className="text-lg">⚙</span>

                Settings

              </a>

            </nav>

          </div>



          <div className="mt-auto p-4">

            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-4">

              <div className="flex items-center gap-2">

                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">

                  ✦

                </span>



                <p className="text-xs font-bold text-slate-800">

                  Your next move

                </p>

              </div>



              <p className="mt-3 text-xs leading-5 text-slate-500">

                Keep your profile updated to help startups discover you.

              </p>



              <a

                href="#profile"

                className="mt-3 inline-flex text-xs font-bold text-blue-700"

              >

                Improve profile →

              </a>

            </div>



            <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">

                {initials(userRecord.name || "Candidate")}

              </div>



              <div className="min-w-0 flex-1">

                <p className="truncate text-xs font-bold text-slate-800">

                  {userRecord.name || "Candidate"}

                </p>



                <p className="truncate text-[10px] text-slate-400">

                  {userRecord.email}

                </p>

              </div>

            </div>

          </div>

        </aside>



        {/* MAIN CONTENT */}



        <main className="min-w-0 flex-1 lg:ml-[238px]">



          {/* TOPBAR */}



          <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur-xl sm:px-8">

            <div>

              <p className="text-[10px] font-medium text-slate-400">

                Workspace / Overview

              </p>



              <h1 className="mt-0.5 text-sm font-bold text-slate-900">

                Candidate dashboard

              </h1>

            </div>



            <div className="flex items-center gap-3">

              <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">

                <span className="text-slate-400">⌕</span>

                <span className="text-xs text-slate-400">

                  Search startups, jobs or skills...

                </span>

                <span className="ml-5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] text-slate-400">

                  /

                </span>

              </div>



              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm text-slate-500">

                ♧

              </div>



              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 text-xs font-bold text-blue-700">

                {initials(userRecord.name || "Candidate")}

              </div>

            </div>

          </header>



          <div className="mx-auto max-w-[1500px] space-y-7 p-5 sm:p-7 lg:p-8">



            {/* WELCOME */}



            <section className="relative overflow-hidden rounded-2xl border border-blue-100/80 bg-gradient-to-r from-white via-[#f1f7ff] to-[#eaf6ff] p-6 sm:p-8">

              <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full border-[35px] border-blue-100/50" />



              <div className="pointer-events-none absolute -bottom-36 right-48 h-64 w-64 rounded-full border-[30px] border-cyan-100/50" />



              <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">

                    Your career workspace

                  </p>



                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">

                    {greeting}, {firstName}

                    <span className="text-blue-600">.</span>

                  </h2>



                  <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">

                    Your next opportunity could start with one discovery.

                    Explore growing startups and find work that matches your

                    skills.

                  </p>

                </div>



                <div className="flex flex-wrap gap-2">

                  <a

                    href="#opportunities"

                    className="rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/15 transition hover:-translate-y-0.5 hover:bg-blue-700"

                  >

                    Explore opportunities →

                  </a>



                  <a

                    href="#profile"

                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"

                  >

                    Complete profile

                  </a>

                </div>

              </div>

            </section>



            {/* STATISTICS */}



            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {stats.map((stat) => {

                const colorStyles: Record<string, string> = {

                  blue: "bg-blue-50 text-blue-600",

                  cyan: "bg-cyan-50 text-cyan-600",

                  violet: "bg-violet-50 text-violet-600",

                  emerald: "bg-emerald-50 text-emerald-600",

                };



                return (

                  <div

                    key={stat.label}

                    className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.025)] transition hover:-translate-y-1 hover:shadow-md"

                  >

                    <div className="flex items-center justify-between">

                      <p className="text-xs font-semibold text-slate-500">

                        {stat.label}

                      </p>



                      <span

                        className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg ${colorStyles[stat.color]}`}

                      >

                        {stat.icon}

                      </span>

                    </div>



                    <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">

                      {stat.value}

                    </p>



                    <p className="mt-1 text-[11px] text-slate-400">

                      {stat.description}

                    </p>

                  </div>

                );

              })}

            </section>



            {/* RECOMMENDED JOBS */}



            <section id="opportunities" className="scroll-mt-24">

              <SectionHeading

                eyebrow="Curated for your career"

                title="Recommended opportunities"

                description="Explore recent openings from verified startups."

                href="#opportunities"

                linkText="Explore all"

              />



              {recommendedJobs.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">

                    ↗

                  </div>



                  <h3 className="mt-4 font-bold text-slate-800">

                    No matching opportunities yet

                  </h3>



                  <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500">

                    Add more skills to your profile or check back when verified

                    startups publish new opportunities.

                  </p>



                  <a

                    href="#profile"

                    className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white"

                  >

                    Update your skills

                  </a>

                </div>

              ) : (

                <div className="grid gap-4 xl:grid-cols-2">

                  {recommendedJobs.map(({ job, match }) => (

                    <article

                      key={job.id}

                      className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.025)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"

                    >

                      <div className="flex items-start gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 text-sm font-black text-blue-700">

                          {initials(job.startup.name)}

                        </div>



                        <div className="min-w-0 flex-1">

                          <h3 className="truncate text-sm font-bold text-slate-900 group-hover:text-blue-700">

                            {job.title}

                          </h3>



                          <p className="mt-1 text-xs text-slate-500">

                            {job.startup.name}

                          </p>

                        </div>



                        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700">

                          Verified startup

                        </span>

                      </div>



                      <div className="mt-4 flex flex-wrap gap-2">

                        {[job.jobType, job.workMode, job.experienceLevel].map(

                          (value) => (

                            <span

                              key={value}

                              className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-medium text-slate-600"

                            >

                              {titleCase(value)}

                            </span>

                          )

                        )}

                      </div>



                      <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-slate-500">

                        <span>

                          Location: {job.location || "Not specified"}

                        </span>



                        <span className="text-slate-300">·</span>



                        <span>{formatSalary(job)}</span>

                      </div>



                      <div className="mt-4 flex flex-wrap gap-1.5">

                        {job.skills.slice(0, 4).map((skill) => (

                          <span

                            key={skill.id}

                            className={`rounded-md px-2 py-1 text-[9px] font-medium ${

                              skillNames.includes(skill.name.toLowerCase())

                                ? "bg-blue-50 text-blue-700"

                                : "bg-slate-100 text-slate-600"

                            }`}

                          >

                            {skill.name}

                          </span>

                        ))}



                        {job.skills.length > 4 && (

                          <span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] text-slate-500">

                            +{job.skills.length - 4}

                          </span>

                        )}

                      </div>



                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                        <p className="text-[10px] font-medium text-slate-400">

                          {match > 0

                            ? `${match} matching skill${match > 1 ? "s" : ""}`

                            : "Recently published"}

                        </p>



                        <span className="rounded-lg bg-blue-600 px-3 py-2 text-[10px] font-bold text-white">

                          {job.applicationMethod === "EXTERNAL"

                            ? "External role"

                            : "Opportunity"}

                        </span>

                      </div>

                    </article>

                  ))}

                </div>

              )}

            </section>



            {/* STARTUPS */}



            <section id="startups" className="scroll-mt-24">

              <SectionHeading

                eyebrow="Discover the ecosystem"

                title="Emerging Indian startups"

                description="Get to know the companies building what comes next."

                href="#startups"

                linkText="Discover startups"

              />



              {startups.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">

                  Verified startups will appear here when available.

                </div>

              ) : (

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                  {startups.map((startup) => (

                    <article

                      key={startup.id}

                      className="rounded-2xl border border-slate-200/80 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"

                    >

                      <div className="flex items-center justify-between">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-sm font-black text-blue-700">

                          {initials(startup.name)}

                        </div>



                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700">

                          Verified

                        </span>

                      </div>



                      <h3 className="mt-4 text-sm font-bold text-slate-900">

                        {startup.name}

                      </h3>



                      <p className="mt-1 text-[10px] font-semibold text-blue-700">

                        {startup.industry || "Technology"}

                      </p>



                      <p className="mt-3 line-clamp-3 min-h-[54px] text-xs leading-5 text-slate-500">

                        {startup.description ||

                          "Discover this startup and learn more about its work."}

                      </p>



                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

                        <span className="text-[10px] text-slate-400">

                          {startup.location || "India"}

                        </span>



                        <span className="text-[10px] font-bold text-blue-700">

                          Verified startup

                        </span>

                      </div>

                    </article>

                  ))}

                </div>

              )}

            </section>



            {/* APPLICATIONS AND PROFILE */}



            <section className="grid gap-5 xl:grid-cols-[1.65fr_1fr]">



              {/* APPLICATION TRACKER */}



              <div

                id="applications"

                className="scroll-mt-24 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6"

              >

                <SectionHeading

                  title="Application pipeline"

                  description="Follow the progress of your submitted applications."

                  href="#applications"

                  linkText="View all"

                />



                {recentApplications.length === 0 ? (

                  <div className="rounded-xl bg-slate-50 p-7 text-center">

                    <div className="text-2xl text-blue-500">▤</div>



                    <h3 className="mt-3 text-sm font-bold text-slate-800">

                      Your journey starts here

                    </h3>



                    <p className="mt-2 text-xs text-slate-500">

                      Your internal job applications will appear here.

                    </p>



                    <a

                      href="#opportunities"

                      className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white"

                    >

                      Discover opportunities

                    </a>

                  </div>

                ) : (

                  <div className="space-y-3">

                    {recentApplications.map((application) => (

                      <div

                        key={application.id}

                        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4"

                      >

                        <div className="min-w-0">

                          <h3 className="truncate text-xs font-bold text-slate-800">

                            {application.job.title}

                          </h3>



                          <p className="mt-1 text-[10px] text-slate-500">

                            {application.job.startup.name}

                          </p>



                          <p className="mt-2 text-[9px] text-slate-400">

                            Applied{" "}

                            {new Date(

                              application.submittedAt

                            ).toLocaleDateString("en-IN")}

                          </p>

                        </div>



                        <StatusBadge status={application.status} />

                      </div>

                    ))}

                  </div>

                )}

              </div>



              {/* PROFILE COMPLETION */}



              <div

                id="profile"

                className="scroll-mt-24 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6"

              >

                <SectionHeading

                  title="Profile strength"

                  description="Make your profile stand out to startups."

                />



                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-3xl font-bold text-blue-700">

                      {profileCompletion}%

                    </p>



                    <p className="mt-1 text-[10px] text-slate-400">

                      Profile completed

                    </p>

                  </div>



                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-[5px] border-blue-100">

                    <span className="text-sm font-bold text-blue-700">

                      {profileCompletion}%

                    </span>

                  </div>

                </div>



                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">

                  <div

                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all"

                    style={{ width: `${profileCompletion}%` }}

                  />

                </div>



                <div className="mt-6 space-y-3">

                  {[

                    ["Professional headline", profile.headline],

                    ["About section", profile.bio],

                    ["Education", profile.education],

                    ["Skills", profile.skills.length > 0],

                    ["Resume", profile.resumeStoragePath],

                    ["LinkedIn", profile.linkedinUrl],

                    ["Portfolio", profile.portfolioUrl],

                    ["Location", profile.location],

                  ].map(([name, value]) => (

                    <div

                      key={String(name)}

                      className="flex items-center justify-between gap-3"

                    >

                      <span className="text-[11px] text-slate-600">

                        {name}

                      </span>



                      <span

                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${

                          value

                            ? "bg-emerald-50 text-emerald-600"

                            : "bg-slate-100 text-slate-400"

                        }`}

                      >

                        {value ? "✓" : "–"}

                      </span>

                    </div>

                  ))}

                </div>



                <p className="mt-4 text-[10px] leading-5 text-slate-400">

                  Add your education, skills and experience to improve your

                  profile.

                </p>



                <a

                  href="#profile"

                  className="mt-5 flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold text-white transition hover:bg-blue-700"

                >

                  Improve your profile →

                </a>

              </div>

            </section>



            {/* FOOTER */}



            <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 py-5 text-[10px] text-slate-400">

              <span>© 2026 Udyvora. Discover. Connect. Grow.</span>

              <span>Built for the next generation of talent.</span>

            </footer>



          </div>

        </main>

      </div>

    </div>

  );

}



// ---------------------------------------------

// PAGE EXPORT - MUST STAY OUTSIDE DashboardContent

// ---------------------------------------------



export default function DashboardPage() {

  return (

    <Suspense

      fallback={

        <main className="min-h-screen bg-[#f5f7fc] p-8">

          <div className="mx-auto max-w-7xl animate-pulse space-y-6">

            <div className="h-10 w-56 rounded-lg bg-slate-200" />



            <div className="h-36 rounded-2xl bg-slate-200" />



            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">

              {[1, 2, 3, 4].map((item) => (

                <div

                  key={item}

                  className="h-28 rounded-2xl bg-slate-200"

                />

              ))}

            </div>



            <div className="h-72 rounded-2xl bg-slate-200" />

          </div>

        </main>

      }

    >

      <DashboardContent />

    </Suspense>

  );

}
