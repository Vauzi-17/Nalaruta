import { Compass } from "lucide-react";

interface CircleProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

function CircleProgress({ value, size = 48, strokeWidth = 4 }: CircleProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#2563EB"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

const courses = [
  {
    track: "Frontend Career",
    title: "Advanced React",
    subtitle: "Topic: Custom Hooks",
    progress: 88,
  },
  {
    track: "Design System",
    title: "Visual Identity",
    subtitle: "Topic: Color Theory",
    progress: 24,
  },
];

export default function ActiveCourseCards() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {courses.map((course) => (
        <div
          key={course.title}
          className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-sm transition"
        >
          <p className="text-xs text-blue-600 font-semibold mb-1">{course.track}</p>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-tight">{course.title}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{course.subtitle}</p>
            </div>
            <div className="relative flex items-center justify-center">
              <CircleProgress value={course.progress} />
              <span className="absolute text-xs font-bold text-gray-700">
                {course.progress}%
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Explore New Path Card */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col justify-between hover:shadow-sm transition">
        <div className="flex items-center gap-2 mb-1">
          <Compass className="w-4 h-4 text-blue-600" />
          <p className="text-sm font-semibold text-gray-700">Explore New Path</p>
        </div>
        <p className="text-xs text-gray-400">130+ vocational tracks available</p>
        <button className="mt-3 w-full py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-100 transition">
          Browse Paths →
        </button>
      </div>
    </div>
  );
}