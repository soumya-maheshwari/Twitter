import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import authReducer from "./authSlice";
import postReducer from "./postSlice";
import profileReducer from "./profileSlice";
import commentReducer from "./commentSlice";

// Redux Persist configuration
const persistConfig = {
  key: "root", // The key for the root of the state object
  storage: storage, // The storage engine (localStorage in this case)
  // Add any other configuration options if needed
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedPostReducer = persistReducer(persistConfig, postReducer);
const persistedProfileReducer = persistReducer(persistConfig, profileReducer);
const persistedCommentReducer = persistReducer(persistConfig, commentReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    post: persistedPostReducer,
    user: persistedProfileReducer,
    comment: persistedCommentReducer,
  },

  middleware: [thunk],
});

// Create the persisted store
const persistor = persistStore(store);

export { persistor, store };
