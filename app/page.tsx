
import Link from "next/link";

const testimonials = [
  {
    name: "Rohan Verma",
    role: "Software Developer",
    title: "Deep Dive Startup Profiles",
    description:
      "Explore startups, their technology, funding stages and the teams building India's next big products.",
    initials: "RV",
    color: "from-blue-500 to-cyan-400",
  },
  {
    name: "Pooja Sharma",
    role: "Product Designer",
    title: "Proof-of-Work Over Resumes",
    description:
      "Showcase your projects, skills and real-world experience to stand out to ambitious startup teams.",
    initials: "PS",
    color: "from-indigo-500 to-blue-400",
  },
  {
    name: "Aarav Nair",
    role: "AI Engineer",
    title: "Transparent Opportunities",
    description:
      "Discover roles with clear requirements, relevant skills and compensation information when available.",
    initials: "AN",
    color: "from-cyan-500 to-blue-500",
  },
];

const sectors = [
  ["✳", "AI & Alternative Tech", "AI, machine learning and emerging technologies", "420+ Startups"],
  ["▤", "FinTech & UPI Infra", "Digital finance, payments and financial products", "160+ Startups"],
  ["ϟ", "Quick Commerce & Logistics", "Commerce, delivery and supply chain innovation", "110+ Startups"],
  ["⌁", "ClimateTech & Clean Energy", "Sustainable technology and clean energy", "140+ Startups"],
  ["✣", "HealthTech & Biotech", "Digital healthcare and biotechnology", "120+ Startups"],
  ["⌘", "B2B SaaS & DevTools", "Cloud tools, software and developer platforms", "520+ Startups"],
];

const startups = [
  {
    initials: "HV",
    name: "HyperScale AI",
    industry: "AI & Enterprise Tech",
    location: "Bengaluru",
    stage: "Series A · 2026",
    description: "Building autonomous intelligence for modern enterprises.",
    color: "from-blue-100 to-cyan-50",
  },
  {
    initials: "NV",
    name: "NovaVolt Mobility",
    industry: "Clean Mobility",
    location: "Pune",
    stage: "Seed · 2026",
    description: "Next-generation electric mobility and charging solutions.",
    color: "from-cyan-100 to-blue-50",
  },
  {
    initials: "UP",
    name: "UniPulse Pay",
    industry: "FinTech",
    location: "Mumbai",
    stage: "Series B · 2026",
    description: "Making everyday digital payments simpler and smarter.",
    color: "from-indigo-100 to-blue-50",
  },
];

const jobs = [
  {
    company: "Nexora Labs",
    initials: "N",
    role: "Frontend Developer Intern",
    location: "Bengaluru · Hybrid",
    type: "Internship",
    skills: ["React", "TypeScript", "Next.js"],
    salary: "₹15K – ₹25K",
    featured: true,
  },
  {
    company: "Vertex AI",
    initials: "V",
    role: "AI Research Intern",
    location: "Remote · India",
    type: "Internship",
    skills: ["Python", "Machine Learning"],
    salary: "Not disclosed",
  },
  {
    company: "PixelCraft",
    initials: "P",
    role: "Product Growth Associate",
    location: "Delhi NCR · On-site",
    type: "Full-time",
    skills: ["Growth", "Analytics", "Marketing"],
    salary: "₹4L – ₹6L",
  },
];

const steps = [
  {
    number: "01",
    icon: "⌕",
    title: "Discover Startups",
    description:
      "Explore ambitious Indian companies, their products, teams and industries.",
  },
  {
    number: "02",
    icon: "↗",
    title: "Match Directly",
    description:
      "Find opportunities that align with your skills, interests and career goals.",
  },
  {
    number: "03",
    icon: "◎",
    title: "Make Your Move",
    description:
      "Connect with growing teams and take the next step in your career.",
  },
];

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 text-center">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-blue-600">
        {label}
      </p>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f7faff] text-slate-900">
      {/* NAVBAR */}
      <header className="relative z-20 px-4 pt-4 sm:px-6">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/60 bg-white/90 px-5 py-3 shadow-[0_8px_30px_rgba(20,75,150,0.08)] backdrop-blur-xl sm:px-8">
          <Link href="/" className="text-xl font-black tracking-tight text-blue-700">
            UDYVORA<span className="text-blue-400">.</span>
          </Link>

          <div className="hidden items-center gap-8 text-xs font-semibold text-slate-600 md:flex">
            <a href="#home" className="transition hover:text-blue-600">Home</a>
            <a href="#startups" className="transition hover:text-blue-600">Startups</a>
            <a href="#jobs" className="transition hover:text-blue-600">Jobs</a>
            <a href="#ecosystem" className="transition hover:text-blue-600">Ecosystem</a>
            <a href="#about" className="transition hover:text-blue-600">About Us</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden text-xs font-semibold text-slate-700 transition hover:text-blue-600 sm:block">
              Sign In
            </Link>
            <Link href="/signup" className="rounded-full bg-[#d9ff45] px-5 py-2.5 text-[11px] font-bold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              GET STARTED ↗
            </Link>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="relative mx-4 mt-3 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#168bfa] via-[#258af4] to-[#65c9ff] px-5 pb-20 pt-16 text-center text-white shadow-[0_20px_50px_rgba(27,128,231,0.2)] sm:mx-6 sm:px-10 sm:pt-20">
        <div className="pointer-events-none absolute -left-28 top-20 h-80 w-80 rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[10px] font-semibold tracking-[0.15em] backdrop-blur-md">
            INDIA'S STARTUP & CAREER ECOSYSTEM
          </span>

          <h1 className="mx-auto mt-7 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Discover the startups
            <br />
            shaping tomorrow.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-blue-50 sm:text-base">
            Udyvora connects ambitious builders with high-signal Indian startups,
            transparent opportunities, and verified founder networks.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="#startups" className="rounded-full border border-white/40 bg-white/15 px-6 py-3 text-xs font-semibold backdrop-blur-md transition hover:bg-white/25">
              EXPLORE STARTUPS
            </Link>
            <Link href="/signup" className="rounded-full bg-[#d9ff45] px-6 py-3 text-xs font-bold text-slate-950 shadow-lg transition hover:-translate-y-1">
              GET STARTED WITH UDYVORA ↗
            </Link>
          </div>
        </div>

        {/* FLOATING PRODUCT CARDS */}
        <div className="relative mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { title: "Startup Profile", value: "Explore", sub: "Company insights", color: "bg-white" },
            { title: "Career Growth", value: "Skills", sub: "Build your future", color: "bg-[#effaff]" },
            { title: "AI & Tech", value: "Explore", sub: "Emerging sectors", color: "bg-white" },
            { title: "Open Positions", value: "Discover", sub: "Find your next role", color: "bg-[#f1f8ff]" },
            { title: "Founder Network", value: "Connect", sub: "Meet builders", color: "bg-[#122c53] text-white" },
            { title: "Opportunities", value: "18,500+", sub: "Across India", color: "bg-white" },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`${item.color} rounded-2xl p-4 text-left text-slate-900 shadow-[0_15px_35px_rgba(12,64,120,0.16)] transition duration-300 hover:-translate-y-2 ${index === 4 ? "text-white" : ""}`}
            >
              <p className={`text-[9px] font-semibold ${index === 4 ? "text-blue-200" : "text-slate-400"}`}>
                {item.title}
              </p>
              <p className={`mt-3 text-lg font-bold ${index === 4 ? "text-white" : "text-blue-700"}`}>
                {item.value}
              </p>
              <p className={`mt-1 text-[9px] ${index === 4 ? "text-blue-100" : "text-slate-500"}`}>
                {item.sub}
              </p>
              <div className={`mt-3 h-1 w-10 rounded-full ${index === 4 ? "bg-cyan-300" : "bg-blue-400"}`} />
            </div>
          ))}
        </div>

        <p className="relative mt-10 text-[10px] font-medium text-white/80">
          BUILT FOR INDIA'S NEXT GENERATION OF FOUNDERS, BUILDERS & TALENT
        </p>
      </section>

      {/* PARTNER STRIP */}
      <section className="border-b border-slate-200/70 bg-white px-5 py-8">
        <p className="mb-5 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Connecting India's growing startup ecosystem
        </p>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs font-bold tracking-wide text-slate-400">
          <span>PEAK XV SURGE</span>
          <span>BLUME VENTURES</span>
          <span>ELEVATION CAPITAL</span>
          <span>ACCEL INDIA</span>
          <span>NEUS VENTURES</span>
          <span>KALAARI CAPITAL</span>
        </div>
        <p className="mt-4 text-center text-[9px] text-slate-400">
          Ecosystem names shown for illustrative context; no partnership is implied.
        </p>
      </section>

      {/* ABOUT / TESTIMONIAL CARDS */}
      <section id="about" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="About Udyvora"
            title="An India-first startup ecosystem"
            description="Dedicated to building smarter career trajectories and meaningful connections."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <article
                key={item.name}
                className={`group relative overflow-hidden rounded-[24px] border border-white p-6 shadow-[0_10px_35px_rgba(40,90,150,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  index === 0
                    ? "bg-gradient-to-br from-[#e4f2ff] via-white to-[#d8ebff]"
                    : index === 1
                    ? "bg-gradient-to-br from-[#e6faff] via-white to-[#d9f4ff]"
                    : "bg-gradient-to-br from-[#e9eaff] via-white to-[#e4e5ff]"
                }`}
              >
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-blue-300/20 blur-2xl transition group-hover:scale-125" />
                <p className="relative text-[9px] font-bold uppercase tracking-widest text-blue-600">
                  {item.role}
                </p>
                <h3 className="relative mt-5 text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-xs leading-6 text-slate-600">
                  {item.description}
                </p>
                <div className="relative mt-7 flex items-center gap-3 border-t border-blue-900/10 pt-4">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-[10px] font-bold text-white shadow-md`}>
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold">{item.name}</p>
                    <p className="text-[10px] text-slate-500">{item.role}</p>
                  </div>
                  <span className="ml-auto text-xl text-blue-400">↗</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="ecosystem" className="border-y border-slate-200/70 bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Categories"
            title="Explore High-Growth Sectors"
            description="Discover disruptive Indian startups across emerging industries."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector, index) => (
              <article
                key={sector[1]}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-[#f1f7ff] p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_15px_35px_rgba(40,110,200,0.1)]"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-100/60 blur-2xl transition group-hover:bg-blue-200/80" />
                <div className="relative flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 text-lg font-bold text-blue-700">
                    {sector[0]}
                  </span>
                  <span className="rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-[9px] font-semibold text-blue-600">
                    {sector[3]}
                  </span>
                </div>
                <h3 className="relative mt-5 text-sm font-bold">{sector[1]}</h3>
                <p className="relative mt-2 text-xs leading-5 text-slate-500">{sector[2]}</p>
                <a href="#startups" className="relative mt-5 inline-flex text-[10px] font-bold text-blue-600 transition group-hover:gap-2">
                  Explore sector <span className="ml-1">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STARTUPS */}
      <section id="startups" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Curated discovery"
            title="Breakout Indian Startups to Watch"
            description="Discover companies building products, technology and the future of Indian innovation."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {startups.map((startup) => (
              <article key={startup.name} className={`group overflow-hidden rounded-[24px] border border-white bg-gradient-to-br ${startup.color} p-5 shadow-[0_10px_35px_rgba(40,90,150,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-xl`}>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-black text-blue-700 shadow-sm">
                    {startup.initials}
                  </div>
                  <span className="rounded-full bg-white/80 px-3 py-1 text-[9px] font-semibold text-blue-700">
                    {startup.stage}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold">{startup.name}</h3>
                <p className="mt-1 text-[10px] font-semibold text-blue-700">{startup.industry}</p>
                <p className="mt-3 text-xs leading-5 text-slate-600">{startup.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-blue-900/10 pt-4">
                  <span className="text-[10px] text-slate-500">{startup.location}, India</span>
                  <a href="/signup" className="rounded-full bg-white px-4 py-2 text-[10px] font-bold text-blue-700 shadow-sm transition hover:bg-blue-600 hover:text-white">
                    View Profile ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* JOBS */}
      <section id="jobs" className="border-y border-slate-200/70 bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-blue-600">Career opportunities</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">High-Signal Roles with Transparent Pay</h2>
              <p className="mt-3 text-sm text-slate-500">Find meaningful opportunities at ambitious Indian startups.</p>
            </div>
            <Link href="/signup" className="text-xs font-bold text-blue-600 hover:text-blue-800">
              Explore all opportunities ↗
            </Link>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {["All roles", "Internships", "Full-time", "Remote", "Entry-level"].map((filter, index) => (
              <span key={filter} className={`rounded-full px-4 py-2 text-[10px] font-semibold ${index === 0 ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-500"}`}>
                {filter}
              </span>
            ))}
          </div>

          <div className="grid gap-4">
            {jobs.map((job) => (
              <article key={job.role} className={`group relative flex flex-col gap-5 overflow-hidden rounded-[20px] border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg md:flex-row md:items-center md:justify-between ${job.featured ? "border-blue-100 bg-gradient-to-r from-[#eaf4ff] via-white to-[#e8faff]" : "border-slate-100 bg-gradient-to-r from-white to-[#f3f8ff]"}`}>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-sm font-black text-white shadow-md">
                    {job.initials}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold">{job.role}</h3>
                      {job.featured && <span className="rounded-full bg-blue-100 px-2 py-1 text-[9px] font-bold text-blue-700">FEATURED</span>}
                      <span className="rounded-full bg-cyan-50 px-2 py-1 text-[9px] font-semibold text-cyan-700">{job.type}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{job.company} · {job.location}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span key={skill} className="rounded-full border border-blue-100 bg-white/80 px-2.5 py-1 text-[9px] text-slate-600">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-5 md:justify-end">
                  <div className="md:text-right">
                    <p className="text-sm font-bold text-slate-800">{job.salary}</p>
                    <p className="mt-1 text-[9px] text-slate-400">Compensation information</p>
                  </div>
                  <Link href="/signup" className="rounded-full bg-[#d9ff45] px-4 py-2.5 text-[10px] font-bold text-slate-950 transition hover:bg-blue-600 hover:text-white">
                    Apply / Explore ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 text-[10px] text-slate-400">
            Illustrative sample opportunities. Actual openings, employers and compensation will be shown from verified listing sources.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="How it works"
            title="Direct Path to High-Velocity Teams"
            description="Udyvora connects ambitious talent with high-potential startups through a simple discovery journey."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.number} className="group relative overflow-hidden rounded-[22px] border border-white bg-gradient-to-br from-white via-[#f2f8ff] to-[#e5f3ff] p-6 shadow-[0_10px_30px_rgba(40,90,150,0.07)] transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl text-blue-600 shadow-sm">{step.icon}</span>
                  <span className="text-4xl font-black tracking-tighter text-blue-100">{step.number}</span>
                </div>
                <h3 className="mt-8 text-base font-bold">{step.title}</h3>
                <p className="mt-3 text-xs leading-6 text-slate-500">{step.description}</p>
                {index !== 2 && <div className="absolute bottom-7 right-7 hidden text-xl text-blue-300 md:block">↗</div>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[26px] bg-gradient-to-r from-[#168bfa] via-[#176bd0] to-[#102a56] px-6 py-16 text-center text-white shadow-[0_20px_45px_rgba(20,95,180,0.22)] sm:px-12">
          <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />
          <div className="relative">
            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[9px] font-bold tracking-widest">YOUR NEXT CHAPTER STARTS HERE</span>
            <h2 className="mx-auto mt-7 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to launch your journey in India's startup decade?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-blue-100">
              Whether you're looking for your next breakthrough opportunity or building an ambitious company, Udyvora connects you with the teams shaping tomorrow.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/signup" className="rounded-full bg-[#d9ff45] px-6 py-3 text-xs font-bold text-slate-950 transition hover:-translate-y-1 hover:shadow-lg">
                JOIN UDYVORA ↗
              </Link>
              <Link href="/login" className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
                SIGN IN
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-black text-blue-700">UDYVORA.</Link>
            <p className="mt-4 max-w-xs text-xs leading-6 text-slate-500">
              Discover India's startup ecosystem, explore meaningful opportunities and build your future.
            </p>
            <div className="mt-5 flex gap-4 text-[10px] font-semibold text-slate-400">
              <a href="#home" className="hover:text-blue-600">LinkedIn</a>
              <a href="#home" className="hover:text-blue-600">Instagram</a>
              <a href="#home" className="hover:text-blue-600">Contact</a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-800">Explore</h4>
            <div className="mt-5 flex flex-col gap-3 text-xs text-slate-500">
              <a href="#startups" className="hover:text-blue-600">Discover Startups</a>
              <a href="#jobs" className="hover:text-blue-600">Find Jobs</a>
              <a href="#jobs" className="hover:text-blue-600">Internships</a>
              <a href="#ecosystem" className="hover:text-blue-600">Industries</a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-800">For Startups</h4>
            <div className="mt-5 flex flex-col gap-3 text-xs text-slate-500">
              <Link href="/signup" className="hover:text-blue-600">List Your Startup</Link>
              <Link href="/signup" className="hover:text-blue-600">Post a Job</Link>
              <Link href="/signup" className="hover:text-blue-600">Find Talent</Link>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-800">Company</h4>
            <div className="mt-5 flex flex-col gap-3 text-xs text-slate-500">
              <a href="#about" className="hover:text-blue-600">About Udyvora</a>
              <a href="#about" className="hover:text-blue-600">Our Mission</a>
              <a href="mailto:hello@udyvora.in" className="hover:text-blue-600">Contact Us</a>
              <Link href="/login" className="hover:text-blue-600">Sign In</Link>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-slate-100 pt-6 text-[10px] text-slate-400 sm:flex-row">
          <p>© 2026 Udyvora. All rights reserved.</p>
          <p>Built for India's next generation of builders.</p>
        </div>
      </footer>
    </main>
  );
}
