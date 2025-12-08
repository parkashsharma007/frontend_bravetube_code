import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "../reduxtool/allDataSlice";

const OffroadPage = () => {
  const dispatch = useDispatch();

  const { data: allData, loading, error } = useSelector(
    (state) => state.allData
  );

  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  if (loading) return <p className="p-4 sm:p-6 text-sm sm:text-base md:text-lg text-center">Loading...</p>;
  if (error) return <p className="p-4 sm:p-6 text-sm sm:text-base text-red-500 text-center">{error}</p>;

  const mixesData = allData?.filter((v) => v.type === "mixes") || [];
  const reelsData = allData?.filter((v) => v.type === "reels") || [];
  const combined = [...mixesData, ...reelsData];
  const shuffled = combined.sort(() => Math.random() - 0.5);
  const OffroadData = shuffled.slice(0, 20);

  if (OffroadData.length === 0)
    return <p className="p-4 sm:p-6 text-sm sm:text-base md:text-lg text-center">No Offroad videos found</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 p-2 sm:p-4 md:p-6">
      {OffroadData.map((v) => (
        <div
          key={v.id}
          className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setActiveVideo(v.videoId || v.id)}
        >
          {activeVideo === (v.videoId || v.id) ? (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${v.videoId || v.id}?autoplay=1`}
                allow="autoplay"
                allowFullScreen
                title={v.title}
              ></iframe>
            </div>
          ) : (
            <img
              src={v.thumbnail}
              className="w-full h-40 sm:h-48 object-cover"
              alt={v.title}
            />
          )}

          <div className="p-2 sm:p-3 md:p-4">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold line-clamp-2">{v.title}</h2>
            <p className="text-xs sm:text-sm text-gray-600 truncate mt-1">{v.channelTitle}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{v.views} views</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OffroadPage;
