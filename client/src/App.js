 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Home from './components/User/Home'
import Profile from './components/User/Profile'

// import AdminPanel from './components/Admin/AdminPanel'
// import Navbar from './components/common/Navbar'

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
