import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  trending: [],
  loading: false,
  subscribedCategories: ["Tech"],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.items = action.payload;
    },
    addNews: (state, action) => {
      state.items.unshift(action.payload);
    },
    setTrending: (state, action) => {
      state.trending = action.payload;
    },
    toggleCategory: (state, action) => {
      const category = action.payload;
      const index = state.subscribedCategories.indexOf(category);
      if (index === -1) {
        state.subscribedCategories.push(category);
      } else {
        state.subscribedCategories.splice(index, 1);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setNews, addNews, setTrending, toggleCategory, setLoading } =
  newsSlice.actions;
export default newsSlice.reducer;
