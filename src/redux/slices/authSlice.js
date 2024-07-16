import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverApi } from "../../services/serverApi";
import { serverUrl } from "../../constants/constants";
import { toast } from "react-toastify";

export const authLoginApi = createAsyncThunk(
  "auth/authLoginApi",
  async (loginData) => {
    try {
      let res = await serverApi({
        httpMethod: "POST",
        url: `${serverUrl}/users/login`,
        reqBody: loginData,
        reqHeaders: {},
      });
      return { ...res, config: {}, headers: {}, request: {} };
    } catch (error) {
      return error;
    }
  }
);

const initialData = {
  data: {},
  loading: false,
  status: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialData,
  reducers: {
    logOutHandler: (state, action) => {
      state.data = {};
      localStorage.removeItem("userToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLoginApi.pending, (state, action) => {
        state.loading = true;
        toast.loading("loading");
      })
      .addCase(authLoginApi.fulfilled, (state, action) => {
        if (
          action.payload.data?.user?.IsAdmin &&
          action.payload.status >= 200 &&
          action.payload.status < 300
        ) {
          state.data = { ...action.payload.data.user };
          state.status = action.payload.status;
          localStorage.setItem("userToken", action.payload.data.token);
          toast.dismiss();
          toast.success("Login Successfull");
          state.loading = false;
        } else {
          state.status = action.payload.status;
          state.error = action.payload.data.msg;
          toast.dismiss();
          toast.error("Login Error");
          state.loading = false;
        }
      })
      .addCase(authLoginApi.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.data.msg;
        toast.dismiss();
        toast.success("Login Error");
        state.loading = false;
      });
  },
});

export const { logOutHandler } = authSlice.actions;

export default authSlice.reducer;
