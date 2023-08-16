import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  newPost: null,
};

export const createPostThunk = createAsyncThunk(
  "post/create_post",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(user.accessToken);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.post("post/create", data, config)
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  }
);

export const likePostThunk = createAsyncThunk(
  "post/like_post",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(user.accessToken);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.post("post/likePost", data, config)
      .then((res) => {
        // console.log(res);
        // console.log(data);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  }
);

export const getHomeFeedsThunk = createAsyncThunk(
  "post/homeFeeds",
  async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(user.accessToken);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.get("post/homeFeeds", config)
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  }
);

export const addToBookmarkThunk = createAsyncThunk(
  "post/addToBookmarks",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(user.accessToken);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.post("post/addToBookmarks", data, config)
      .then((res) => {
        // console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err.response;
      });
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // CREATE POST
      .addCase(createPostThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.isLoading = false;

        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(createPostThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      // LIKE POST
      .addCase(likePostThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(likePostThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.isLoading = false;

        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(likePostThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      // HOMEPAGE POSTS
      .addCase(getHomeFeedsThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getHomeFeedsThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.isLoading = false;

        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(getHomeFeedsThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      // ADD TO BOOKMARKS
      .addCase(addToBookmarkThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addToBookmarkThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.isLoading = false;

        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(addToBookmarkThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default postSlice.reducer;
