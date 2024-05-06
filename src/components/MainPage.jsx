import MatchForm from './MatchForm'
import Matches from './Matches'
import Players from './Players'
import LoginForm from './LoginForm'
import LogoutButton from './LogoutButton'
import Header from './Header'

import { useSelector } from 'react-redux'

const MainPage = () => {
  const loginUser = useSelector(state => state.loginUser)

  return (
    <>
      <Header />
      <MatchForm />
      <Matches />
      <Players />
      { loginUser === null
        ? <LoginForm />
        : <LogoutButton />
      }
    </>
  )
}

export default MainPage