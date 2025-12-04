import React from "react";
import { Link, useLocation } from "react-router-dom";

const categories = [
  { name: "All", path: "/" },
  { name: "Mixes", path: "/mixes" },
  { name: "Gaming", path: "/gaming" },
  { name: "Villages", path: "/villages" },
  { name: "Snow", path: "/snow" },
  { name: "Vacations", path: "/vacations" },
  { name: "Indian pop music", path: "/indian-pop-music" },
  { name: "Action Thrillers", path: "/action-thrillers" },
  { name: "Climbing", path: "/climbing" },
  { name: "Off-road vehicles", path: "/offroad" },
];

const CategoryBar = () => {
  const location = useLocation();

  return (
    <div
      className="
        w-[100] overflow-x-auto ml-56  flex gap-4 px-4 py-4 bg-white sticky top-12 z-20 scrollbar-hide" >
      {categories.map((cat) => {
        const isActive =
          location.pathname === cat.path ||
          location.pathname.startsWith(cat.path + "/");

        return (
          <Link
            key={cat.name}
            to={cat.path}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
              transition
              ${
                isActive
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }
            `}
          >
            {cat.name}
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryBar;
