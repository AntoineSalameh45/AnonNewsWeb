import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { iLogin, iSignUp, iState } from "./types";
import { loginApi, refreshTokenApi, signupApi } from "./userApi";

export const signup = createAsyncThunk<
iSignUp,
  {
    email: string;
    password: string;
    token_expires_in: string | undefined;
  },
  {rejectValue: string}
>('user/signup', async (params, thunkAPI) => {
  const {email, password, token_expires_in} = params;

  try {
    const data = await signupApi(
      email,
      password,
      token_expires_in ?? '',
    );
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk<
iLogin,
  {
    email: string;
    password: string;
    token_expires_in: string | undefined;
  },
  {rejectValue: string}
>('user/login', async (params, thunkAPI) => {
  const {email, password, token_expires_in} = params;

  try {
    const data = await loginApi(
      email,
      password,
      token_expires_in ?? '',
    );
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshToken = createAsyncThunk<
iLogin,
  {
    token: string;
    token_expires_in: string | undefined;
  },
  {rejectValue: string}
>('user/refreshToken', async (params, thunkAPI) => {
  const {token, token_expires_in} = params;

  try {
    const data = await refreshTokenApi(
       token,
      token_expires_in ?? '',
    );
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
}
);
export const logout = createAsyncThunk<void, void>(
  'user/logout',
  async (_, ) => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
);

const initialState: iState = {
    message: "",
    accessToken: "",
    refreshToken: "",
    loading: false,
    error: null,
}

const userAuthSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
      setAccessToken: (state, action) => {
        state.accessToken = action.payload;
      }
    },
    extraReducers: builder => {

        builder
          .addCase(signup.pending, state => {
            state.loading = true;
            state.error = false;
          })
          .addCase(signup.fulfilled, (state, action: any) => {
            const date = new Date();
            date.setTime(date.getTime() + 30 * 60 * 1000);
            document.cookie = `accessToken=${action.payload.accessToken};expires=${date.toUTCString()};path=/`;
            
            const date2 = new Date();
            date2.setTime(date2.getTime() + 30 * 24 * 60 * 60 * 1000);
            document.cookie = `refreshToken=${action.payload.refreshToken};expires=${date2.toUTCString()};path=/`;

            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.message = action.payload.message
            state.loading = false
            state.error = false;
          })
          .addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || true;
          })
          .addCase(login.pending, state => {
            state.loading = true;
            state.error = false;
          })
          .addCase(login.fulfilled, (state, action: any) => {
            const date = new Date();
            date.setTime(date.getTime() + 30 * 60 * 1000);
            document.cookie = `accessToken=${action.payload.accessToken};expires=${date.toUTCString()};path=/`;

            const date2 = new Date();
            date2.setTime(date2.getTime() + 30 * 24 * 60 * 60 * 1000);
            document.cookie = `refreshToken=${action.payload.refreshToken};expires=${date2.toUTCString()};path=/`;

            state.accessToken = action.payload.accessToken;
            state.loading = false
            state.error = false;
          })
          .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || true;
          })
          .addCase(refreshToken.pending, state => {
            state.loading = true;
            state.error = false;
          })
          .addCase(refreshToken.fulfilled, (state, action: any) => {
            const date = new Date();
            date.setTime(date.getTime() + 5 * 60 * 1000);
            document.cookie = `accessToken=${action.payload.accessToken};expires=${date.toUTCString()};path=/`;

            const date2 = new Date();
            date2.setTime(date2.getTime() + 30 * 24 * 60 * 60 * 1000);
            document.cookie = `refreshToken=${action.payload.refreshToken};expires=${date2.toUTCString()};path=/`;

            state.accessToken = action.payload.accessToken;
            state.loading = false
            state.error = false;
          })
          .addCase(refreshToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || true;
          })
          .addCase(logout.pending, (state) => {
            state.loading = true;
            state.error = false;
          })
          .addCase(logout.fulfilled, (state) => {
            state.accessToken = '';
          })
          .addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || true;
          });
        }
    })

export default userAuthSlice.reducer;
export const { setAccessToken } = userAuthSlice.actions;