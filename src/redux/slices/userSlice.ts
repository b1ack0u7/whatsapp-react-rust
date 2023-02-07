import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from '../../interfaces/interfaces';

const initialState: IUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : {};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers:{
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.chatGroups = action.payload.chatGroups;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    }
  }
});

export const {
  setCurrentUser,
} = userSlice.actions;