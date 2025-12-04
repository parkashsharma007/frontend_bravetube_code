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

  if (loading) return <p className="p-6 text-lg">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!AllData || AllData.length === 0)
    return <p className="p-6 text-lg">No videos found</p>;

  return (
    <div className="p-6 ml-56">
      <h1 className="text-xl font-bold mb-4">All Videos (Table View)</h1>

      <div className="overflow-x-auto shadow-xl rounded-xl">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">Thumbnail</th>
              <th className="p-3">Title</th>
              <th className="p-3">Channel</th>
              <th className="p-3">Views</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {AllData.map((v) => (
              <tr key={v.id} className="border-b hover:bg-gray-100 transition">

                <td className="p-3">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-32 h-20 object-cover rounded-md shadow-md cursor-pointer"
                    onClick={() => handlePlay(v)}
                  />
                </td>

                <td className="p-3 font-medium">{v.title}</td>
                <td className="p-3 text-gray-600">{v.channelTitle}</td>
                <td className="p-3 text-gray-700">{v.views}</td>

                <td className="p-3 flex gap-2">
                  <button className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">
                    Subscribe
                  </button>
                  <button className="px-3 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400">
                    Watch Later
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-black w-[90%] md:w-[60%] h-[60%] rounded-xl relative">

            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
              allow="autoplay"
            ></iframe>

            <button
              className="absolute top-3 right-3 text-white text-3xl"
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
