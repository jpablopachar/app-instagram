import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { firebaseServices } from '../../services'
import { SuggestedProfile } from '../sidebar-components'

const Suggestions = ({ userId, following, loggedInUserDocId }) => {
  const [profiles, setProfiles] = useState(null)

  useEffect(() => {
    async function suggestedProfiles () {
      const res = await firebaseServices.getSuggestedProfiles(
        userId,
        following
      )

      setProfiles(res)
    }

    if (userId) {
      suggestedProfiles()
    }
  }, [userId])
  return !profiles
    ? (
    <Skeleton count={1} height={150} className="mt-5" />
      )
    : (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Sugerencias para ti</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
      )
}
export default Suggestions
