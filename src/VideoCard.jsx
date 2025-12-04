import React, { useState } from "react";

const VideoCard = ({ item }) => {
  const [play, setPlay] = useState(false);

  const handlePlay = () => {
    setPlay(true);

   
    let old = JSON.parse(localStorage.getItem("history")) || [];

    
    const entry = {
      id: item.id,
      videoId: item.videoId || item.id,   
      title: item.title,
      channelTitle: item.channelTitle,
      views: item.views,
      thumbnail: item.thumbnail.includes("http")
        ? item.thumbnail
        : `https://img.youtube.com/vi/${item.videoId || item.id}/hqdefault.jpg`,
    };

   
    old = old.filter((v) => v.id !== item.id);

    
    localStorage.setItem("history", JSON.stringify([entry, ...old]));
  };

  return (
    <>
      <div
        onClick={handlePlay}
        className="w-10 cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
      >
        <img
          src={
            item.thumbnail.includes("http")
              ? item.thumbnail
              : `https://img.youtube.com/vi/${item.videoId || item.id}/hqdefault.jpg`
          }
          className="rounded-lg"
        />
        <h3 className="font-semibold mt-2">{item.title}</h3>
        <p className="text-sm text-gray-500">{item.channelTitle}</p>
      </div>

      {play && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-[999]">
          <div className="w-[90%] md:w-[60%] lg:w-[50%] h-[60%] bg-black rounded-xl">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${item.videoId || item.id}?autoplay=1`}
              allow="autoplay"
              allowFullScreen
            ></iframe>
          </div>

          <button
            onClick={() => setPlay(false)}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            ✖
          </button>
        </div>
      )}
    </>
  );
};

export default VideoCard;
