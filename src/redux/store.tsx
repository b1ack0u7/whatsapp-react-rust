import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from './slices/appSlice';
import { chatSlice } from "./slices/chatSlice";
import { userSlice } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    appReducer: appSlice.reducer,
    chatReducer: chatSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>