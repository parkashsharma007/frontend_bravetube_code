import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const menu = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Shorts", path: "/shorts", icon: "🎬" },
    { name: "Subscriptions", path: "/subscriptions", icon: "📺" },
    { name: "History", path: "/history", icon: "⏱️" },
    { name: "Watch Later", path: "/watch", icon: "⏳" },
    { name: "Liked Videos", path: "/liked", icon: "❤️" },
    { name: "Disliked Videos", path: "/disliked", icon: "👎" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={`fixed top-[56px] sm:top-[60px] md:top-14 left-0 h-[calc(100vh-56px)] sm:h-[calc(100vh-60px)] md:h-[calc(100vh-3.5rem)] bg-white border-r overflow-y-auto z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-56`}
      >
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setIsOpen && setIsOpen(false)}
            className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors ${
              location.pathname === item.path ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            <span className="text-lg sm:text-xl">{item.icon}</span>
            <span className="text-sm sm:text-base">{item.name}</span>
          </Link>
        ))}
      </aside>
    </>
  );
};

export default Sidebar;
