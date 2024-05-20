import Matches from './Matches'
import Players from './Players'
import RecalcEloButton from './RecalcEloButton'
import PlayerForm from './PlayerForm'

const Admin = ({ user }) => {
  return (
    <>
      <Matches user={user} selectedPlayer={null} qty={-1}/>
      <PlayerForm />
      <Players user={user} qty={-1}/>
      <RecalcEloButton/>
    </>
  )
}

export default Admin