import React, { useEffect, useState } from "react";

const WatchLater = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchLater")) || [];
    setVideos(saved);
  }, []);

  const clearAll = () => {
    localStorage.removeItem("watchLater");
    setVideos([]);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold">Watch Later Videos</h1>
        {videos.length > 0 && (
          <button
            onClick={clearAll}
            className="bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base"
          >
            Clear All
          </button>
        )}
      </div>

      {videos.length === 0 ? (
        <p className="text-sm sm:text-base text-gray-500 text-center py-8">No videos added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-32 sm:h-40 object-cover"
              />
              <div className="p-2 sm:p-3">
                <h2 className="font-semibold text-sm sm:text-base line-clamp-2">{video.title}</h2>
                <p className="text-xs sm:text-sm text-gray-600 truncate mt-1">{video.channelTitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchLater;
