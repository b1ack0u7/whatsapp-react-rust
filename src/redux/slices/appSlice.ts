import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatOptions } from "../../interfaces/enums";
import { IApp } from '../../interfaces/interfaces';

const initialState: IApp = {
  sidebarInfoIsShown: false,
  sidebarMenuIsShown: false,
  chatOption: ChatOptions.messages,
  isLoading: false,
  logoutRequested: false,
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers:{
    setSidebarInfoShow: (state, action: PayloadAction<boolean>) => {
      state.sidebarInfoIsShown = action.payload;
    },
    setSidebarMenuShow: (state, action: PayloadAction<boolean>) => {
      state.sidebarMenuIsShown = action.payload;
    },
    setChatOption: (state, action: PayloadAction<ChatOptions>) => {
      state.chatOption = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLogoutRequest: (state, action: PayloadAction<boolean>) => {
      state.logoutRequested = action.payload;
    }
  }
});

export const {
  setSidebarInfoShow,
  setSidebarMenuShow,
  setChatOption,
  setIsLoading,
  setLogoutRequest
} = appSlice.actions;