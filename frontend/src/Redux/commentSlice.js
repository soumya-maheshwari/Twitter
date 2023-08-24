import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  newPost: null,
};

export const addCommentThunk = createAsyncThunk(
  "comment/addComment",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(user.accessToken);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.post("comment/addComment", data, config)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }
);

export const postSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //ADD COMMENT
      .addCase(addCommentThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addCommentThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.isLoading = false;

        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(addCommentThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default postSlice.reducer;
