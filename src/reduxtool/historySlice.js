import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",

  initialState: {
    items: [], 
  },

  reducers: {
    addToHistory: (state, action) => {
      const video = action.payload;

      const uniqueEntry = {
        ...video,
        historyId: Date.now() + Math.random(), 
      };

    
      const exists = state.items.some((v) => v.id === video.id);
      if (!exists) {
        state.items.push(uniqueEntry);
      }
    },

    
    clearHistory: (state) => {
      state.items = [];
    },
  },
});

export const { addToHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
