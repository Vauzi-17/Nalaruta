import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ActiveTracks from "@/components/ActiveTracks";
import CareerCoaching from "@/components/CareerCoaching";
import ActiveCourseCards from "@/components/ActiveCourseCards";
import ContinueLearning from "@/components/ContinueLearning";
import ActivityFeed from "@/components/ActivityFeed";
import RecommendedResources from "@/components/RecommendedResources";
import UpcomingEvents from "@/components/UpcomingEvents";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Scrollable Body */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Banner */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, Alex!</h1>
              <p className="text-sm text-gray-500 mt-1">
                You&apos;ve completed 4 lessons this week. Keep the momentum going!
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                Share Progress
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                New Path
              </button>
            </div>
          </div>

          {/* Active Course Cards */}
          <ActiveCourseCards />

          {/* Middle Section: Continue Learning + Activity Feed */}
          <div className="grid grid-cols-3 gap-5 mt-5">
            <div className="col-span-2">
              <ContinueLearning />
            </div>
            <div>
              <ActivityFeed />
            </div>
          </div>

          {/* Bottom Section: Resources + Events */}
          <div className="grid grid-cols-2 gap-5 mt-5">
            <RecommendedResources />
            <UpcomingEvents />
          </div>
        </main>
      </div>
    </div>
  );
}