import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "../reduxtool/allDataSlice";
import { useNavigate } from "react-router-dom";

const Subscriptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subs, setSubs] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const { data: allData, loading } = useSelector((state) => state.allData);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("subscriptions")) || [];
    setSubs(saved);
    dispatch(fetchAllData());
  }, [dispatch]);

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
  };

  const channelVideos = selectedChannel
    ? allData?.filter((video) => video.channelTitle === selectedChannel) || []
    : [];

  if (selectedChannel) {
    return (
      <div className="p-3 sm:p-4 md:p-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setSelectedChannel(null)}
            className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            ← Back
          </button>
          <h1 className="text-xl sm:text-2xl font-bold">
            {selectedChannel} - Videos
          </h1>
        </div>

        {loading ? (
          <p className="text-center py-8">Loading...</p>
        ) : channelVideos.length === 0 ? (
          <p className="text-sm sm:text-base text-gray-500 text-center py-8">
            No videos found for this channel.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {channelVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="p-2 sm:p-3 md:p-4">
                  <h2 className="text-sm sm:text-base md:text-lg font-semibold line-clamp-2 mb-1">
                    {video.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    {video.channelTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {video.views} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
        Your Subscriptions
      </h1>

      {subs.length === 0 ? (
        <p className="text-sm sm:text-base text-gray-500 text-center py-8">
          You haven't subscribed to any channel yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {subs.map((channel, index) => (
            <div
              key={index}
              onClick={() => handleChannelClick(channel)}
              className="bg-white p-3 sm:p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
            >
              <p className="text-sm sm:text-base font-medium">{channel}</p>
              <p className="text-xs text-gray-500 mt-1">
                Click to view videos
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
