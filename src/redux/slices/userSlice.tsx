import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from '../../interfaces/interfaces';

const initialState: IUser = {
  id: undefined,
  name: undefined
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers:{
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.id = action.payload.id,
      state.name = action.payload.name
    }
  }
});

export const {
  setCurrentUser
} = userSlice.actions;