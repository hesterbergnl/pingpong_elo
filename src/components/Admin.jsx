import Matches from './Matches'
import Players from './Players'
import LogoutButton from './LogoutButton'
import RecalcEloButton from './RecalcEloButton'

const Admin = ({ user }) => {
  return (
    <>
      <Matches user={user} selectedPlayer={null} qty={-1}/>
      <Players user={user} qty={-1}/>
      <RecalcEloButton/>
    </>
  )
}

export default Admin