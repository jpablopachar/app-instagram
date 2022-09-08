// import reactLogo from './assets/react.svg'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { PublicRoutes } from './constant'
import { Login, Profile } from './pages'

// const Login = lazy(() => import('./pages/login'))

function App () {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path={PublicRoutes.LOGIN} element={<Login/>}/>
        <Route path={PublicRoutes.PROFILE} element={<Profile/>}/>
      </Routes>
    </Suspense>
  )
}

export default App
