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
      <Matches selectedPlayer={selectedPlayer}/>
      {console.log(selectedPlayer)}
      <Players />
      { loginUser === null
        ? <LoginForm />
        : <> 
            <LogoutButton /> 
            <RecalcEloButton />
          </>
      }
    </>
  )
}

export default MainPage