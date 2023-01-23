import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApp } from '../../interfaces/interfaces';

const initialState: IApp = {
  sidebarMenuIsShown: false
}

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers:{
    setSidebarMenuShow: (state, action: PayloadAction<boolean>) => {
      state.sidebarMenuIsShown = action.payload
    }
  }
});

export const {
  setSidebarMenuShow
} = appSlice.actions;