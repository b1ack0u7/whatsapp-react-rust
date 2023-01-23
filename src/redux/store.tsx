import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from './slices/appSlice';
import { userSlice } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    appReducer: appSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>