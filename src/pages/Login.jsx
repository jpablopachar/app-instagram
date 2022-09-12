import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import iPhone from '../assets/iphone-with-profile.jpg'
import logo from '../assets/logo.png'
import { PrivateRoutes, PublicRoutes } from '../constant'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const isInvalid = password === '' || email === ''

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const auth = getAuth()

      await signInWithEmailAndPassword(auth, email, password)

      navigate(PrivateRoutes.DASHBOARD)
    } catch (error) {
      setEmail('')
      setPassword('')
      setError(error.message)
    }
  }

  useEffect(() => {
    document.title = 'Iniciar sesión - Instagram'
  }, [])

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src={iPhone} alt="iPhone with Instagram app" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-200 mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img className="mt-2 w-6/12 mb-4" src={logo} alt="Logo" />
          </h1>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form onSubmit={handleLogin} method="POST">
            <input
              type="text"
              className="text-sm text-gray-300 w-full mr-3 py-5 px-4 h-2 border border-gray-200 rounded mb-2"
              placeholder="Correo"
              aria-label="Enter your email"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            <input
              type="password"
              className="text-sm text-gray-300 w-full mr-3 py-5 px-4 h-2 border border-gray-200 rounded mb-2"
              placeholder="Contraseña"
              aria-label="Enter your email"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              type="submit"
              className={`bg-blue-900 text-white w-full rounded h-8 font-bold ${
                isInvalid && 'opacity-50'
              }`}
              disabled={isInvalid}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-200">
          <p className="text-sm">
            ¿No tienes una cuenta?{' '}
            <Link className="font-bold text-blue-900" to={PublicRoutes.SIGN_UP}>
              Registrarse
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
