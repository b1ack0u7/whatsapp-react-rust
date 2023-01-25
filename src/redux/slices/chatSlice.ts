import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat, IGroupChat, ISingleChat } from '../../interfaces/interfaces';

const initialState: IChat = {};

export const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers:{
    setGroupChatData: (state, action: PayloadAction<IGroupChat>) => {
      state.idGroup = action.payload.idGroup,
      state.creationDate = action.payload.creationDate,
      state.groupName = action.payload.groupName,
      state.participants = action.payload.participants
    },
    setSingleChatData: (state, action: PayloadAction<ISingleChat>) => {
      state.idSingle = action.payload.idSingle,
      state.creationDate = action.payload.creationDate,
      state.participant = action.payload.participant
    }
  }
});

export const {
  setGroupChatData,
  setSingleChatData,
} = chatSlice.actions;