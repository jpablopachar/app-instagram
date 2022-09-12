import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { PrivateRoutes, PublicRoutes } from './constant'
import { UserContext } from './context'
import { useAuth } from './hooks/useAuth'
import { Dashboard, Login, Profile, SignUp } from './pages'

// const Login = lazy(() => import('./pages/login'))

function App () {
  const { user } = useAuth()

  return (
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={PublicRoutes.LOGIN} element={<Login/>}/>
            <Route path={PublicRoutes.SIGN_UP} element={<SignUp/>}/>
            <Route path={PublicRoutes.PROFILE} element={<Profile/>}/>
            <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
