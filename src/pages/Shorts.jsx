import React, { useState } from "react";
import { reelsData } from "../reelsData";

const Shorts = () => {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < reelsData.length - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-10rem)] py-4 sm:py-8 text-white relative overflow-hidden">
      <div className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-xl relative">
        <iframe
          key={reelsData[index].id}
          src={`https://www.youtube.com/embed/${reelsData[index].videoId}?autoplay=1&mute=0&controls=0&modestbranding=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full object-cover"
          title={reelsData[index].title}
        ></iframe>

        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
          <h2 className="text-sm sm:text-base md:text-lg font-bold line-clamp-2">{reelsData[index].title}</h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">{reelsData[index].channelTitle}</p>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl md:text-4xl opacity-70 hover:opacity-100 bg-black bg-opacity-30 rounded-full p-2"
        disabled={index === 0}
      >
        ⬆️
      </button>

      <button
        onClick={next}
        className="absolute left-2 sm:left-4 md:left-6 bottom-20 sm:bottom-24 md:bottom-40 text-2xl sm:text-3xl md:text-4xl opacity-70 hover:opacity-100 bg-black bg-opacity-30 rounded-full p-2"
        disabled={index === reelsData.length - 1}
      >
        ⬇️
      </button>
    </div>
  );
};

export default Shorts;
