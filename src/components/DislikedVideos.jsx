import React from "react";
import { useSelector } from "react-redux";

const DislikedVideos = () => {
  const disliked = useSelector((state) => state.liked.disliked);

  return (
    <div className="p-6 ml-6">
      <h1 className="text-2xl font-bold mb-4">Disliked Videos</h1>

      {disliked.length === 0 ? (
        <p className="text-gray-500 text-lg">No disliked videos yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {disliked.map((v) => (
            <div key={v.id} className="bg-white shadow rounded-lg p-3">
              <img
                src={v.thumbnail}
                className="rounded-lg w-full h-40 object-cover"
              />

              <h2 className="font-semibold mt-2">{v.title}</h2>
              <p className="text-sm text-gray-600">{v.channelTitle}</p>
              <p className="text-sm text-gray-600">{v.views} views</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DislikedVideos;
