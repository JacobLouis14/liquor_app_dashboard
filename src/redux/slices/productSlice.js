import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverApi } from "../../services/serverApi";
import { serverUrl } from "../../constants/constants";
import { toast } from "react-toastify";

// get all product data thunk
export const fetchAllProduct = createAsyncThunk(
  "product/fetchAllProduct",
  async () => {
    try {
      let res = await serverApi({
        httpMethod: "GET",
        url: `${serverUrl}/getallproductdata`,
        reqBody: {},
        reqHeaders: { "Content-Type": "application/json" },
      });
      return { ...res, config: {}, headers: {}, request: {} };
    } catch (error) {
      return error;
    }
  }
);

// create product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (formData) => {
    try {
      let res = await serverApi({
        httpMethod: "POST",
        url: `${serverUrl}/createProduct`,
        reqBody: formData,
        reqHeaders: {
          "content-type": "multipart/form-data",
        },
      });

      return { ...res, config: {}, headers: {}, request: {} };
    } catch (error) {
      return error;
    }
  }
);

// delete product Handler
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId) => {
    try {
      let res = await serverApi({
        httpMethod: "DELETE",
        url: `${serverUrl}/deleteProduct?id=${productId}`,
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

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
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
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.data;
        state.loading = false;
      });
    builder
      .addCase(addProduct.pending, (state, action) => {
        state.loading = true;
        toast.loading("loading");
      })
      .addCase(addProduct.fulfilled, (state, action) => {
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
      .addCase(addProduct.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.data;
        state.loading = false;
        toast.dismiss();
        toast.error("Error in Creation");
      });
    builder
      .addCase(deleteProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
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
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.data;
        state.loading = false;
        toast.error("Error in Deletion");
      });
  },
});

export default productSlice.reducer;
