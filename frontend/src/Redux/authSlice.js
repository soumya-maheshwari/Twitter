import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  user: {},
  profile: "",
};

export const registerUserThunk = createAsyncThunk(
  "auth/signup",
  async (data) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    return await Api.post(`auth/signup`, data, config)
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

export const loginUserThunk = createAsyncThunk("auth/login", async (data) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  return await Api.post(`auth/login`, data, config)
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch((err) => {
      // console.log(err);
      return err.response;
    });
});

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPassword",
  async (data) => {
    return await Api.post(`forgot`, data)
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

export const verifyOTPThunk = createAsyncThunk(
  "auth/forgotPassword/verify",
  async (data) => {
    return await Api.post(`forgot/verify`, data)
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

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  REGISTER USER
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
          state.profile = action.payload.data;
          state.user = action.payload.data.user;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      // LOGIN USER
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
          state.user = action.payload.data.user;
          state.profile = action.payload.data;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      // FORGOT PASSWORD
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(forgotPasswordThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      // FORGOT PASSWORD VERIFICATION
      .addCase(verifyOTPThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOTPThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(verifyOTPThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default authSlice.reducer;
