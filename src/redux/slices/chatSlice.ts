import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat, IGroupChat, ISingleChat, IMessage } from '../../interfaces/interfaces';

const initialState: IChat = {
  participant: {},
  participants: []
};

export const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers:{
    setGroupChatData: (state, action: PayloadAction<IGroupChat>) => {
      state.id = action.payload?.id,
      state.creationDate = action.payload?.creationDate,
      state.groupName = action.payload?.groupName,
      state.participants = action.payload?.participants,
      state.lastMessage = action.payload?.lastMessage
    },
    setSingleChatData: (state, action: PayloadAction<ISingleChat>) => {
      state.id = action.payload?.id,
      state.creationDate = action.payload?.creationDate,
      state.participant = action.payload?.participant
    },
    setLastMessage: (state, action: PayloadAction<IMessage>) => {
      state.lastMessage = action.payload
    }
  }
});

export const {
  setGroupChatData,
  setSingleChatData,
  setLastMessage,
} = chatSlice.actions;