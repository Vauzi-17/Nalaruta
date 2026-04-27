import { CheckCircle, Award, MessageSquare, BookOpen, ChevronRight } from "lucide-react";

const activities = [
  {
    icon: CheckCircle,
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
    time: "2 hours ago",
    title: "Completed Lesson:",
    description: "JS ES6 Modules & Scope",
    badge: "+50 Skill Points",
    badgeColor: "text-green-600 bg-green-50",
  },
  {
    icon: Award,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
    time: "Yesterday",
    title: "Milestone Reached:",
    description: "React Fundamentals Badge",
    badge: null,
    badgeColor: "",
  },
  {
    icon: MessageSquare,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
    time: "2 days ago",
    title: "Posted in #frontend-help:",
    description: '"Struggling with Redux..."',
    badge: null,
    badgeColor: "",
  },
  {
    icon: BookOpen,
    iconColor: "text-gray-400",
    bgColor: "bg-gray-50",
    time: "Last week",
    title: "Started UI Design Masterclass",
    description: "",
    badge: null,
    badgeColor: "",
  },
];

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-900">Activity Feed</h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex gap-3">
            <div className={`w-7 h-7 rounded-full ${activity.bgColor} flex items-center justify-center shrink-0 mt-0.5`}>
              <activity.icon className={`w-3.5 h-3.5 ${activity.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-400 mb-0.5">{activity.time}</p>
              <p className="text-xs font-semibold text-gray-700 leading-tight">
                {activity.title}{" "}
                <span className="font-normal text-gray-600">{activity.description}</span>
              </p>
              {activity.badge && (
                <span className={`inline-block mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${activity.badgeColor}`}>
                  {activity.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full flex items-center justify-center gap-1 text-xs text-blue-600 font-medium py-2 border border-blue-100 rounded-lg hover:bg-blue-50 transition">
        View All Activity <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}