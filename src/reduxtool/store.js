import { configureStore } from "@reduxjs/toolkit";

import historyReducer from "./historySlice";
import likedReducer from "./likedSlice";
import allDataReducer from "./allDataSlice";
import chatReducer from "./chatSlice";
import viewModeReducer from "./viewModeSlice";

export const store = configureStore({
  reducer: {
    allData: allDataReducer,
    history: historyReducer,
    liked: likedReducer,
    chat: chatReducer,
    viewMode: viewModeReducer,
  },
});
