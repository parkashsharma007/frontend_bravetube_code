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
  const viewMode = useSelector((state) => state.viewMode.mode);

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
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-gray-300 border-t-red-600 mb-4"></div>
        <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700">Loading videos...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="text-red-500 text-5xl sm:text-6xl mb-4">⚠️</div>
        <p className="text-base sm:text-lg md:text-xl font-semibold text-red-600 mb-2">Error loading data</p>
        <p className="text-sm sm:text-base text-gray-500">Please try again later</p>
      </div>
    );

  if (finalData.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="text-gray-400 text-5xl sm:text-6xl mb-4">📹</div>
        <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-2">No videos found</p>
        <p className="text-sm sm:text-base text-gray-500">Try adjusting your search</p>
      </div>
    );

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 p-2 sm:p-4">
      {filteredData.map((video) => {
        const subscribed = subs.includes(video.channelTitle);
        const addedLater = watchLater.some((v) => v.id === video.id);

        return (
          <div
            key={video.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <div onClick={() => handlePlay(video)} className="relative">
              {activeVideo === video.id ? (
                <iframe
                  className="w-full h-40 sm:h-48 aspect-video"
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                  allow="autoplay"
                  title={video.title}
                ></iframe>
              ) : (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 sm:h-48 object-cover cursor-pointer"
                />
              )}
            </div>

            <div className="p-2 sm:p-3 md:p-4">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold line-clamp-2 mb-1">{video.title}</h2>
              <p className="text-xs sm:text-sm text-gray-600 truncate">{video.channelTitle}</p>
              <p className="text-xs sm:text-sm text-gray-500 mb-2">{video.views} views</p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <button
                  onClick={() => handleSubscribe(video.channelTitle)}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded ${
                    subscribed ? "bg-gray-300" : "bg-red-600 text-white"
                  }`}
                >
                  {subscribed ? "Subscribed" : "Subscribe"}
                </button>

                <button
                  onClick={() => handleWatchLater(video)}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded bg-gray-200"
                >
                  {addedLater ? "Added" : "Watch Later"}
                </button>

                <button
                  onClick={() => dispatch(likeVideo(video))}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-500 text-white rounded"
                >
                  👍 Like
                </button>

                <button
                  onClick={() => dispatch(dislikeVideo(video))}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-500 text-white rounded"
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
    <div className="p-2 sm:p-4 overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
        <table className="w-full border text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-1 sm:p-2">Thumbnail</th>
              <th className="p-1 sm:p-2">Title</th>
              <th className="p-1 sm:p-2 hidden sm:table-cell">Channel</th>
              <th className="p-1 sm:p-2 hidden md:table-cell">Views</th>
              <th className="p-1 sm:p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((video) => {
              const subscribed = subs.includes(video.channelTitle);
              const addedLater = watchLater.some((v) => v.id === video.id);

              return (
                <tr key={video.id} className="border-b hover:bg-gray-50">
                  <td className="p-1 sm:p-2">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-20 sm:w-32 md:w-40 h-auto rounded cursor-pointer"
                      onClick={() => handlePlay(video)}
                    />
                  </td>

                  <td className="p-1 sm:p-2 max-w-xs truncate">{video.title}</td>
                  <td className="p-1 sm:p-2 hidden sm:table-cell max-w-xs truncate">{video.channelTitle}</td>
                  <td className="p-1 sm:p-2 hidden md:table-cell">{video.views}</td>

                  <td className="p-1 sm:p-2">
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <div className="flex gap-1 sm:gap-2">
                        <button
                          onClick={() => handleSubscribe(video.channelTitle)}
                          className={`px-2 sm:px-3 py-1 text-xs rounded ${
                            subscribed ? "bg-gray-300" : "bg-blue-600 text-white"
                          }`}
                        >
                          {subscribed ? "Sub" : "Sub"}
                        </button>

                        <button
                          onClick={() => handleWatchLater(video)}
                          className="px-2 sm:px-3 py-1 text-xs rounded bg-green-500 text-white"
                        >
                          {addedLater ? "Added" : "Later"}
                        </button>
                      </div>
                      <div className="flex gap-1 sm:gap-2">
                        <button
                          onClick={() => dispatch(likeVideo(video))}
                          className="px-2 sm:px-3 py-1 text-xs rounded bg-blue-500 text-white"
                        >
                          👍 Like
                        </button>
                        <button
                          onClick={() => dispatch(dislikeVideo(video))}
                          className="px-2 sm:px-3 py-1 text-xs rounded bg-gray-500 text-white"
                        >
                          👎 Dislike
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return viewMode === "card" ? cardView : tableView;
};

export default Center;
