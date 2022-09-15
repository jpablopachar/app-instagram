import { cloneElement } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { PublicRoutes } from '../constant'

const ProtectedRoute = ({ user, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) return cloneElement(children, { user })

        if (!user) {
          return (
            <Navigate
              to={{ pathname: PublicRoutes.LOGIN, state: { from: location } }}
            />
          )
        }

        return null
      }}
    />
  )
}

export default ProtectedRoute
