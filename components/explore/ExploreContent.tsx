"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Code2,
  Palette,
  Database,
  Smartphone,
  Shield,
  BarChart3,
  Cloud,
  Brain,
  Star,
  Users,
  Clock,
  ChevronRight,
  Flame,
  BookOpen,
  Zap,
} from "lucide-react";

const categories = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Design", value: "design" },
  { label: "Mobile", value: "mobile" },
  { label: "Data", value: "data" },
  { label: "DevOps", value: "devops" },
  { label: "AI/ML", value: "ai" },
];

const difficulties = ["All Levels", "Beginner", "Intermediate", "Advanced"];

interface Roadmap {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  level: string;
  duration: string;
  learners: string;
  rating: number;
  modules: number;
  tags: string[];
  badge?: string;
  badgeColor?: string;
  progress?: number;
}

const roadmaps: Roadmap[] = [
  {
    id: 1,
    title: "Frontend Developer",
    description: "Master modern web development with React, TypeScript, and performance optimization techniques.",
    category: "frontend",
    icon: Code2,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    level: "Beginner → Advanced",
    duration: "6 months",
    learners: "12.4k",
    rating: 4.9,
    modules: 48,
    tags: ["React", "TypeScript", "Next.js"],
    badge: "Most Popular",
    badgeColor: "bg-blue-100 text-blue-700",
    progress: 88,
  },
  {
    id: 2,
    title: "UI/UX & Design Systems",
    description: "Build stunning interfaces with Figma, design tokens, accessibility, and component libraries.",
    category: "design",
    icon: Palette,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    level: "Beginner → Intermediate",
    duration: "4 months",
    learners: "8.1k",
    rating: 4.8,
    modules: 32,
    tags: ["Figma", "Design Tokens", "A11y"],
    badge: "Trending",
    badgeColor: "bg-orange-100 text-orange-600",
    progress: 34,
  },
  {
    id: 3,
    title: "Backend Engineering",
    description: "APIs, databases, authentication, microservices, and system architecture patterns.",
    category: "backend",
    icon: Database,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    level: "Intermediate → Advanced",
    duration: "5 months",
    learners: "9.7k",
    rating: 4.7,
    modules: 41,
    tags: ["Node.js", "PostgreSQL", "REST"],
    badge: undefined,
    badgeColor: undefined,
  },
  {
    id: 4,
    title: "Mobile Development",
    description: "Cross-platform iOS & Android apps with React Native, Expo, and native device APIs.",
    category: "mobile",
    icon: Smartphone,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
    level: "Intermediate",
    duration: "4 months",
    learners: "5.3k",
    rating: 4.6,
    modules: 35,
    tags: ["React Native", "Expo", "iOS/Android"],
    badge: "New",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    id: 5,
    title: "Cybersecurity Fundamentals",
    description: "Ethical hacking, penetration testing, security audits, and defensive strategies.",
    category: "backend",
    icon: Shield,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    level: "Intermediate → Advanced",
    duration: "5 months",
    learners: "4.2k",
    rating: 4.8,
    modules: 38,
    tags: ["OWASP", "Pentesting", "Auth"],
    badge: undefined,
    badgeColor: undefined,
  },
  {
    id: 6,
    title: "Data Analytics",
    description: "From raw data to insights — SQL, Python, visualization, and business intelligence.",
    category: "data",
    icon: BarChart3,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    level: "Beginner → Intermediate",
    duration: "3 months",
    learners: "7.8k",
    rating: 4.7,
    modules: 28,
    tags: ["Python", "SQL", "Tableau"],
    badge: undefined,
    badgeColor: undefined,
  },
  {
    id: 7,
    title: "Cloud & DevOps",
    description: "CI/CD pipelines, containerization, Kubernetes, AWS/GCP, and infrastructure as code.",
    category: "devops",
    icon: Cloud,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    level: "Intermediate → Advanced",
    duration: "6 months",
    learners: "6.5k",
    rating: 4.8,
    modules: 44,
    tags: ["Docker", "AWS", "Kubernetes"],
    badge: "Hot",
    badgeColor: "bg-red-100 text-red-600",
  },
  {
    id: 8,
    title: "AI & Machine Learning",
    description: "Neural networks, NLP, computer vision, and deploying ML models to production.",
    category: "ai",
    icon: Brain,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    level: "Advanced",
    duration: "8 months",
    learners: "10.2k",
    rating: 4.9,
    modules: 56,
    tags: ["Python", "PyTorch", "LLMs"],
    badge: "Most Popular",
    badgeColor: "bg-blue-100 text-blue-700",
  },
];

const featuredPath = roadmaps[0];

export default function ExploreContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState("All Levels");
  const [search, setSearch] = useState("");

  const filtered = roadmaps.filter((r) => {
    const matchCat = activeCategory === "all" || r.category === activeCategory;
    const matchDiff =
      activeDifficulty === "All Levels" ||
      r.level.toLowerCase().includes(activeDifficulty.toLowerCase());
    const matchSearch =
      search === "" ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchDiff && matchSearch;
  });

  return (
    <div>
      {/* Page Title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Explore Roadmaps</h1>
          <p className="text-sm text-gray-500 mt-1">
            130+ structured learning paths — find yours and start today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <BookOpen className="w-4 h-4" />
          <span>{roadmaps.length * 15}+ lessons available</span>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="bg-blue-600 rounded-2xl p-6 mb-6 flex items-center justify-between relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute right-32 top-0 w-40 h-40 bg-blue-500 rounded-full -translate-y-10 opacity-50" />
        <div className="absolute right-16 bottom-0 w-24 h-24 bg-blue-700 rounded-full translate-y-8 opacity-60" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-orange-300" />
            <span className="text-xs font-semibold text-blue-100 uppercase tracking-wide">
              Continue Your Journey
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{featuredPath.title}</h2>
          <p className="text-sm text-blue-100 mb-4 max-w-md">{featuredPath.description}</p>
          <div className="flex items-center gap-4">
            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <div className="w-32 h-1.5 bg-blue-400 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${featuredPath.progress}%` }}
                />
              </div>
              <span className="text-xs font-bold text-white">{featuredPath.progress}%</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-50 transition">
              Resume <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="relative z-10 hidden md:flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5">
            <Users className="w-3.5 h-3.5 text-white" />
            <span className="text-xs text-white font-medium">{featuredPath.learners} learners</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5">
            <Zap className="w-3.5 h-3.5 text-white" />
            <span className="text-xs text-white font-medium">{featuredPath.modules} modules</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5">
            <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span className="text-xs text-white font-medium">{featuredPath.rating} rating</span>
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search roadmaps or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          <div className="flex gap-1">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDifficulty(d)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                  activeDifficulty === d
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition ${
              activeCategory === cat.value
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-xs text-gray-400 mb-4">
        Showing <span className="font-semibold text-gray-600">{filtered.length}</span> roadmaps
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((roadmap) => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-4 flex flex-col items-center justify-center py-16 text-gray-400">
            <Search className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm font-medium">No roadmaps found</p>
            <p className="text-xs mt-1">Try a different search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}

function RoadmapCard({ roadmap }: { roadmap: Roadmap }) {
  const Icon = roadmap.icon;
  const isActive = roadmap.progress !== undefined;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col">
      {/* Top Row */}
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 ${roadmap.iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${roadmap.iconColor}`} />
        </div>
        {roadmap.badge && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${roadmap.badgeColor}`}>
            {roadmap.badge}
          </span>
        )}
      </div>

      {/* Title & Desc */}
      <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
        {roadmap.title}
      </h3>
      <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">{roadmap.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {roadmap.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Progress (if enrolled) */}
      {isActive && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-400">Progress</span>
            <span className="text-[10px] font-bold text-blue-600">{roadmap.progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${roadmap.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-3 border-t border-gray-50">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{roadmap.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span>{roadmap.learners}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="font-semibold text-gray-600">{roadmap.rating}</span>
        </div>
      </div>

      {/* CTA */}
      <button className={`mt-3 w-full py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1 ${
        isActive
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-blue-50 text-blue-600 hover:bg-blue-100"
      }`}>
        {isActive ? "Continue" : "Start Path"}
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}