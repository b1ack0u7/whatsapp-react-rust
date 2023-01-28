import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat, IGroupChat, ISingleChat, IMessage } from '../../interfaces/interfaces';

const initialState: IChat = {};

export const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers:{
    setGroupChatData: (state, action: PayloadAction<IGroupChat | undefined>) => {
      state.id = action.payload?.id,
      state.creationDate = action.payload?.creationDate,
      state.groupName = action.payload?.groupName,
      state.participants = action.payload?.participants,
      state.message = action.payload?.message
    },
    setSingleChatData: (state, action: PayloadAction<ISingleChat | undefined>) => {
      state.id = action.payload?.id,
      state.creationDate = action.payload?.creationDate,
      state.participant = action.payload?.participant
    },
    setLastMessage: (state, action: PayloadAction<IMessage>) => {
      state.message = action.payload
    }
  }
});

export const {
  setGroupChatData,
  setSingleChatData,
} = chatSlice.actions;