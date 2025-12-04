import { createSlice } from "@reduxjs/toolkit";

const likedSlice = createSlice({
  name: "liked",

  initialState: {
    liked: [],     // ✔ missing field added
    disliked: [], 
  },

  reducers: {
    likeVideo: (state, action) => {
      const video = action.payload;

      // Remove from disliked
      state.disliked = state.disliked.filter(v => v.id !== video.id);

      // Toggle Like
      const exists = state.liked.some(v => v.id === video.id);

      if (exists) {
        state.liked = state.liked.filter(v => v.id !== video.id);
      } else {
        state.liked.push(video);
      }
    },

    dislikeVideo: (state, action) => {
      const video = action.payload;

      // Remove from liked
      state.liked = state.liked.filter(v => v.id !== video.id);

      // Toggle dislike
      const exists = state.disliked.some(v => v.id === video.id);

      if (exists) {
        state.disliked = state.disliked.filter(v => v.id !== video.id);
      } else {
        state.disliked.push(video);
      }
    },
  },
});

export const { likeVideo, dislikeVideo } = likedSlice.actions;
export default likedSlice.reducer;
