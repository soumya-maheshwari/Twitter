import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const getProfileThunk = createAsyncThunk(
  "user/getProfile",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user.accessToken);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.get(`profile/getProfile/${data}`, config)
      .then((res) => {
        console.log(res);
        console.log(data);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }
);
export const followUserThunk = createAsyncThunk(
  "profile/followUser",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user.accessToken);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.post(`profile/followUser`, data, config)
      .then((res) => {
        console.log(data);
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }
);

export const unFollowUserThunk = createAsyncThunk(
  "profile/unFollowUser",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user.accessToken);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.post(`profile/unfollowUser`, data, config)
      .then((res) => {
        console.log(data);
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }
);

export const getAllBookmarkThunk = createAsyncThunk(
  "profile/getAllBookmarks",
  async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user.accessToken);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.get(`profile/getAllBookmarks`, config)
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

export const profileSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  FOLLOW USER
      .addCase(followUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(followUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(followUserThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      // GET PROFILE
      .addCase(getProfileThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(getProfileThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      //  UNFOLLOW USER
      .addCase(unFollowUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unFollowUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(unFollowUserThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })
      //  GET ALL BOOKMARKS
      .addCase(getAllBookmarkThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBookmarkThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(getAllBookmarkThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default profileSlice.reducer;
