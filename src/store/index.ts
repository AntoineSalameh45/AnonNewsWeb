import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import newsSlice from "./news/newsSlice";
import articleSlice from "./news/articleSlice";

export const store = configureStore({
    reducer: {
      user: userSlice,
      news: newsSlice,
      article: articleSlice,
    },
  });


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;