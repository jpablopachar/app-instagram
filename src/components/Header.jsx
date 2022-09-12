import { getAuth } from 'firebase/auth'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import defaultImg from '../assets/default.png'
import logo from '../assets/logo.png'
import { PrivateRoutes, PublicRoutes } from '../constant'
import { UserContext } from '../context'
import { useUser } from '../hooks'

const Header = () => {
  const { user: loggedInUser } = useContext(UserContext)
  const { user } = useUser(loggedInUser?.uid)

  const navigate = useNavigate()

  console.log(loggedInUser)

  return (
    <div className="h-16 bg-white border-b border-gray-50 mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={PrivateRoutes.DASHBOARD} aria-label="Instagram logo">
                <img src={logo} className="w-6/12 mt-2" alt="Instagram"/>
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center">
            {loggedInUser
              ? (
              <>
                <Link to={PrivateRoutes.DASHBOARD} aria-label="Dashboard">
                  <svg
                    className="w-8 mr-6 text-black cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => {
                    getAuth().signOut()

                    navigate(PublicRoutes.LOGIN)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      getAuth().signOut()

                      navigate(PublicRoutes.LOGIN)
                    }
                  }}
                >
                  <svg
                    className="w-8 mr-6 text-black cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                {user && (
                  <div className="flex items-center cursor-pointer">
                    <Link to={`/profile/${user?.username}`}>
                      <img
                        className="rounded-full h-8 w-8 flex"
                        src={`/images/avatars/${user?.username}.jpg`}
                        alt={`${user?.username} profile`}
                        onError={(event) => {
                          event.target.src = defaultImg
                        }}
                      />
                    </Link>
                  </div>
                )}
              </>
                )
              : (
              <>
                <Link to={PublicRoutes.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-900 font-bold text-sm rounded text-white px-2 w-auto h-8"
                  >
                    Iniciar Sesión
                  </button>
                </Link>
                <Link to={PublicRoutes.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-900 px-2 w-auto h-8"
                  >
                    Registrarse
                  </button>
                </Link>
              </>
                )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Header
