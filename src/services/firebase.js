import {
  arrayRemove,
  arrayUnion, collection, doc, getDocs,
  limit,
  query, updateDoc, where
} from 'firebase/firestore'
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

firebaseServices.getUserByUsername = async (username) => {
  const res = await getDocs(
    query(
      collection(firestore, 'users'),
      where('username', '==', username.toLowerCase())
    )
  )

  return res.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))
}

firebaseServices.getUserByUserId = async (userId) => {
  const res = await getDocs(
    query(collection(firestore, 'users'), where('userId', '==', userId))
  )

  const user = res.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))

  return user
}

firebaseServices.getSuggestedProfiles = async (userId, following) => {
  let query = collection(firestore, 'users')

  if (following.length > 0) {
    query = query(where('userId', 'not-in', [...following, userId]), limit(10))
  } else {
    query = query(where('userId', '!=', userId), limit(10))
  }

  const res = await getDocs(query)
  const profiles = res.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))

  return profiles
}

firebaseServices.updateLoggedInUserFollowing = async (
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) => {
  const loggedInUserDocIdRef = doc(firestore, 'users', loggedInUserDocId)

  const res = await updateDoc(loggedInUserDocIdRef, {
    following: isFollowingProfile
      ? arrayRemove(profileId)
      : arrayUnion(profileId)
  })

  console.log(res)

  return res
}

firebaseServices.updateFollowedUserFollowers = async (
  profileDocId,
  loggedInUserDocId,
  isFollowingProfile
) => {
  const profileDocIdRef = doc(firestore, 'users', profileDocId)

  const res = await updateDoc(profileDocIdRef, {
    followers: isFollowingProfile
      ? arrayRemove(loggedInUserDocId)
      : arrayUnion(loggedInUserDocId)
  })

  console.log(res)

  return res
}

firebaseServices.getPhotos = async (userId, following) => {
  const res = await getDocs(
    query(collection(firestore, 'photos'), where('userId', 'in', following))
  )

  const userFollowedPhotos = res.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false

      if (photo.likes.includes(userId)) {
        userLikedPhoto = true
      }

      const user = await firebaseServices.getUserByUserId(photo.userId)

      const { username } = user[0]

      return { username, ...photo, userLikedPhoto }
    })
  )

  return photosWithUserDetails
}

firebaseServices.getUserPhotosByUserId = async (userId) => {
  const res = await getDocs(
    query(collection(firestore, 'photos'), where('userId', '==', userId))
  )

  const photos = res.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))

  return photos
}

firebaseServices.isUserFollowingProfile = async (
  loggedInUserUsername,
  profileUserId
) => {
  const res = await getDocs(
    query(
      collection(firestore, 'users'),
      where('username', '==', loggedInUserUsername),
      where('following', 'array-contains', profileUserId)
    )
  )

  const [response = {}] = res.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))

  return response.userId
}

firebaseServices.toggleFollow = async (
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) => {
  await firebaseServices.updateLoggedInUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingProfile
  )
  await firebaseServices.updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  )
}
