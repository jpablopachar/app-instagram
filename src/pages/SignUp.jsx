import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import iPhone from '../assets/iphone-with-profile.jpg'
import logo from '../assets/logo.png'
import { PrivateRoutes, PublicRoutes } from '../constant'
import { FirebaseContext } from '../context'
import { firebaseServices } from '../services'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { firestore } = useContext(FirebaseContext)

  const isInvalid = password === '' || email === ''

  const handleSignUp = async (event) => {
    event.preventDefault()

    const usernameExists = await firebaseServices.doesUsernameExist(username)

    if (!usernameExists) {
      try {
        const auth = getAuth()

        const createdUserRes = await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(auth.currentUser, { displayName: username })

        await addDoc(collection(firestore, 'users'), {
          userId: createdUserRes.user.uid,
          username: username.toLowerCase(),
          fullName,
          email: email.toLowerCase(),
          following: ['2'],
          followers: [],
          dateCreated: Date.now()
        })

        navigate(PrivateRoutes.DASHBOARD)
      } catch (error) {
        setFullName('')
        setEmail('')
        setPassword('')
        setError(error.message)
      }
    } else {
      setUsername('')
      setError('Ese nombre de usuario ya está en uso, intente con otro.')
    }
  }

  useEffect(() => {
    document.title = 'Registrarse - Instagram'
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
          <form onSubmit={handleSignUp} method="POST" autoComplete="off">
            <input
              type="text"
              className="text-sm text-gray-300 w-full mr-3 py-5 px-4 h-2 border border-gray-200 rounded mb-2"
              placeholder="Nombre de usuario"
              aria-label="Enter your username"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              type="text"
              className="text-sm text-gray-300 w-full mr-3 py-5 px-4 h-2 border border-gray-200 rounded mb-2"
              placeholder="Nombres completos"
              aria-label="Enter your fullName"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
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
              Registrarse
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-200">
          <p className="text-sm">
            ¿Ya tienes una cuenta?{' '}
            <Link className="font-bold text-blue-900" to={PublicRoutes.LOGIN}>
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default SignUp
