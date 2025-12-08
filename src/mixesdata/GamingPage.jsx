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

  if (loading) return <p className="text-sm sm:text-base md:text-lg p-4 text-center">Loading...</p>;
  if (error) return <p className="text-sm sm:text-base md:text-lg p-4 text-red-500 text-center">{error}</p>;

  const GamingData = allData?.filter((video) => video.type === "reels") || [];

  if (GamingData.length === 0)
    return <p className="text-sm sm:text-base md:text-lg p-4 text-center">No Gaming videos found</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 p-2 sm:p-4">
      {GamingData.map((video) => (
        <div
          key={video.id}
          className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setActiveVideo(video.id)}
        >
          {activeVideo === video.id ? (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video.videoId || video.id}?autoplay=1`}
                allow="autoplay"
                allowFullScreen
                title={video.title}
              ></iframe>
            </div>
          ) : (
            <div className="aspect-video w-full">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-2 sm:p-3 md:p-4">
            <h2 className="font-semibold text-sm sm:text-base md:text-lg line-clamp-2">{video.title}</h2>
            <p className="text-xs sm:text-sm text-gray-600 truncate mt-1">{video.channelTitle}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{video.views} views</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GamingPage;
