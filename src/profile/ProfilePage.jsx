import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    photo: ""
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile")) || {};
    setProfile(saved);
  }, []);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, photo: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile Updated!");
  };

  const logout = () => {
    localStorage.removeItem("profile");
    alert("Logged out successfully!");
    navigate("/"); 
  };

  return (
    <div className="p-6 max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

      
      <div className="flex justify-center mb-4">
        <label>
          <img
            src={profile.photo || "https://via.placeholder.com"}
            className="w-28 h-28 rounded-full object-cover border cursor-pointer"
          />
          <input type="file" className="hidden" onChange={handleImage} />
        </label>
      </div>

      
      <input
        className="w-full p-3 border rounded mb-4"
        placeholder="Your Name"
        value={profile.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <input
        className="w-full p-3 border rounded mb-4"
        placeholder="Email"
        value={profile.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <input
        className="w-full p-3 border rounded mb-4"
        placeholder="Phone Number"
        value={profile.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />

      <input
        className="w-full p-3 border rounded mb-4"
        placeholder="city Name"
        value={profile.location}
        onChange={(e) => handleChange("location", e.target.value)}
      />

      <input
  type="password"
  className="w-full p-3 border rounded mb-4"
  placeholder="Password"
  value={profile.password || ""} 
  onChange={(e) => handleChange("password", e.target.value)}
/>


      
      <button
        className="w-full bg-blue-600 text-white py-2 rounded mb-3"
        onClick={saveProfile}
      >
        Save Profile
      </button>

      <button
        className="w-full bg-red-600 text-white py-2 rounded"
        onClick={logout}
      >
        Logout
      </button>

    </div>
  );
};

export default ProfilePage;
