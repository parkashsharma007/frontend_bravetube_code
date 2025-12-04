import React from "react";
// import { setViewMode } from "./reduxtool/singerSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = ({ setSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { viewMode } = useSelector((s) => s.music);

  const profile = JSON.parse(localStorage.getItem("profile")) || {};

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="flex items-center gap-1">
        <div className="w-7 h-7 bg-red-600 rounded-sm flex items-center justify-center">
          <div className="w-3 h-3 border-l-8 border-l-white border-y-8 border-y-transparent"></div>
        </div>
        <span className="text-xl font-semibold tracking-tight">BraveTube</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="flex w-full max-w-xl">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
          <button className="px-5 border border-gray-300 border-l-0 rounded-r-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
            🔍
          </button>
        </div>

        <button
  onClick={() =>
    dispatch(setViewMode(viewMode === "card" ? "table" : "card"))
  }
  className="ml-3 px-4 py-2 flex items-center gap-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition-all duration-300"
>
  {/* {viewMode === "card" ? (
    <>
      <span className="material-icons"></span>
      <span>Table View</span>
    </>
  ) : (
    <>
      <span className="material-icons"></span>
      <span>Card View</span>
    </>
  )} */}
</button>

      </div>

      <div className="flex items-center gap-4">
        <div
          onClick={() => navigate("/profile")}
          className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:scale-105 transition"
        >
          {profile.photo ? (
            <img src={profile.photo} className="w-8 h-8 object-cover rounded-full" />
          ) : (
            <span>P</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
