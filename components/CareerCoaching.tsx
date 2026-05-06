import { Calendar } from "lucide-react";

export default function CareerCoaching() {
  return (
    <div className="bg-blue-600 rounded-xl p-4 text-white">
      <div className="flex items-center gap-2 mb-1">
        <Calendar className="w-4 h-4" />
        <p className="text-sm font-bold">Career Coaching</p>
      </div>
      <p className="text-xs text-blue-100 mb-3">
        Book a 1:1 session with an industry expert.
      </p>
      <button className="w-full py-1.5 bg-white text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-50 transition">
        Schedule Now
      </button>
    </div>
  );
}