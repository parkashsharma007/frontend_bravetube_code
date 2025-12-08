import { createSlice } from "@reduxjs/toolkit";

const viewModeSlice = createSlice({
  name: "viewMode",
  initialState: { mode: "card" },
  reducers: {
    toggleViewMode: (state) => {
      state.mode = state.mode === "card" ? "table" : "card";
    },
    setViewMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleViewMode, setViewMode } = viewModeSlice.actions;
export default viewModeSlice.reducer;

