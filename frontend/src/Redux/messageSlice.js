import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  messagesArray: "",
};

export const sendMessageThunk = createAsyncThunk(
  "message/sendMessage",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(user.accessToken);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.post("message/sendMessage", data, config)
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

export const getAllMessagesThunk = createAsyncThunk(
  "message/getAll",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(user.accessToken);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.get(`message/getAll/${data}`, config)
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

export const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // SEND MESSAGE
      .addCase(sendMessageThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;

        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(sendMessageThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      // GET ALL MESSAGESs
      .addCase(getAllMessagesThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllMessagesThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        console.log(action.payload.data.messages);

        state.isLoading = false;

        if (action.payload.data.success) {
          state.isSuccess = true;
          state.messagesArray = action.payload.data.messages;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(getAllMessagesThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default messageSlice.reducer;
