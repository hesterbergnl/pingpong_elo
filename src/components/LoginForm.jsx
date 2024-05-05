const LoginForm = () => {
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <input type='text' name='username' />
        <input type='password' name='password' />
      </form>
    </>
 ) 
}