import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { baseApi } from "@/services/api";
import orderReducer from "@/store/redux/order/reducer";
import userReducer from "@/store/redux/user/reducer";

export const RESET_STATE = "RESET_STATE";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  // Optionally, you can whitelist specific reducers to persist
  // whitelist: ['user'], // only user will be persisted
  // Or blacklist specific reducers from being persisted
  // blacklist: ['order'], // order will not be persisted
};

const appReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  order: orderReducer,
  user: userReducer,
});

// Combine your reducers
const rootReducer = (state, action) => {
  // Clear all data from redux and localStorage when RESET_STATE action is dispatched
  if (action.type === RESET_STATE) {
    // For redux-persist
    storage.removeItem("persist:root");

    // Return undefined to get reducers' initial state
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const resetStore = () => ({
  type: RESET_STATE,
});

// Create the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Redux Persist needs this to work properly with Redux Toolkit
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }).concat(baseApi.middleware),
});

// Create the persisted store
export const persistor = persistStore(store);

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
