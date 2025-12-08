import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllData = createAsyncThunk("allData/fetch", async () => {
  const res = await axios.get("https://backend-232.onrender.com/api/all");
  console.log(res)
  return res.data
});

const allDataSlice = createSlice({
  name: "allData",
  initialState: { data: [], loading: false, error: null },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || [];
        state.data = Array.isArray(payload) 
          ? payload.map(item => item.data || item)
          : [];
      })
      .addCase(fetchAllData.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching All Data";
      });
  }
});

export default allDataSlice.reducer;
