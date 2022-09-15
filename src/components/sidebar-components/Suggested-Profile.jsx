import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoggedInUserContext } from '../../context'
import { firebaseServices } from '../../services'

const SuggestedProfile = ({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId
}) => {
  const [followed, setFollowed] = useState(false)
  const { setActiveUser } = useContext(LoggedInUserContext)

  async function handleFollowUser () {
    setFollowed(true)

    await firebaseServices.updateLoggedInUserFollowing(
      loggedInUserDocId,
      profileId,
      false
    )
    await firebaseServices.updateFollowedUserFollowers(
      profileDocId,
      userId,
      false
    )

    const [user] = await firebaseServices.getUserByUserId(userId)

    setActiveUser(user)
  }

  return !followed
    ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/assets/avatars/${username}.jpg`}
          alt={username}
          onError={(event) => {
            event.target.src = '/assets/default.png'
          }}
        />
        <Link to={`/profile/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Seguir
      </button>
    </div>
      )
    : null
}
export default SuggestedProfile
