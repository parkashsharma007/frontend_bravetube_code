// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addChat } from "../reduxtool/chatSlice";

// const ChatBotLogic = () => {
//   const dispatch = useDispatch();
//   const [input, setInput] = useState("");

//   const handleAsk = () => {
//     const question = input.toLowerCase();
//     let answer = "";

//     // ⭐ MIXES
//     if (question.includes("mixes")) {
//       answer = "Mixes ka data 'type === mixes' filter se aata hai.";
//     }
//     // ⭐ VIDEO PLAY
//     else if (question.includes("video") && question.includes("play")) {
//       answer = "Video click par activeVideo state set hoti hai.";
//     }
//     // ⭐ REDUX FETCH
//     else if (question.includes("redux") || question.includes("fetch")) {
//       answer = "Redux me createAsyncThunk + axios se fetch hota hai.";
//     }
//     // ⭐ HISTORY
//     else if (question.includes("history")) {
//       answer = "dispatch(addToHistory(video)) se history add hoti hai.";
//     }
//     // ⭐ SUBSCRIBE
//     else if (question.includes("subscribe")) {
//       answer = "Subscribe LocalStorage me store hota hai.";
//     }
//     // ⭐ WATCH LATER
//     else if (question.includes("watch later")) {
//       answer = "Watch Later LocalStorage me save hota hai.";
//     }
//     // ⭐ CARD VIEW
//     else if (question.includes("card view")) {
//       answer = "viewMode === 'card' hone par card view dikhta hai.";
//     }
//     // ⭐ TABLE VIEW
//     else if (question.includes("table view")) {
//       answer = "viewMode === 'table' hone par table view dikhta hai.";
//     }
//     // ⭐ SEARCH
//     else if (question.includes("search")) {
//       answer = "Search title.toLowerCase().includes(searchText) se hota hai.";
//     }
//     // ⭐ ALL DATA
//     else if (question.includes("all data")) {
//       answer = "AllDataSlice sab category ka data laata hai.";
//     }
//     // ⭐ NAME
//     else if (question.includes("name") || question.includes("mera naam")) {
//       answer = "Your name is **Parkash Sharma** 😎🔥";
//     }
//     // ⭐ AI
//     else if (question.includes("ai")) {
//       answer = "AI Assistant tumhare YouTube project ke hisab se answers deta hai.";
//     }
//     // ⭐ DEFAULT
//     else {
//       answer = "Sorry, is question ka answer database me nahi mila 😅.";
//     }

//     // Redux me store karna
//     dispatch(
//       addChat({
//         q: input,
//         a: answer,
//       })
//     );

//     setInput(""); // clear input
//   };

//   return (
//     <div className="p-4">
//       <input
//         className="border p-2 w-full"
//         placeholder="Ask something…"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />

//       <button
//         className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={handleAsk}
//       >
//         Ask
//       </button>
//     </div>
//   );
// };

// export default ChatBotLogic;
// // 