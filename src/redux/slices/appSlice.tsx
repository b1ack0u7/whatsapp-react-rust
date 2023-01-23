import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISidebar, IChatInfo } from '../../interfaces/interfaces';

const initialState: IChatInfo = {
  sidebarInfoIsShown: false,
  sidebarMenuIsShown: false,
  idGroup: undefined,
  creationDate: undefined,
  groupName: undefined,
  participants: undefined
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
    },
    setChatInfo: (state, action: PayloadAction<IChatInfo>) => {
      state.idGroup = action.payload.idGroup,
      state.creationDate = action.payload.creationDate,
      state.groupName = action.payload.groupName,
      state.participants = action.payload.participants
    }
  }
});

export const {
  setSidebarInfoShow,
  setSidebarMenuShow,
  setChatInfo,
} = appSlice.actions;