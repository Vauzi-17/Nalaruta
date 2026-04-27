import { PlayCircle, Clock, Download, ChevronRight } from "lucide-react";

export default function ContinueLearning() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <PlayCircle className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-bold text-gray-900">Continue Learning</h2>
        </div>
        <button className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
          View Roadmap <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="flex gap-5">
        {/* Video Thumbnail */}
        <div className="relative w-48 h-28 bg-gray-800 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-blue-900/60" />
          <div className="relative z-10 w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
            <PlayCircle className="w-6 h-6 text-white" />
          </div>
          {/* Module Badge */}
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md z-10">
            NODE 54
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400">45 min remaining</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 leading-snug mb-1.5">
            Understanding React Context API & Patterns
          </h3>
          <p className="text-xs text-gray-500 mb-4 line-clamp-2">
            Learn how to manage global state without prop drilling. This module covers...
          </p>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition">
              <PlayCircle className="w-3.5 h-3.5" />
              Resume Lesson
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50 transition">
              <Download className="w-3.5 h-3.5" />
              Download Assets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}