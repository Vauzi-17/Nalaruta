export default function ActiveTracks() {
  const tracks = [
    { label: "Frontend Dev", value: 88 },
    { label: "UI Design", value: 34 },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-3 mb-3">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
        Active Tracks
      </p>
      <div className="space-y-2.5">
        {tracks.map((track) => (
          <div key={track.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600 font-medium">{track.label}</span>
              <span className="text-xs font-bold text-blue-600">{track.value}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${track.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}