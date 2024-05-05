import loginService from '../services/login'

const LoginForm = () => {
  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value
    
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(JSON.stringify(user))
    } catch (exception) {
      console.log('wrong credentials')
    }

    event.target.username.value = ''
    event.target.password.value = ''
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