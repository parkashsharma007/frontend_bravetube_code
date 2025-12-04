import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAllData } from "./reduxtool/allDataSlice";
import { addToHistory } from "./reduxtool/historySlice";
import { likeVideo, dislikeVideo } from "./reduxtool/likedSlice";

const Center = ({ search }) => {
  const dispatch = useDispatch();

  const { data: youtubeData, loading, error } = useSelector(
    (state) => state.allData
  );

  const [activeVideo, setActiveVideo] = useState(null);
  const [subs, setSubs] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setSubs(JSON.parse(localStorage.getItem("subscriptions")) || []);
    setWatchLater(JSON.parse(localStorage.getItem("watchLater")) || []);
  }, []);

  // ⭐ FILTER MULTIPLE TYPES
  const finalData =
    youtubeData?.filter(
      (v) =>
        v.type === "mixes" ||
        v.type === "climbing" ||
        v.type === "villages"
    ) || [];

  if (loading || initialLoading)
    return <p className="p-4 text-lg">Loading...</p>;

  if (error)
    return <p className="p-4 text-red-500">Error loading data</p>;

  if (finalData.length === 0)
    return <p className="p-4 text-lg">No videos found</p>;

  // 🔍 SEARCH
  const filteredData =
    search.trim() === ""
      ? finalData
      : finalData.filter((v) =>
          v.title.toLowerCase().includes(search.toLowerCase())
        );

  // SUBSCRIBE
  const handleSubscribe = (channel) => {
    let updated = [...subs];
    updated = updated.includes(channel)
      ? updated.filter((c) => c !== channel)
      : [...updated, channel];

    setSubs(updated);
    localStorage.setItem("subscriptions", JSON.stringify(updated));
  };

  // WATCH LATER
  const handleWatchLater = (video) => {
    let updated = [...watchLater];
    updated = updated.some((v) => v.id === video.id)
      ? updated.filter((v) => v.id !== video.id)
      : [...updated, video];

    setWatchLater(updated);
    localStorage.setItem("watchLater", JSON.stringify(updated));
  };

  // PLAY
  const handlePlay = (video) => {
    setActiveVideo(video.id);
    dispatch(addToHistory(video));
  };

  /* ========= CARD VIEW ========= */
  const cardView = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {filteredData.map((video) => {
        const subscribed = subs.includes(video.channelTitle);
        const addedLater = watchLater.some((v) => v.id === video.id);

        return (
          <div
            key={video.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <div onClick={() => handlePlay(video)}>
              {activeVideo === video.id ? (
                <iframe
                  className="w-full h-48"
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                  allow="autoplay"
                ></iframe>
              ) : (
                <img
                  src={video.thumbnail}
                  className="w-full h-48 object-cover cursor-pointer"
                />
              )}
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold">{video.title}</h2>
              <p className="text-sm text-gray-600">{video.channelTitle}</p>
              <p className="text-sm text-gray-500">{video.views} views</p>

              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => handleSubscribe(video.channelTitle)}
                  className={`px-3 py-1 rounded ${
                    subscribed ? "bg-gray-300" : "bg-red-600 text-white"
                  }`}
                >
                  {subscribed ? "Subscribed" : "Subscribe"}
                </button>

                <button
                  onClick={() => handleWatchLater(video)}
                  className="px-3 py-1 rounded bg-gray-200"
                >
                  {addedLater ? "Added" : "Watch Later"}
                </button>

                <button
                  onClick={() => dispatch(likeVideo(video))}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  👍 Like
                </button>

                <button
                  onClick={() => dispatch(dislikeVideo(video))}
                  className="px-3 py-1 bg-gray-500 text-white rounded"
                >
                  👎 Dislike
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  /* ========= TABLE VIEW ========= */
  const tableView = (
    <div className="p-4 overflow-x-auto">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Thumbnail</th>
            <th className="p-2">Title</th>
            <th className="p-2">Channel</th>
            <th className="p-2">Views</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((video) => {
            const subscribed = subs.includes(video.channelTitle);
            const addedLater = watchLater.some((v) => v.id === video.id);

            return (
              <tr key={video.id} className="border-b">
                <td className="p-2">
                  <img
                    src={video.thumbnail}
                    className="w-40 rounded cursor-pointer"
                    onClick={() => handlePlay(video)}
                  />
                </td>

                <td className="p-2">{video.title}</td>
                <td className="p-2">{video.channelTitle}</td>
                <td className="p-2">{video.views}</td>

                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleSubscribe(video.channelTitle)}
                    className={`px-3 py-1 rounded ${
                      subscribed ? "bg-gray-300" : "bg-blue-600 text-white"
                    }`}
                  >
                    {subscribed ? "Subscribed" : "Subscribe"}
                  </button>

                  <button
                    onClick={() => handleWatchLater(video)}
                    className="px-3 py-1 rounded bg-green-500 text-white"
                  >
                    {addedLater ? "Added" : "Watch Later"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // (Abhi viewMode comment tha)
  return cardView;
};

export default Center;
