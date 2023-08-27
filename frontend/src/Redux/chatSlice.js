import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "./API.js";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  newPost: null,
};

export const createChatThunk = createAsyncThunk(
  "chat/createChat",
  async (data) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    };

    return await Api.post("chat/createChat", data, config)
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

export const getAllChatsThunk = createAsyncThunk("chat/fetchAll", async () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    },
  };

  return await Api.get("chat/fetchAllChats", config)
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch((err) => {
      // console.log(err);
      return err.response;
    });
});

export const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // CREATE CHAT
      .addCase(createChatThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createChatThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.isLoading = false;

        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(createChatThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })

      // GET ALL CHATS
      .addCase(getAllChatsThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllChatsThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.isLoading = false;

        if (action.payload.data.success) {
          state.isSuccess = true;
        } else {
          state.isSuccess = false;
          state.isError = true;
        }
      })
      .addCase(getAllChatsThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      });
  },
});

export default chatSlice.reducer;
