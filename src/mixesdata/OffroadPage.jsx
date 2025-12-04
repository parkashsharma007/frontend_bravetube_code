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

  if (loading) return <p className="p-6 text-lg">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  // ⭐ Mixes videos
  const mixesData = allData?.filter((v) => v.type === "mixes") || [];

  // ⭐ Reels videos
  const reelsData = allData?.filter((v) => v.type === "reels") || [];

  // ⭐ Combine both
  const combined = [...mixesData, ...reelsData];

  // ⭐ Shuffle randomly
  const shuffled = combined.sort(() => Math.random() - 0.5);

  // ⭐ Take 20 items
  const OffroadData = shuffled.slice(0, 20);

  if (OffroadData.length === 0)
    return <p className="p-6 text-lg">No Offroad videos found</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {OffroadData.map((v) => (
        <div
          key={v.id}
          className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setActiveVideo(v.videoId)}   // ⭐ Store videoId here
        >
          {activeVideo === v.videoId ? (   // ⭐ Match using videoId
            <iframe
              className="w-full h-48"
              src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1`}
              allow="autoplay"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src={v.thumbnail}
              className="w-full h-48 object-cover"
              alt={v.title}
            />
          )}

          <div className="p-4">
            <h2 className="text-lg font-semibold">{v.title}</h2>
            <p className="text-sm text-gray-600">{v.channelTitle}</p>
            <p className="text-sm text-gray-500">{v.views} views</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OffroadPage;
