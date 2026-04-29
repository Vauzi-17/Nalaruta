import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ExploreContent from "@/components/explore/ExploreContent";

export default function ExplorePage() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <ExploreContent />
        </main>
      </div>
    </div>
  );
}