import { getAuth } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../context'

export const useAuth = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser'))
  )
  const { firestore } = useContext(FirebaseContext)

  useEffect(() => {
    const auth = getAuth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser))

        setUser(authUser)
      } else {
        localStorage.removeItem('authUser')

        setUser(null)
      }
    })

    return () => auth()
  }, [firestore])

  return { user }
}
