import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EChatOptions } from "../../interfaces/enums";
import { IApp, IGroupChat, IMessage, IAlert } from '../../interfaces/interfaces';

const initialState: IApp = {
  chatOption: EChatOptions.messages,
  isLoading: true,
  logoutRequested: false,
  queueAlert: [],
  sideBarChats: [],
  sidebarMenuIsShown: false,
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers:{
    setSidebarMenuShow: (state, action: PayloadAction<boolean>) => {
      state.sidebarMenuIsShown = action.payload;
    },
    setChatOption: (state, action: PayloadAction<EChatOptions>) => {
      state.chatOption = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLogoutRequest: (state, action: PayloadAction<boolean>) => {
      state.logoutRequested = action.payload;
    },
    setSideBarChats: (state, action: PayloadAction<{initialChats?: IGroupChat[], incomingChat?: IMessage, initial?: boolean}>) => {
      if (action.payload.initial === true) {
        state.sideBarChats = action.payload.initialChats || [];
        state.isLoading = false;
      }
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
    },
    enqueueAlert: (state, action: PayloadAction<{type?: string, alertData?: IAlert}>) => {
      if (action.payload.type === 'reload') {
        if (state.queueAlert.length > 0) {
          state.currentAlert = state.queueAlert[0];
          state.queueAlert.shift();
        }
      } else {
        if (!state.currentAlert) state.currentAlert = action.payload.alertData;
        else state.queueAlert.push(action.payload.alertData!);
      }
    },
    resetCurrentAlert: (state) => {
      state.currentAlert = undefined;
    }
  }
});

export const {
  setSidebarMenuShow,
  setChatOption,
  setIsLoading,
  setLogoutRequest,
  setSideBarChats,
  enqueueAlert,
  resetCurrentAlert,
} = appSlice.actions;