import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { newsApi } from "./newsApi";
import { iNewsItem, iNewsState } from "./types";

export interface iPagination {
  totalResults: number;
  totalPages: number;
  currentPage: number;
}

export const getNews = createAsyncThunk<
  { results: iNewsItem[]; pagination: iPagination },
  {
    page: number;
    pageSize: number;
  },
  { rejectValue: string }
>('news/getNews', async (params, thunkAPI) => {
  const { page, pageSize } = params;

  try {
    const data = await newsApi(
      page,
      pageSize
    );
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState: iNewsState = {
  news: [],
  loading: false,
  error: null,
  pagination: {
    totalResults: 0,
    totalPages: 0,
    currentPage: 0,
  },
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getNews.fulfilled, (state, action: PayloadAction<{ results: iNewsItem[]; pagination: iPagination }>) => {
      state.loading = false;
      state.pagination = action.payload.pagination;
      state.news = action.payload.results;
    });
    builder.addCase(getNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : "Connection Error";
    });
  },
});

export default newsSlice.reducer;
