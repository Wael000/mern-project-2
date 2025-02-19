import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from './UserContext'

const NavBar = () => {
  const { user, setUser } = useContext(UserContext)

  const handleClick = () => {
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(() => setUser(null))
  }

  useEffect(() => {
    fetch('http://localhost:3000/profile', 
    {
      method: 'GET',
      credentials: 'include',
    }).then(response => response.json())
    .then(data => setUser(data))
  }, [])

  return (
    <div className="container-a">
        <Link to="." className="logo">My Blog</Link>
        {user? 
          <nav>
            <Link to="create">Post</Link>
            <Link to="register" onClick={handleClick}>Logout</Link>
          </nav> : 
          <nav>
            <Link to="login">Login</Link>
            <Link to="register">Register</Link>
          </nav>}
    </div>
  )
}

export default NavBar
