import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverApi } from "../../services/serverApi";
import { serverUrl } from "../../constants/constants";

// get all users thunk handler
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    try {
      let res = await serverApi({
        httpMethod: "GET",
        url: `${serverUrl}/users/getfulluserdata`,
        reqBody: {},
        reqHeaders: { "Content-Type": "application/json" },
      });
      return { ...res, config: {}, headers: {}, request: {} };
    } catch (error) {
      return error;
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  status: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        if (action.payload.status >= 200 && action.payload.status < 300) {
          state.data = [...action.payload.data];
          state.status = action.payload.status;
          state.loading = false;
        } else {
          state.status = action.payload.status;
          state.error = action.payload.data;
          state.loading = false;
        }
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.data;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
