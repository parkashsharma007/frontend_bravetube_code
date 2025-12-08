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
        w-full overflow-x-auto md:ml-56 flex gap-2 sm:gap-3 md:gap-4 px-2 sm:px-4 py-2 sm:py-3 md:py-4 bg-white sticky top-12 sm:top-14 z-20 scrollbar-hide"
    >
      {categories.map((cat) => {
        const isActive =
          location.pathname === cat.path ||
          location.pathname.startsWith(cat.path + "/");

        return (
          <Link
            key={cat.name}
            to={cat.path}
            className={`
              px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap
              transition
              ${
                isActive
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
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
