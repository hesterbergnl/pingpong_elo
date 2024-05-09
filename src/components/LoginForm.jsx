import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginUserReducer'

import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value
    
    dispatch(loginUser({username, password}))

    event.target.username.value = ''
    event.target.password.value = ''
    navigate('/')
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          Username: 
          <input type='text' name='username' />
        </div>
        <div>
          Password: 
          <input type='password' name='password' />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
 ) 
}

export default LoginForm