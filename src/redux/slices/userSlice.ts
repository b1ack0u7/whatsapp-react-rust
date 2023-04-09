import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from '../../interfaces/interfaces';

const initialState: IUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : {
  chatGroups: [],
  friendList: [],
  friendRequest: [],
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      const newState = {...state, ...action.payload};
      localStorage.setItem('currentUser', JSON.stringify(newState));
      return {...newState};
    },
    updateCurrentUser: (state: any, action: PayloadAction<IUser>) => {
      const newState = {...state, ...action.payload};
      localStorage.setItem('currentUser', JSON.stringify(newState));
      return {...newState};
    }
  }
});

export const {
  setCurrentUser,
  updateCurrentUser,
} = userSlice.actions;