import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
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
    <aside className="hidden md:block w-56 bg-white border-r h-screen fixed top-14 left-0 overflow-y-auto">
      {menu.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          <span className="text-xl">{item.icon}</span>
          <span>{item.name}</span>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
