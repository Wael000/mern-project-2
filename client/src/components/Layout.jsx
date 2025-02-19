import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='layout-container'>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default Layout
