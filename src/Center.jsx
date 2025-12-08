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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

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
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 p-2 sm:p-3 md:p-4">
      {filteredData.map((video) => {
        const subscribed = subs.includes(video.channelTitle);
        const addedLater = watchLater.some((v) => v.id === video.id);

        return (
          <div
            key={video.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 w-full"
          >
            <div onClick={() => handlePlay(video)} className="relative w-full">
              {activeVideo === video.id ? (
                <iframe
                  className="w-full h-36 sm:h-44 md:h-48 lg:h-52 aspect-video"
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                  allow="autoplay"
                  title={video.title}
                ></iframe>
              ) : (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-36 sm:h-44 md:h-48 lg:h-52 object-cover cursor-pointer"
                  loading="lazy"
                />
              )}
            </div>

            <div className="p-2 sm:p-2.5 md:p-3 lg:p-4">
              <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold line-clamp-2 mb-1 leading-tight">{video.title}</h2>
              <p className="text-xs text-gray-600 truncate mb-0.5">{video.channelTitle}</p>
              <p className="text-xs text-gray-500 mb-2">{video.views} views</p>

              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubscribe(video.channelTitle);
                  }}
                  className={`px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 text-xs sm:text-xs md:text-sm rounded font-medium ${
                    subscribed ? "bg-gray-300 text-gray-700" : "bg-red-600 text-white"
                  }`}
                >
                  {subscribed ? "✓ Sub" : "Subscribe"}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWatchLater(video);
                  }}
                  className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 text-xs sm:text-xs md:text-sm rounded bg-gray-200 font-medium"
                >
                  {addedLater ? "✓ Added" : "Watch Later"}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(likeVideo(video));
                  }}
                  className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 text-xs sm:text-xs md:text-sm bg-blue-500 text-white rounded font-medium flex items-center justify-center gap-0.5 sm:gap-1"
                >
                  <span>👍</span>
                  <span>Like</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(dislikeVideo(video));
                  }}
                  className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 text-xs sm:text-xs md:text-sm bg-gray-500 text-white rounded font-medium flex items-center justify-center gap-0.5 sm:gap-1"
                >
                  <span>👎</span>
                  <span>Dislike</span>
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
    <div className="p-2 sm:p-4 overflow-x-auto w-full">
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
                      className="w-16 sm:w-24 md:w-32 lg:w-40 h-auto rounded cursor-pointer"
                      onClick={() => handlePlay(video)}
                    />
                  </td>

                  <td className="p-1 sm:p-2 max-w-[100px] sm:max-w-xs truncate text-xs">{video.title}</td>
                  <td className="p-1 sm:p-2 hidden sm:table-cell max-w-[80px] md:max-w-xs truncate text-xs">{video.channelTitle}</td>
                  <td className="p-1 sm:p-2 hidden md:table-cell text-xs">{video.views}</td>

                  <td className="p-1 sm:p-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubscribe(video.channelTitle);
                          }}
                          className={`px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-xs rounded ${
                            subscribed ? "bg-gray-300" : "bg-blue-600 text-white"
                          }`}
                        >
                          {subscribed ? "Sub" : "Sub"}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWatchLater(video);
                          }}
                          className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-xs rounded bg-green-500 text-white"
                        >
                          {addedLater ? "Added" : "Later"}
                        </button>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(likeVideo(video));
                          }}
                          className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-xs rounded bg-blue-500 text-white"
                        >
                          👍
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(dislikeVideo(video));
                          }}
                          className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-xs rounded bg-gray-500 text-white"
                        >
                          👎
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

  return (viewMode === "card" || isMobile) ? cardView : tableView;
};

export default Center;
