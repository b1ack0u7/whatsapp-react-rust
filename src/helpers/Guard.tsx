import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/store';

const Guard = () => {
  const userData = useSelector((state: RootState) => state.userReducer);

  return userData.id ? <Outlet /> : <Navigate replace to='/login'/>
}

export default Guard