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
    <header className="flex items-center justify-between px-2 sm:px-4 py-2 bg-white border-b border-gray-200 sticky top-0 z-20 w-full">
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <button
          onClick={() => setSidebarOpen && setSidebarOpen(prev => !prev)}
          className="md:hidden p-1.5 sm:p-2 hover:bg-gray-100 rounded-full text-lg"
        >
          ☰
        </button>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-red-600 rounded-sm flex items-center justify-center flex-shrink-0">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 border-l-2 sm:border-l-4 md:border-l-8 border-l-white border-y-2 sm:border-y-4 md:border-y-8 border-y-transparent"></div>
          </div>
          <span className="text-sm sm:text-base md:text-xl font-semibold tracking-tight whitespace-nowrap">BraveTube</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-1 sm:px-2 md:px-4 max-w-[120px] sm:max-w-xs md:max-w-xl mx-1 sm:mx-auto">
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-l-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
          />
          <button className="px-2 sm:px-3 md:px-5 border border-gray-300 border-l-0 rounded-r-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs sm:text-sm md:text-base">
            🔍
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
        <button
          onClick={() => dispatch(toggleViewMode())}
          className="hidden sm:flex px-1.5 sm:px-2 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 items-center gap-0.5 sm:gap-1 md:gap-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition-all duration-300 text-xs sm:text-xs md:text-sm"
          title={viewMode === "card" ? "Switch to Table View" : "Switch to Card View"}
        >
          {viewMode === "card" ? (
            <>
              <span className="text-xs sm:text-sm">📋</span>
              <span className="hidden md:inline">Table</span>
            </>
          ) : (
            <>
              <span className="text-xs sm:text-sm">🃏</span>
              <span className="hidden md:inline">Card</span>
            </>
          )}
        </button>
        <div
          onClick={() => navigate("/profile")}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs sm:text-xs md:text-sm font-semibold cursor-pointer hover:scale-105 transition flex-shrink-0"
        >
          {profile.photo ? (
            <img src={profile.photo} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-cover rounded-full" alt="Profile" />
          ) : (
            <span>P</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
