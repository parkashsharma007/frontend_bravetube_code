// import React, { useState } from "react";
// import { Mixes } from "./MixesData";

// const MixesPage = () => {
//   const [activeVideo, setActiveVideo] = useState(null);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
//       {Mixes.map((video, index) => (
//         <div
//           key={index}
//           className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
//           onClick={() => setActiveVideo(video.id)}
//         >
//           {activeVideo === video.id ? (
//             <iframe
//               className="w-full h-48"
//               src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
//               title={video.title}
//               allow="autoplay"
//               allowFullScreen
//             ></iframe>
//           ) : (
//             <img
//               src={video.thumbnail}
//               alt={video.title}
//               className="w-full h-48 object-cover"
//             />
//           )}

//           <div className="p-4">
//             <h2 className="text-lg font-semibold hover:text-red-600">
//               {video.title}
//             </h2>

//             <p className="text-sm text-gray-600 mt-1">{video.channel}</p>

//             <p className="text-sm text-gray-500 mt-1">
//               {video.views.toLocaleString()} views
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MixesPage;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "../reduxtool/allDataSlice";

const MixesPage = () => {
  const dispatch = useDispatch();

  const { data: allData, loading, error } = useSelector(
    (state) => state.allData
  );

  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  if (loading) return <p className="p-4 text-lg">Loading...</p>;

  if (error) return <p className="p-4 text-lg text-red-500">Error loading data</p>;

  // ⭐ FILTER DATA WHERE type = "mixes"
  const mixesData = allData?.filter((item) => item.type === "mixes") || [];

  if (mixesData.length === 0)
    return <p className="p-4 text-lg">No Mixes found</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {mixesData.map((video, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => setActiveVideo(video.id)}
        >
          {activeVideo === video.id ? (
            <iframe
              className="w-full h-48"
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
              title={video.title}
              allow="autoplay"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
          )}

          <div className="p-4">
            <h2 className="text-lg font-semibold hover:text-red-600">
              {video.title}
            </h2>

            <p className="text-sm text-gray-600 mt-1">{video.channelTitle}</p>

            <p className="text-sm text-gray-500 mt-1">
              {Number(video.views).toLocaleString()} views
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MixesPage;
