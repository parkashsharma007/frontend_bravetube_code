import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleViewMode } from "./reduxtool/viewModeSlice";

const Header = ({ setSearch, setSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem("profile")) || {};
  const viewMode = useSelector((state) => state.viewMode.mode);

  return (
    <header className="flex items-center justify-between px-2 sm:px-4 py-2 bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setSidebarOpen && setSidebarOpen(prev => !prev)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-full"
        >
          ☰
        </button>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-red-600 rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 sm:w-3 sm:h-3 border-l-4 sm:border-l-8 border-l-white border-y-4 sm:border-y-8 border-y-transparent"></div>
          </div>
          <span className="text-base sm:text-xl font-semibold tracking-tight">BraveTube</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-2 sm:px-4 max-w-xs sm:max-w-xl mx-auto">
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-l-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
          />
          <button className="px-3 sm:px-5 border border-gray-300 border-l-0 rounded-r-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm sm:text-base">
            🔍
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={() => dispatch(toggleViewMode())}
          className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition-all duration-300 text-xs sm:text-sm"
          title={viewMode === "card" ? "Switch to Table View" : "Switch to Card View"}
        >
          {viewMode === "card" ? (
            <>
              <span>📋</span>
              <span className="hidden sm:inline">Table</span>
            </>
          ) : (
            <>
              <span>🃏</span>
              <span className="hidden sm:inline">Card</span>
            </>
          )}
        </button>
        <div
          onClick={() => navigate("/profile")}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs sm:text-sm font-semibold cursor-pointer hover:scale-105 transition"
        >
          {profile.photo ? (
            <img src={profile.photo} className="w-7 h-7 sm:w-8 sm:h-8 object-cover rounded-full" alt="Profile" />
          ) : (
            <span>P</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
