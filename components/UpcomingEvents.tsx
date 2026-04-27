import { Calendar, ChevronRight } from "lucide-react";

export default function UpcomingEvents() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h2 className="text-sm font-bold text-gray-900 mb-4">Upcoming Community Events</h2>

      <div className="border border-gray-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded-md uppercase tracking-wide">
            Workshop
          </span>
          <span className="text-xs text-gray-400">Tomorrow, 15:00</span>
        </div>
        <p className="text-sm font-bold text-gray-900 mb-1">Mock Interview: Frontend</p>
        <p className="text-xs text-gray-500">Practice technical questions with seniors.</p>
      </div>

      <button className="mt-4 w-full flex items-center justify-center gap-1 text-xs text-blue-600 font-medium py-2 border border-blue-100 rounded-lg hover:bg-blue-50 transition">
        View Community Calendar <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}