// import reactLogo from './assets/react.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LOGIN, PROFILE } from './constant/routes'
import Login from './pages/Login'
import Profile from './pages/Profile'

function App () {
  return (
    <Routes>
      <Route path={LOGIN} element={<Login/>}/>
      <Route path={PROFILE} element={<Profile/>}/>
    </Routes>
  )
}

export default App
