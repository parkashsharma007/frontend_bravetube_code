import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "../reduxtool/allDataSlice";

const VacationsPage = () => {
  const dispatch = useDispatch();

  const { data: allData, loading, error } = useSelector(
    (state) => state.allData
  );

  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  if (loading) return <p className="p-6 text-lg">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  // ⭐ Gaming data (type: reels)
  const gamingData = allData?.filter((v) => v.type === "reels") || [];

  // ⭐ Climbing data (type: climbing)
  const climbingData = allData?.filter((v) => v.type === "climbing") || [];

  // ⭐ Mixed final data: 7 gaming + 7 climbing
  const finalData = [
    ...gamingData.slice(0, 7),
    ...climbingData.slice(0, 7),
  ];

  if (finalData.length === 0)
    return <p className="p-6 text-lg">No videos found</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {finalData.map((video) => (
        <div
          key={video.id}
          className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setActiveVideo(video.id)}
        >
          {activeVideo === video.id ? (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                allow="autoplay"
                allowFullScreen
                title={video.title}
              ></iframe>
            </div>
          ) : (
            <div className="aspect-video w-full">
              <img
                src={video.thumbnail}
                className="w-full h-full object-cover"
                alt={video.title}
              />
            </div>
          )}

          <div className="p-4">
            <h2 className="font-semibold text-lg">{video.title}</h2>
            <p className="text-sm text-gray-600">{video.channelTitle}</p>
            <p className="text-sm text-gray-500">{video.views} views</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VacationsPage;
