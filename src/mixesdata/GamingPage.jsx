import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "../reduxtool/allDataSlice";

const GamingPage = () => {
  const dispatch = useDispatch();

  const { data: allData, loading, error } = useSelector(
    (state) => state.allData
  );

  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  if (loading) return <p className="text-lg p-4">Loading...</p>;
  if (error) return <p className="text-lg p-4 text-red-500">{error}</p>;

  // ⭐ FILTER gaming data → your dataset me type = "reels"
  const GamingData =
    allData?.filter((video) => video.type === "reels") || [];

  if (GamingData.length === 0)
    return <p className="text-lg p-4">No Gaming videos found</p>;

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-2">
      {GamingData.map((video) => (
        <div
          key={video.id}
          className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform mx-auto w-72"
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
              />
            </div>
          )}

          <div className="p-3">
            <h2 className="font-semibold text-lg">{video.title}</h2>
            <p className="text-sm text-gray-600">{video.channelTitle}</p>
            <p className="text-sm text-gray-500">{video.views} views</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GamingPage;
