import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { UserContext } from './UserContext'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password }),
        })
        if (response.ok) {
          const data = await response.json()
          setUser(data)
          navigate("/")
        } else {
          alert("Wrong credentials!")
        }
    }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input 
        type="text" 
        id="name" 
        name="name" 
        value={name} 
        onChange={e => setName(e.target.value)} />
      <label htmlFor="email">Email</label>
      <input 
        type="email" 
        id="email" 
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input 
        type="password" 
        id="password" 
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  )
}

export default Register
