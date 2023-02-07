import React from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Guard from '../helpers/Guard'
import Home from '../pages/Home'
import Login from '../pages/Login'

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={ <Guard/> }>
            <Route path="/home" element={<Home />}/>
          </Route>


          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<Navigate replace to='/home'/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRouter