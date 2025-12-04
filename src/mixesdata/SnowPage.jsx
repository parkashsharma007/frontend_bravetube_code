import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "../reduxtool/allDataSlice";

const SnowPage = () => {
  const dispatch = useDispatch();

  const { data: allData, loading, error } = useSelector(
    (state) => state.allData
  );

  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  if (loading) return <p className="p-4 text-lg">Loading...</p>;
  if (error) return <p className="p-4 text-lg text-red-500">{error}</p>;

  // ⭐ SnowPage ke liye mixes walo me se 9 videos le lo
  const MixesData = allData?.filter((v) => v.type === "mixes") || [];

  // ⭐ Only 9 videos (first 9)
  const SnowData = MixesData.slice(0, 9);

  if (SnowData.length === 0)
    return <p className="p-4 text-lg">No videos found</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {SnowData.map((video) => (
        <div
          key={video.id}
          className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setActiveVideo(video.id)}
        >
          {activeVideo === video.id ? (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
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

export default SnowPage;
