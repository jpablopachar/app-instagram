import { useEffect, useState } from 'react'
import { firebaseServices } from '../services'

export const usePhotos = (user) => {
  const [photos, setPhotos] = useState(null)

  useEffect(() => {
    async function getTimelinePhotos () {
      if (user?.following?.length > 0) {
        const followedUserPhotos = await firebaseServices.getPhotos(
          user.userId,
          user.following
        )

        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)

        setPhotos(followedUserPhotos)
      }
    }

    getTimelinePhotos()
  }, [user?.userId, user?.following])

  return { photos }
}
