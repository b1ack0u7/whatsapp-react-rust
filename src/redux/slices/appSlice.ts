import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatOptions } from "../../interfaces/enums";
import { IApp, IGroupChat, IMessage } from '../../interfaces/interfaces';

const initialState: IApp = {
  sidebarMenuIsShown: false,
  chatOption: ChatOptions.messages,
  isLoading: false,
  logoutRequested: false,
  sideBarChats: [],
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers:{
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
    },
    setSideBarChats: (state, action: PayloadAction<{initialChats?: IGroupChat[], incomingChat?: IMessage, initial?: boolean}>) => {
      if (action.payload.initial === true) state.sideBarChats = action.payload.initialChats || [];
      else {
        let updated = false;
        const updatedChats = state.sideBarChats.map(item => {
          if (item.id === action.payload.incomingChat?.idGroup) {
            updated = true;
            return { ...item, lastMessage: action.payload.incomingChat };
          }
          return item;
        });
        if (updated) state.sideBarChats = updatedChats;
      }
    }
  }
});

export const {
  setSidebarMenuShow,
  setChatOption,
  setIsLoading,
  setLogoutRequest,
  setSideBarChats,
} = appSlice.actions;