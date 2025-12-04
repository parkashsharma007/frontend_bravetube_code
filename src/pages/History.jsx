import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearHistory } from "../reduxtool/historySlice";

const History = () => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history.items);

  return (
    <div className="p-4 ml-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Watch History</h2>

        {history.length > 0 && (
          <button
            onClick={() => dispatch(clearHistory())}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-gray-500 text-lg">No history found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {history.map((item) => (
            <div
              key={item.historyId}   
              className="bg-white p-2 rounded-lg shadow hover:shadow-lg transition-all"
            >
              <img
                src={item.thumbnail}
                className="rounded-lg w-full h-40 object-cover"
              />
              <h3 className="font-semibold mt-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.channelTitle}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
