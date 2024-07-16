import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverApi } from "../../services/serverApi";
import { serverUrl } from "../../constants/constants";
import { toast } from "react-toastify";

// get all bev shop data thunk
export const fetchAllShop = createAsyncThunk("shop/fetchAllShop", async () => {
  try {
    let res = await serverApi({
      httpMethod: "GET",
      url: `${serverUrl}/getallshoplist`,
      reqBody: {},
      reqHeaders: { "Content-Type": "application/json" },
    });
    return { ...res, config: {}, headers: {}, request: {} };
  } catch (error) {
    return error;
  }
});

// create shop api Handler
export const createShopApi = createAsyncThunk(
  "shop/createShopApi",
  async (fromData) => {
    console.log(fromData);
    try {
      let res = await serverApi({
        httpMethod: "POST",
        url: `${serverUrl}/createshop`,
        reqBody: fromData,
        reqHeaders: {},
      });
      return { ...res, config: {}, headers: {}, request: {} };
    } catch (error) {
      return error;
    }
  }
);

// delete shop api Handler
export const deletShopApiHandler = createAsyncThunk(
  "shop/deletShopApiHandler",
  async (shopId) => {
    try {
      let res = await serverApi({
        httpMethod: "DELETE",
        url: `${serverUrl}/deleteShop?id=${shopId}`,
        reqBody: {},
        reqHeaders: {},
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

const shopSlice = createSlice({
  name: "shop",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShop.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllShop.fulfilled, (state, action) => {
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
      .addCase(fetchAllShop.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.data;
        state.loading = false;
      });
    builder
      .addCase(createShopApi.pending, (state, action) => {
        state.loading = true;
        toast.loading("Loading");
      })
      .addCase(createShopApi.fulfilled, (state, action) => {
        if (action.payload.status >= 200 && action.payload.status < 300) {
          state.data.push(action.payload.data);
          state.status = action.payload.status;
          state.loading = false;
          toast.dismiss();
          toast.success("Created Successfully");
        } else {
          state.status = action.payload.status;
          state.error = action.payload.data;
          state.loading = false;
        }
      })
      .addCase(createShopApi.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.data;
        state.loading = false;
        toast.dismiss();
        toast.error("Error in Creation");
      });
    builder
      .addCase(deletShopApiHandler.pending, (state, action) => {
        state.loading = true;
        toast.loading("Loading");
      })
      .addCase(deletShopApiHandler.fulfilled, (state, action) => {
        if (action.payload.status >= 200 && action.payload.status < 300) {
          state.data = [...action.payload.data];
          state.status = action.payload.status;
          state.loading = false;
          toast.dismiss();
          toast.success("Delete Successfully");
        } else {
          state.status = action.payload.status;
          state.error = action.payload.data;
          state.loading = false;
        }
      })
      .addCase(deletShopApiHandler.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.data;
        state.loading = false;
        toast.error("Delete Unsuccessfull");
      });
  },
});

export default shopSlice.reducer;
