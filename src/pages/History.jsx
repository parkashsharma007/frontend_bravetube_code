import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearHistory } from "../reduxtool/historySlice";

const History = () => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history.items);

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-5">
        <h2 className="text-xl sm:text-2xl font-bold">Watch History</h2>

        {history.length > 0 && (
          <button
            onClick={() => dispatch(clearHistory())}
            className="bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-sm sm:text-base"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-gray-500 text-base sm:text-lg text-center py-8">No history found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {history.map((item) => (
            <div
              key={item.historyId}   
              className="bg-white p-2 sm:p-3 rounded-lg shadow hover:shadow-lg transition-all"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="rounded-lg w-full h-32 sm:h-40 object-cover"
              />
              <h3 className="font-semibold mt-2 text-sm sm:text-base line-clamp-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 truncate">{item.channelTitle}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
