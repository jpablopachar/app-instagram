import { useFirebase } from '../hooks'

const Login = () => {
  const { firebase } = useFirebase()

  console.log(firebase)

  return (
    <div>Login</div>
  )
}

export default Login
