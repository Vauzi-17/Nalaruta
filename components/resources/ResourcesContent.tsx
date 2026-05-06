"use client";

import { useState } from "react";
import {
  Search,
  BookOpen,
  Video,
  FileText,
  Headphones,
  Bookmark,
  BookmarkCheck,
  Clock,
  Star,
  TrendingUp,
  Filter,
  ChevronRight,
  Play,
  ExternalLink,
  Flame,
  Award,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────
type ResourceType = "all" | "article" | "video" | "podcast" | "cheatsheet";
type TopicFilter =
  | "all"
  | "react"
  | "typescript"
  | "css"
  | "nodejs"
  | "design"
  | "career";

interface Resource {
  id: number;
  type: "article" | "video" | "podcast" | "cheatsheet";
  title: string;
  description: string;
  topic: TopicFilter;
  duration: string;
  author: string;
  authorInitial: string;
  authorColor: string;
  rating: number;
  views: string;
  date: string;
  tags: string[];
  featured?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
}

// ─── Data ────────────────────────────────────────────────
const resources: Resource[] = [
  {
    id: 1,
    type: "article",
    title: "React Context API vs Zustand: When to Use What",
    description:
      "A deep dive into state management patterns — when global context is enough and when you need a dedicated store.",
    topic: "react",
    duration: "12 min read",
    author: "Sarah Chen",
    authorInitial: "S",
    authorColor: "bg-purple-500",
    rating: 4.9,
    views: "24.3k",
    date: "2 days ago",
    tags: ["React", "State Management"],
    featured: true,
    isTrending: true,
  },
  {
    id: 2,
    type: "video",
    title: "TypeScript Generics Explained in 20 Minutes",
    description:
      "From basic generics to advanced conditional types — everything you need with real-world examples.",
    topic: "typescript",
    duration: "20:14",
    author: "Mark Rivera",
    authorInitial: "M",
    authorColor: "bg-blue-500",
    rating: 4.8,
    views: "18.7k",
    date: "1 week ago",
    tags: ["TypeScript", "Advanced"],
    isTrending: true,
  },
  {
    id: 3,
    type: "cheatsheet",
    title: "CSS Grid & Flexbox Complete Cheatsheet",
    description:
      "Every property you'll ever need for modern CSS layout — printable and searchable reference.",
    topic: "css",
    duration: "Quick ref",
    author: "Nalaruta Team",
    authorInitial: "N",
    authorColor: "bg-green-500",
    rating: 5.0,
    views: "41.2k",
    date: "3 weeks ago",
    tags: ["CSS", "Layout"],
    isNew: false,
  },
  {
    id: 4,
    type: "podcast",
    title: "Landing Your First Dev Job in 2025",
    description:
      "Senior engineers share what they look for in junior candidates, portfolio tips, and how to ace the technical interview.",
    topic: "career",
    duration: "48:30",
    author: "DevTalk Podcast",
    authorInitial: "D",
    authorColor: "bg-orange-500",
    rating: 4.7,
    views: "9.1k",
    date: "5 days ago",
    tags: ["Career", "Interview"],
    isNew: true,
  },
  {
    id: 5,
    type: "article",
    title: "Building a Design System from Scratch",
    description:
      "How to create scalable, accessible component libraries using Storybook, Tailwind, and design tokens.",
    topic: "design",
    duration: "18 min read",
    author: "Priya Nair",
    authorInitial: "P",
    authorColor: "bg-pink-500",
    rating: 4.8,
    views: "15.6k",
    date: "1 week ago",
    tags: ["Design System", "Tailwind"],
  },
  {
    id: 6,
    type: "video",
    title: "Node.js Streams & Event Loop Deep Dive",
    description:
      "Understand exactly how Node's non-blocking I/O works, including streams, buffers, and the event loop phases.",
    topic: "nodejs",
    duration: "35:50",
    author: "James Okafor",
    authorInitial: "J",
    authorColor: "bg-teal-500",
    rating: 4.9,
    views: "13.4k",
    date: "2 weeks ago",
    tags: ["Node.js", "Backend"],
  },
  {
    id: 7,
    type: "article",
    title: "CSS Container Queries: The Layout Revolution",
    description:
      "Why container queries change everything about responsive design and how to use them today.",
    topic: "css",
    duration: "9 min read",
    author: "Lena Müller",
    authorInitial: "L",
    authorColor: "bg-indigo-500",
    rating: 4.6,
    views: "11.2k",
    date: "3 days ago",
    tags: ["CSS", "Responsive"],
    isNew: true,
  },
  {
    id: 8,
    type: "cheatsheet",
    title: "TypeScript Utility Types Reference",
    description:
      "Partial, Required, Pick, Omit, Record and more — with examples for every utility type.",
    topic: "typescript",
    duration: "Quick ref",
    author: "Nalaruta Team",
    authorInitial: "N",
    authorColor: "bg-green-500",
    rating: 4.9,
    views: "28.8k",
    date: "1 month ago",
    tags: ["TypeScript", "Reference"],
  },
  {
    id: 9,
    type: "podcast",
    title: "The Future of React: Server Components & Beyond",
    description:
      "React core team members discuss RSC, Suspense, concurrent features, and the road ahead.",
    topic: "react",
    duration: "1:02:15",
    author: "React Podcast",
    authorInitial: "R",
    authorColor: "bg-cyan-500",
    rating: 4.8,
    views: "7.4k",
    date: "4 days ago",
    tags: ["React", "Server Components"],
    isNew: true,
  },
];

// ─── Config ───────────────────────────────────────────────
const typeFilters: { label: string; value: ResourceType; icon: React.ElementType }[] = [
  { label: "All", value: "all", icon: BookOpen },
  { label: "Articles", value: "article", icon: FileText },
  { label: "Videos", value: "video", icon: Video },
  { label: "Podcasts", value: "podcast", icon: Headphones },
  { label: "Cheatsheets", value: "cheatsheet", icon: FileText },
];

const topicFilters: { label: string; value: TopicFilter }[] = [
  { label: "All Topics", value: "all" },
  { label: "React", value: "react" },
  { label: "TypeScript", value: "typescript" },
  { label: "CSS", value: "css" },
  { label: "Node.js", value: "nodejs" },
  { label: "Design", value: "design" },
  { label: "Career", value: "career" },
];

const typeIconMap: Record<Resource["type"], React.ElementType> = {
  article: FileText,
  video: Video,
  podcast: Headphones,
  cheatsheet: BookOpen,
};

const typeBadgeMap: Record<Resource["type"], string> = {
  article: "bg-blue-50 text-blue-600",
  video: "bg-red-50 text-red-500",
  podcast: "bg-orange-50 text-orange-500",
  cheatsheet: "bg-green-50 text-green-600",
};

const typeLabel: Record<Resource["type"], string> = {
  article: "Article",
  video: "Video",
  podcast: "Podcast",
  cheatsheet: "Cheatsheet",
};

// ─── Component ────────────────────────────────────────────
export default function ResourcesContent() {
  const [activeType, setActiveType] = useState<ResourceType>("all");
  const [activeTopic, setActiveTopic] = useState<TopicFilter>("all");
  const [search, setSearch] = useState("");
  const [bookmarked, setBookmarked] = useState<number[]>([3, 1]);
  const [sortBy, setSortBy] = useState<"trending" | "newest" | "rating">("trending");

  const toggleBookmark = (id: number) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const filtered = resources
    .filter((r) => {
      const matchType = activeType === "all" || r.type === activeType;
      const matchTopic = activeTopic === "all" || r.topic === activeTopic;
      const matchSearch =
        search === "" ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchType && matchTopic && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return a.date.localeCompare(b.date);
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    });

  const featured = resources.find((r) => r.featured);
  const savedCount = bookmarked.length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
          <p className="text-sm text-gray-500 mt-1">
            Curated articles, videos, podcasts & cheatsheets for your learning journey.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2">
          <BookmarkCheck className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-gray-700">{savedCount} Saved</span>
        </div>
      </div>

      {/* Featured Resource */}
      {featured && (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 flex gap-5 items-start hover:shadow-md transition">
          <div className="w-48 h-28 bg-blue-600 rounded-xl shrink-0 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-700/40" />
            <Play className="w-10 h-10 text-white/80 relative z-10" />
            <div className="absolute top-2 left-2 bg-orange-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-md z-10 flex items-center gap-1">
              <Flame className="w-3 h-3" /> Trending
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md uppercase">
                Featured Article
              </span>
              <span className="text-[10px] text-gray-400">{featured.date}</span>
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-1">{featured.title}</h2>
            <p className="text-xs text-gray-500 mb-3 max-w-lg">{featured.description}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full ${featured.authorColor} flex items-center justify-center text-white text-[10px] font-bold`}>
                  {featured.authorInitial}
                </div>
                <span className="text-xs text-gray-600 font-medium">{featured.author}</span>
              </div>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {featured.duration}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {featured.rating}
              </span>
              <button className="ml-auto flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition">
                Read Now <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Resources", value: `${resources.length}`, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Videos", value: `${resources.filter(r => r.type === "video").length}`, icon: Video, color: "text-red-500", bg: "bg-red-50" },
          { label: "Articles", value: `${resources.filter(r => r.type === "article").length}`, icon: FileText, color: "text-indigo-500", bg: "bg-indigo-50" },
          { label: "Saved", value: `${savedCount}`, icon: Bookmark, color: "text-green-600", bg: "bg-green-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3">
            <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              <p className="text-[10px] text-gray-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-gray-400" />
          {(["trending", "newest", "rating"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition ${
                sortBy === s
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {s === "trending" ? "🔥 Trending" : s === "newest" ? "✨ Newest" : "⭐ Top Rated"}
            </button>
          ))}
        </div>
      </div>

      {/* Type Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {typeFilters.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.value}
              onClick={() => setActiveType(t.value)}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition ${
                activeType === t.value
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Topic Pills */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {topicFilters.map((t) => (
          <button
            key={t.value}
            onClick={() => setActiveTopic(t.value)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition ${
              activeTopic === t.value
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="text-xs text-gray-400 mb-4">
        Showing <span className="font-semibold text-gray-600">{filtered.length}</span> resources
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            isBookmarked={bookmarked.includes(resource.id)}
            onBookmark={() => toggleBookmark(resource.id)}
          />
        ))}

        {filtered.length === 0 && (
          <div className="col-span-3 flex flex-col items-center justify-center py-16 text-gray-400">
            <Search className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm font-medium">No resources found</p>
            <p className="text-xs mt-1">Try a different search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Resource Card ────────────────────────────────────────
function ResourceCard({
  resource,
  isBookmarked,
  onBookmark,
}: {
  resource: Resource;
  isBookmarked: boolean;
  onBookmark: () => void;
}) {
  const TypeIcon = typeIconMap[resource.type];
  const isVideo = resource.type === "video";
  const isPodcast = resource.type === "podcast";

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col group cursor-pointer">
      {/* Top */}
      <div className="flex items-start justify-between mb-3">
        <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${typeBadgeMap[resource.type]}`}>
          <TypeIcon className="w-3 h-3" />
          {typeLabel[resource.type]}
        </span>
        <div className="flex items-center gap-1.5">
          {resource.isNew && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-green-100 text-green-600 rounded-md">
              New
            </span>
          )}
          {resource.isTrending && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-orange-100 text-orange-500 rounded-md flex items-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5" /> Hot
            </span>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onBookmark(); }}
            className="p-1 rounded-lg hover:bg-gray-100 transition"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-blue-600" />
            ) : (
              <Bookmark className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition" />
            )}
          </button>
        </div>
      </div>

      {/* Video thumbnail placeholder */}
      {isVideo && (
        <div className="w-full h-24 bg-gray-800 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
          <div className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center">
            <Play className="w-4 h-4 text-white ml-0.5" />
          </div>
        </div>
      )}

      {isPodcast && (
        <div className="w-full h-16 bg-orange-50 rounded-lg mb-3 flex items-center justify-center gap-2">
          {[3,5,8,5,7,4,6,8,3,5,7,4].map((h, i) => (
            <div
              key={i}
              className="w-1 bg-orange-400 rounded-full"
              style={{ height: `${h * 3}px` }}
            />
          ))}
        </div>
      )}

      {/* Title */}
      <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
        {resource.title}
      </h3>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">{resource.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {resource.tags.map((tag) => (
          <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md font-medium">
            {tag}
          </span>
        ))}
      </div>

      {/* Author + Meta */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full ${resource.authorColor} flex items-center justify-center text-white text-[10px] font-bold`}>
            {resource.authorInitial}
          </div>
          <span className="text-[10px] text-gray-500 font-medium">{resource.author}</span>
        </div>
        <div className="flex items-center gap-2.5 text-[10px] text-gray-400">
          <span className="flex items-center gap-0.5">
            <Clock className="w-3 h-3" /> {resource.duration}
          </span>
          <span className="flex items-center gap-0.5">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {resource.rating}
          </span>
        </div>
      </div>

      {/* CTA */}
      <button className="mt-3 w-full py-2 text-xs font-semibold rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition flex items-center justify-center gap-1">
        {isVideo ? "Watch Now" : isPodcast ? "Listen Now" : "Read Now"}
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}