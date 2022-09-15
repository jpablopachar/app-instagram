import { useEffect, useState } from 'react'
import { firebaseServices } from '../services'

export const useUser = (userId) => {
  const [activeUser, setActiveUser] = useState()

  useEffect(() => {
    async function getUserObjByUserId (userId) {
      const [user] = await firebaseServices.getUserByUserId(userId)

      setActiveUser(user || {})
    }

    if (userId) {
      getUserObjByUserId(userId)
    }
  }, [userId])

  return { user: activeUser, setActiveUser }
}
