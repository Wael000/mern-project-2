import './App.css'
import Layout from './components/Layout'
import Posts from './components/Posts'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Create from './components/Create'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Posts />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='create' element={<Create />} />
      </Route>
    </Routes>
  )
}

export default App
