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
    <div>
      <h1 className="text-2xl font-bold mb-4">Watch Later Videos</h1>

      {videos.length === 0 ? (
        <p>No videos added yet.</p>
      ) : (
        <>
          <button
            onClick={clearAll}
            className="bg-red-600 text-white px-4 py-2 rounded mb-4"
          >
            Clear All
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-white shadow rounded">
                <img
                  src={video.thumbnail}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h2 className="font-semibold">{video.title}</h2>
                  <p>{video.channelTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WatchLater;
