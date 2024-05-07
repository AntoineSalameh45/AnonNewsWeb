import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iNewsItem } from "./types";
import { newsApi } from "./newsApi";

export const getNewsByPage = createAsyncThunk<
  { results: iNewsItem[]; pagination: any },
  {
    page: number;
    pageSize: number;
  },
  { rejectValue: string }
>('news/getNewsByPage', async (params, thunkAPI) => {
  const { page, pageSize } = params;

  try {
    const data = await newsApi(page, pageSize);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

interface ArticleState {
  loading: boolean;
  error: string | null;
  selectedNewsItem: iNewsItem | null;
}

const initialState: ArticleState = {
  loading: false,
  error: null,
  selectedNewsItem: null,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add your extra reducers here
  },
});

export default articleSlice.reducer;
