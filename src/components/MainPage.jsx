import MatchForm from './MatchForm'
import Matches from './Matches'
import Players from './Players'
import LoginForm from './LoginForm'
import LogoutButton from './LogoutButton'
import Header from './Header'
import RecalcEloButton from './RecalcEloButton'

import { useSelector } from 'react-redux'

const MainPage = ({selectedPlayer}) => {
  const loginUser = useSelector(state => state.loginUser)

  return (
    <>
      <Header />
      <MatchForm />
      <Matches selectedPlayer={selectedPlayer} user={null} qty={5}/>
      <Players user={null} qty={5}/>
    </>
  )
}

export default MainPage