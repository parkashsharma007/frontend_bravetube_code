import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  qa: [], // ⭐ DEFAULT EMPTY
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    askQuestion: (state, action) => {
      const question = action.payload.toLowerCase();

      let answer = "";

      // ⭐ MIXES FILTER
      if (question.includes("mixes")) {
        answer = "Mixes ka data 'type === mixes' filter se aata hai.";
      }

      // ⭐ VIDEO PLAY
      else if (question.includes("video") && question.includes("play")) {
        answer = "Video click par activeVideo state set hoti hai.";
      }

      // ⭐ REDUX FETCH
      else if (question.includes("redux") || question.includes("fetch")) {
        answer = "Redux me createAsyncThunk + axios se fetch hota hai.";
      }

      // ⭐ HISTORY
      else if (question.includes("history")) {
        answer = "dispatch(addToHistory(video)) se history add hoti hai.";
      }

      // ⭐ SUBSCRIBE
      else if (question.includes("subscribe")) {
        answer = "Subscribe LocalStorage me store hota hai.";
      }

      // ⭐ WATCH LATER
      else if (question.includes("watch later")) {
        answer = "Watch Later LocalStorage me save hota hai.";
      }

      // ⭐ CARD VIEW
      else if (question.includes("card view")) {
        answer = "viewMode === 'card' hone par card view dikhta hai.";
      }

      // ⭐ TABLE VIEW
      else if (question.includes("table view")) {
        answer = "viewMode === 'table' hone par table view dikhta hai.";
      }

      // ⭐ SEARCH
      else if (question.includes("search")) {
        answer = "Search title.toLowerCase().includes(searchText) se hota hai.";
      }

      // ⭐ ALL DATA SLICE
      else if (question.includes("alldata") || question.includes("all data")) {
        answer = "AllDataSlice sab category ka data laata hai.";
      }

      // ⭐ SPECIAL (Your Name)
      else if (
        question.includes("my name") ||
        question.includes("mera naam") ||
        question.includes("name")
      ) {
        answer = "Your name is **Parkash Sharma** 😎🔥";
      }

      // ⭐ EXTRA CUSTOM
      else if (question.includes("hello")) {
        answer = "Hello! Kaise ho Parkash ji? 😄";
      }

      else if (question.includes("help")) {
        answer = "Main aapki YouTube clone me help karne ke liye ready hun!";
      }

      else if (question.includes("project")) {
        answer = "Ye project React + Redux + Tailwind + YouTube UI clone par based hai.";
      }

      else if (question.includes("ai")) {
        answer = "AI Assistant yaha tumhare project ke hisab se answers deta hai.";
      }

      // ⭐ DEFAULT
      else {
        answer = "Sorry, is question ka answer database me nahi mila 😅.";
      }

      state.qa.push({
        q: action.payload,
        a: answer,
      });
    },
  },
});

export const { askQuestion } = chatSlice.actions;
export default chatSlice.reducer;
