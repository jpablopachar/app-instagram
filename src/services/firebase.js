import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../libs'

export const firebaseServices = {}

firebaseServices.doesUsernameExist = async (username) => {
  const res = await getDocs(
    query(
      collection(firestore, 'users'),
      where('username', '==', username.toLowerCase())
    )
  )

  return res.docs.length > 0
}

firebaseServices.getUserByUserId = async (userId) => {
  const res = await getDocs(
    query(
      collection(firestore, 'users'),
      where('userId', '==', userId)
    )
  )

  const user = res.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))

  return user
}
