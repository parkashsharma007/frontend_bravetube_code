import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Center from "./Center";
import History from "./pages/History";
import Shorts from "./pages/Shorts";
import Subscriptions from "./pages/Subscriptions";
import CategoryBar from './components/CategoryBar';
import Login from "./pagess/Login";
import Signup from "./pagess/Signup";
import MixesPage from "./mixesdata/MixesPage";
import GamingPage from "./mixesdata/GamingPage";
import VillagePage from "./mixesdata/VillagePage";
import SnowPage from "./mixesdata/SnowPage";
import VacationsPage from "./mixesdata/VacationsPage";
import IndianPopPage from "./mixesdata/IndianPopPage";
import ActionThrillersPage from "./mixesdata/ActionThrillersPage";
import ClimbingPage from "./mixesdata/ClimbingPage";
import OffroadPage from "./mixesdata/OffroadPage";
import AllPage from "./mixesdata/AllPage";
import WatchLater from "./pages/WatchLater";
import ProfilePage from "./profile/ProfilePage";
import LikedVideos from "./mixesdata/LikedVideos";

import AllDataPage from "./AllDataPage";
import ChatData from "./components/ChatData";
import DislikedVideos from "./components/DislikedVideos";

const App = () => {
  const [search, setSearch] = useState("");
  const [chatOpen, setChatOpen] = useState(false); 

  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen">

        <Header setSearch={setSearch} />

        <CategoryBar />

        <Sidebar />

        
        <ChatData chatOpen={chatOpen} setChatOpen={setChatOpen} />

       
        <div
          className={`
            mt-3 p-6 ml-60 transition-all duration-300
            ${chatOpen ? "mr-80" : "mr-0"}    // PAGE PUSH FIX
          `}
        >
          <Routes>
            <Route path="/disliked" element={<DislikedVideos/>}/>
            <Route path="/alldatafetch" element={<AllDataPage/>}/>
            <Route path="/liked" element={<LikedVideos/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/vacations" element={<VacationsPage />} />
            <Route path="/mixes" element={<MixesPage/>} />
            <Route path="/snow" element={<SnowPage />} /> 
            <Route path="/gaming" element={<GamingPage/>} /> 
            <Route path="/" element={<Center search={search} />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/villages" element={<VillagePage/>} />
            <Route path="/indian-pop-music" element={<IndianPopPage/>}/>
            <Route path="/action-thrillers" element={<ActionThrillersPage/>} />
            <Route path="/climbing" element={<ClimbingPage />} />
            <Route path="/offroad" element={<OffroadPage />} />
            <Route path="/all" element={<AllPage />} />
            <Route path="/watch" element={<WatchLater/>}/>
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
};

export default App;
