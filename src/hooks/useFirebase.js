import { useContext } from 'react'
import FirebaseContext from '../context/firebase-provider'

export const useFirebase = () => useContext(FirebaseContext)
