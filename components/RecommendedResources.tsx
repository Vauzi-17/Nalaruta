import { FileText, Video } from "lucide-react";

const resources = [
  {
    icon: FileText,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    title: "Tailwind Grid...",
    meta: "Article • 12 min read",
  },
  {
    icon: Video,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    title: "Async/Await in S...",
    meta: "Video • 55:40",
  },
];

export default function RecommendedResources() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h2 className="text-sm font-bold text-gray-900 mb-4">Recommended Resources</h2>
      <div className="space-y-3">
        {resources.map((res) => (
          <div
            key={res.title}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition"
          >
            <div className={`w-9 h-9 rounded-lg ${res.iconBg} flex items-center justify-center shrink-0`}>
              <res.icon className={`w-4 h-4 ${res.iconColor}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{res.title}</p>
              <p className="text-xs text-gray-400">{res.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}