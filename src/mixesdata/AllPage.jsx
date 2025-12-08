import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "../reduxtool/allDataSlice";
import { addToHistory } from "../reduxtool/historySlice";

const AllPage = () => {
  const dispatch = useDispatch();
  const [activeVideo, setActiveVideo] = useState(null);

  const { data: AllData, loading, error } = useSelector(
    (state) => state.allData
  );

  useEffect(() => {
    dispatch(fetchAllData());
  }, []);

  
  const handlePlay = (video) => {
    setActiveVideo(video);
    dispatch(addToHistory(video)); // <-- Redux me push hoga
  };

  if (loading) return <p className="p-4 sm:p-6 text-sm sm:text-base md:text-lg text-center">Loading...</p>;
  if (error) return <p className="p-4 sm:p-6 text-sm sm:text-base text-red-500 text-center">{error}</p>;
  if (!AllData || AllData.length === 0)
    return <p className="p-4 sm:p-6 text-sm sm:text-base md:text-lg text-center">No videos found</p>;

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">All Videos (Table View)</h1>

      <div className="overflow-x-auto shadow-xl rounded-xl">
        <table className="min-w-full bg-white text-xs sm:text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2 sm:p-3">Thumbnail</th>
              <th className="p-2 sm:p-3">Title</th>
              <th className="p-2 sm:p-3 hidden sm:table-cell">Channel</th>
              <th className="p-2 sm:p-3 hidden md:table-cell">Views</th>
              <th className="p-2 sm:p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {AllData.map((v) => (
              <tr key={v.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-2 sm:p-3">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-20 sm:w-28 md:w-32 h-auto object-cover rounded-md shadow-md cursor-pointer"
                    onClick={() => handlePlay(v)}
                  />
                </td>

                <td className="p-2 sm:p-3 font-medium max-w-xs truncate">{v.title}</td>
                <td className="p-2 sm:p-3 text-gray-600 hidden sm:table-cell max-w-xs truncate">{v.channelTitle}</td>
                <td className="p-2 sm:p-3 text-gray-700 hidden md:table-cell">{v.views}</td>

                <td className="p-2 sm:p-3">
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                    <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-red-600 text-white rounded-md hover:bg-red-700">
                      Subscribe
                    </button>
                    <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-300 text-black rounded-md hover:bg-gray-400">
                      Watch Later
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-black w-full max-w-4xl aspect-video rounded-xl relative">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
              allow="autoplay"
              title={activeVideo.title}
            ></iframe>
            <button
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white text-2xl sm:text-3xl bg-black bg-opacity-50 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-opacity-70"
              onClick={() => setActiveVideo(null)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPage;
