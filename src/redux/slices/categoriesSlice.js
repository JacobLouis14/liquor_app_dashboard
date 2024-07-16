import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverApi } from "../../services/serverApi";
import { serverUrl } from "../../constants/constants";
import { toast } from "react-toastify";

// get all users thunk handler
export const fetchAllCategory = createAsyncThunk(
  "category/fetchAllCategory",
  async () => {
    try {
      let res = await serverApi({
        httpMethod: "GET",
        url: `${serverUrl}/getCategoryList`,
        reqBody: {},
        reqHeaders: { "Content-Type": "application/json" },
      });
      return { ...res, config: {}, headers: {}, request: {} };
    } catch (error) {
      return error;
    }
  }
);

// add Category Api
export const addCategoryApi = createAsyncThunk(
  "category/addCategoryApi",
  async (formData) => {
    try {
      let res = await serverApi({
        httpMethod: "POST",
        url: `${serverUrl}/createCategory`,
        reqBody: formData,
        reqHeaders: {},
      });
      return { ...res, config: {}, headers: {}, request: {} };
    } catch (error) {
      return error;
    }
  }
);

// delete Category HAndler
export const deleteCategoryApi = createAsyncThunk(
  "category/deleteCategoryApi",
  async (categoryId) => {
    try {
      let res = await serverApi({
        httpMethod: "DELETE",
        url: `${serverUrl}/deleteCategory?id=${categoryId}`,
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

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
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
      .addCase(fetchAllCategory.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.data;
        state.loading = false;
      });
    builder
      .addCase(addCategoryApi.pending, (state, action) => {
        state.loading = true;
        toast.loading("Loading");
      })
      .addCase(addCategoryApi.fulfilled, (state, action) => {
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
          toast.dismiss();
          toast.error("Error in Creation");
        }
      })
      .addCase(addCategoryApi.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.data;
        state.loading = false;
        toast.dismiss();
        toast.error("Error in Creation");
      });
    builder
      .addCase(deleteCategoryApi.pending, (state, action) => {
        state.loading = true;
        toast.loading("Loading");
      })
      .addCase(deleteCategoryApi.fulfilled, (state, action) => {
        if (action.payload.status >= 200 && action.payload.status < 300) {
          state.data = [...action.payload.data];
          state.status = action.payload.status;
          state.loading = false;
          toast.dismiss();
          toast.success("Delete Sucessfully");
        } else {
          state.status = action.payload.status;
          state.error = action.payload.data;
          state.loading = false;
          toast.dismiss();
          toast.success("Error In Deletion");
        }
      })
      .addCase(deleteCategoryApi.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.data;
        state.loading = false;
        toast.dismiss();
        toast.error("Error in deletion");
      });
  },
});

export default categorySlice.reducer;
