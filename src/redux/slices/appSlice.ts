import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISidebar } from '../../interfaces/interfaces';

const initialState: ISidebar = {
  sidebarInfoIsShown: false,
  sidebarMenuIsShown: false,
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers:{
    setSidebarInfoShow: (state, action: PayloadAction<boolean>) => {
      state.sidebarInfoIsShown = action.payload
    },
    setSidebarMenuShow: (state, action: PayloadAction<boolean>) => {
      state.sidebarMenuIsShown = action.payload
    }
  }
});

export const {
  setSidebarInfoShow,
  setSidebarMenuShow,
} = appSlice.actions;