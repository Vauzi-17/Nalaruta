"use client";

import { Search, Bell } from "lucide-react";
import Image from "next/image";

const navLinks = ["Explore", "My Roadmap", "Resources", "Community"];

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0">
      {/* Nav Links */}
      <nav className="flex items-center gap-6">
        {navLinks.map((link) => (
          <button
            key={link}
            className={`text-sm font-medium transition-colors ${
              link === "My Roadmap"
                ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {link}
          </button>
        ))}
      </nav>

      {/* Right: Search + Avatar */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-52"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-gray-50 transition">
          <Bell className="w-4 h-4 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
}