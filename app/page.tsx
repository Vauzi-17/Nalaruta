"use client";

import { 
  ArrowRight, 
  ExternalLink, 
  Code2, 
  Network, 
  BarChart3, 
  Route, 
  CheckCircle2, 
  BookOpen, 
  Users, 
  Star,
  ChevronRight
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F4F6FB] font-sans">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            Skill<span className="text-[#2563EB]">Route</span>
          </span>
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <li>
              <a href="#" className="text-[#2563EB] border-b-2 border-[#2563EB] pb-0.5">Explore</a>
            </li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">My Roadmap</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Resources</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Community</a></li>
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
            Sign In
          </a>
          <a
            href="#"
            className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-16 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            Master Your{" "}
            <span className="text-[#2563EB]">Vocational</span>{" "}
            Future
          </h1>
          <p className="text-slate-500 text-base mb-8 leading-relaxed">
            Remove the guesswork from your career path. Clear, interactive roadmaps designed to take you from beginner to professional in high-demand vocational fields.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href="#"
              className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold px-5 py-3 rounded-lg transition-colors text-sm"
            >
              Start Your Journey <ArrowRight size={16} />
            </a>
            <a
              href="#"
              className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-5 py-3 rounded-lg transition-colors text-sm"
            >
              View All Roadmaps
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#2563EB", "#10B981", "#F59E0B"].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: color }}
                >
                  {["A", "B", "C"][i]}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500">
              Joined by <span className="font-bold text-slate-800">12,000+</span> ambitious learners this month
            </p>
          </div>
        </div>

        {/* Hero card */}
        <div className="flex-1 max-w-sm w-full">
          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative p-6 flex flex-col items-center justify-center min-h-[260px]">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-64 h-64 rounded-full border-4 border-[#10B981]" />
              </div>
              <p className="text-[#10B981] text-xl font-bold tracking-wide text-center">
                Learning<br />Interface
              </p>
              <p className="text-slate-400 text-sm mt-1 mb-6">Safe Infrastructure</p>
              <div className="w-28 h-20 bg-[#10B981]/20 rounded-xl flex items-center justify-center">
                <div className="w-20 h-14 bg-[#10B981]/40 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-[#10B981]" size={28} />
                </div>
              </div>
            </div>
            <div className="bg-white/5 px-5 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                <CheckCircle2 size={16} className="text-[#10B981]" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Progress</p>
                <div className="w-32 h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-[#10B981] rounded-full" style={{ width: "75%" }} />
                </div>
                <p className="text-slate-400 text-[10px] mt-0.5">75% of Frontend Roadmap</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ROADMAPS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[#2563EB] text-xs font-bold uppercase tracking-widest mb-1">Career Paths</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Featured Roadmaps</h2>
          </div>
          <a href="#" className="flex items-center gap-1 text-[#2563EB] text-sm font-semibold hover:underline">
            Browse all categories <ExternalLink size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: <Code2 size={22} className="text-[#2563EB]" />,
              iconBg: "bg-[#EFF6FF]",
              title: "Frontend Developer",
              desc: "Build beautiful, responsive user interfaces with HTML, CSS, JavaScript, and React.",
              lessons: 24,
              duration: "6 Months",
            },
            {
              icon: <Network size={22} className="text-[#10B981]" />,
              iconBg: "bg-[#ECFDF5]",
              title: "Network Engineer",
              desc: "Design, implement, and manage complex network infrastructures and cloud security.",
              lessons: 18,
              duration: "8 Months",
            },
            {
              icon: <BarChart3 size={22} className="text-[#F59E0B]" />,
              iconBg: "bg-[#FFFBEB]",
              title: "Digital Marketer",
              desc: "Master SEO, content strategy, and data analytics to drive brand growth and engagement.",
              lessons: 15,
              duration: "4 Months",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              <div className={`w-11 h-11 ${card.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#2563EB] transition-colors">
                {card.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{card.desc}</p>
              <div className="flex gap-6 text-xs text-slate-400 border-t border-slate-50 pt-4">
                <div>
                  <p className="font-medium text-slate-300 mb-0.5 uppercase tracking-wider text-[10px]">Modules</p>
                  <p className="font-bold text-slate-700 text-sm">{card.lessons} Lessons</p>
                </div>
                <div>
                  <p className="font-medium text-slate-300 mb-0.5 uppercase tracking-wider text-[10px]">Time</p>
                  <p className="font-bold text-slate-700 text-sm">{card.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">How Nalaruta Works</h2>
          <p className="text-slate-500 text-sm mb-12 max-w-md mx-auto">
            Your roadmap to a new career is built on three core pillars designed for clarity and momentum.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Route size={26} className="text-[#2563EB]" />,
                iconBorder: "border-[#BFDBFE]",
                title: "Interactive Roadmap",
                desc: "Visual, step-by-step paths that show you exactly what to learn and in what order. No more being overwhelmed.",
              },
              {
                icon: <CheckCircle2 size={26} className="text-[#10B981]" />,
                iconBorder: "border-[#A7F3D0]",
                title: "Progress Tracking",
                desc: "Mark milestones as completed and see your progress in real-time. Stay motivated as you build your career blueprint.",
              },
              {
                icon: <BookOpen size={26} className="text-[#F59E0B]" />,
                iconBorder: "border-[#FDE68A]",
                title: "Curated Resources",
                desc: "Each node is packed with the best videos, articles, and projects from across the web, hand-picked by experts.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-full border-2 ${item.iconBorder} flex items-center justify-center mb-5 bg-white shadow-sm`}
                >
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / STATS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {/* Left: Guided by Pros */}
          <div className="bg-[#1E3A8A] rounded-2xl p-8 flex flex-col justify-between min-h-[260px] relative overflow-hidden">
            <div className="absolute right-0 top-0 w-40 h-40 rounded-full bg-[#2563EB]/20 -translate-y-8 translate-x-8" />
            <div className="relative">
              <div className="w-14 h-14 bg-[#2563EB]/30 rounded-full flex items-center justify-center mb-6">
                <Star size={24} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-white text-2xl font-extrabold mb-2">Guided by the Pros</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Learn from industry veterans who have built the roadmaps based on real-world hiring requirements.
              </p>
            </div>
          </div>

          {/* Right: 3 stat cards */}
          <div className="flex flex-col gap-4">
            {/* Active Community */}
            <div className="bg-white rounded-2xl border border-slate-100 px-6 py-4 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 bg-[#EFF6FF] rounded-full flex items-center justify-center flex-shrink-0">
                <Users size={18} className="text-[#2563EB]" />
              </div>
              <div>
                <p className="text-slate-900 font-bold text-sm">Active Community</p>
                <p className="text-slate-500 text-xs">Join 50k+ learners in dedicated discord channels.</p>
              </div>
            </div>

            {/* Bottom two stats */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="bg-[#10B981] rounded-2xl flex flex-col items-center justify-center py-8 shadow-sm">
                <p className="text-white text-4xl font-extrabold">94%</p>
                <p className="text-white/80 text-xs font-semibold mt-1 uppercase tracking-wider">Placement Rate</p>
              </div>
              <div className="bg-[#B45309] rounded-2xl flex flex-col items-center justify-center py-8 shadow-sm">
                <p className="text-white text-4xl font-extrabold">200+</p>
                <p className="text-white/80 text-xs font-semibold mt-1 uppercase tracking-wider">Hiring Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto bg-slate-800 rounded-2xl px-8 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Ready to build your future?
          </h2>
          <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto">
            Join Nalaruta today and get access to all professional roadmaps, project guides, and our community network.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
            >
              Create Free Account
            </a>
            <a
              href="#"
              className="border border-slate-600 hover:border-slate-400 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
            >
              Talk to an Advisor
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-lg font-extrabold text-slate-900">
              Nalaruta<span className="text-[#2563EB]">.</span>
            </p>
            <p className="text-slate-400 text-xs mt-0.5">© 2024 Nalaruta. Guided Ambition.</p>
          </div>
          <ul className="flex flex-wrap gap-5 text-sm text-slate-500">
            {["Privacy Policy", "Terms of Service", "Contact Support", "Documentation"].map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-slate-800 transition-colors">{link}</a>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <a
              href="#"
              className="w-8 h-8 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-400 transition-colors"
            >
              <ChevronRight size={14} />
            </a>
            <a
              href="#"
              className="w-8 h-8 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-400 transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}