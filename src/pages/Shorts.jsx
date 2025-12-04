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
    <div className="flex justify-center  items-center h-[99vh] mt-2 text-white relative overflow-hidden">


     
      <div className="w-[350px] h-[620px] bg-black rounded-2xl overflow-hidden shadow-xl relative">

        
        <iframe
          key={reelsData[index].id}
          src={`https://www.youtube.com/embed/${reelsData[index].videoId}?autoplay=1&mute=0&controls=0&modestbranding=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full object-cover"
        ></iframe>

        
        <div className="absolute bottom-4 left-4">
          <h2 className="text-lg font-bold">{reelsData[index].title}</h2>
          <p className="text-sm text-gray-300">{reelsData[index].channelTitle}</p>
        </div>
      </div>

      
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 text-4xl opacity-70 hover:opacity-100"
      >
        ⬆️
      </button>

      <button
        onClick={next}
        className="absolute left-6 bottom-40 text-4xl opacity-70 hover:opacity-100"
      >
        ⬇️
      </button>
    </div>
  );
};

export default Shorts;
