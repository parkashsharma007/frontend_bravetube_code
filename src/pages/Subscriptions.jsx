import React, { useEffect, useState } from "react";

const Subscriptions = () => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("subscriptions")) || [];
    setSubs(saved);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Subscriptions</h1>

      {subs.length === 0 ? (
        <p className="text-gray-500">You haven't subscribed to any channel yet.</p>
      ) : (
        <ul className="list-disc pl-6">
          {subs.map((channel, index) => (
            <li key={index} className="text-lg font-medium mb-2">
              {channel}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Subscriptions;
