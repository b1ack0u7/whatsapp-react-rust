import React from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<Navigate replace to='/login'/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRouter