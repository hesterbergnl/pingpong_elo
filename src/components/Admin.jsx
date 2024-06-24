import Matches from './Matches'
import Players from './Players'
import RecalcEloButton from './RecalcEloButton'
import PlayerForm from './PlayerForm'

const Admin = ({ user }) => {
  return (
    <>
      <RecalcEloButton/>
      <PlayerForm />
      <Players user={user} qty={-1}/>
      <Matches user={user} selectedPlayer={null} qty={-1}/>
    </>
  )
}

export default Admin