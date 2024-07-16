import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverApi } from "../../services/serverApi";
import { serverUrl } from "../../constants/constants";
import { toast } from "react-toastify";

// get all users thunk handler
export const fetchAllStates = createAsyncThunk(
  "state/fetchAllStates",
  async () => {
    try {
      let res = await serverApi({
        httpMethod: "GET",
        url: `${serverUrl}/listState`,
        reqBody: {},
        reqHeaders: { "Content-Type": "application/json" },
      });
      return { ...res, config: {}, headers: {}, request: {} };
    } catch (error) {
      return error;
    }
  }
);

// create state api
export const createStateApi = createAsyncThunk(
  "state/createStateApi",
  async (data) => {
    try {
      let res = await serverApi({
        httpMethod: "POST",
        url: `${serverUrl}/createState`,
        reqBody: data,
        reqHeaders: {
          "Content-Type": "application/json",
        },
      });
      return { ...res, config: {}, headers: {}, request: {} };
    } catch (error) {
      return error;
    }
  }
);

// delete state api
export const deleteStateApi = createAsyncThunk(
  "state/deleteStateApi",
  async (stateId) => {
    try {
      let res = await serverApi({
        httpMethod: "DELETE",
        reqBody: {},
        reqHeaders: {},
        url: `${serverUrl}/deleteState?id=${stateId}`,
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

const stateSlice = createSlice({
  name: "state",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStates.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllStates.fulfilled, (state, action) => {
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
      .addCase(fetchAllStates.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.data;
        state.loading = false;
      });
    builder
      .addCase(createStateApi.pending, (state, action) => {
        state.loading = true;
        toast.loading("loading");
      })
      .addCase(createStateApi.fulfilled, (state, action) => {
        if (action.payload.status >= 200 && action.payload.status < 300) {
          state.data.push(action.payload.data);
          state.status = action.payload.status;
          state.loading = false;
          toast.dismiss();
          toast.success("creation Succefull");
        } else {
          state.status = action.payload.status;
          state.error = action.payload.data;
          state.loading = false;
          toast.dismiss();
          toast.success("Error in creation");
        }
      })
      .addCase(createStateApi.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.data;
        state.loading = false;
        toast.dismiss();
        toast.success("Error in creation");
      });
    builder
      .addCase(deleteStateApi.pending, (state, action) => {
        state.loading = true;
        toast.loading("Loading");
      })
      .addCase(deleteStateApi.fulfilled, (state, action) => {
        if (action.payload.status >= 200 && action.payload.status < 300) {
          state.data = [...action.payload.data];
          state.status = action.payload.status;
          state.loading = false;
          toast.dismiss();
          toast.success("Deletion Succefull");
        } else {
          state.status = action.payload.status;
          state.error = action.payload.data;
          state.loading = false;
          toast.dismiss();
          toast.success("Error in Deletion");
        }
      })
      .addCase(deleteStateApi.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.data;
        state.loading = false;
        toast.dismiss();
        toast.success("Error in Deletion");
      });
  },
});

export default stateSlice.reducer;
