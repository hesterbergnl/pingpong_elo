import { useDispatch, useSelector } from 'react-redux'
import { createPlayer } from '../reducers/playerReducer'
import { createElos } from '../reducers/eloReducer'

const PlayerForm = () => {
  const dispatch = useDispatch()

  const addPlayer = async (event) => {
    event.preventDefault()
  
    const elo = 1200

    const name = event.target.name.value

    event.target.name.value = ''
  
    let newPlayer = {
      name: name,
      elo: elo
    }
    
    console.log(dispatch(createPlayer(newPlayer)))

    const state_players = useSelector(state => state.players)

    console.log(`state_players: ${state_players}`)

    newPlayer = state_players.filter(p => p.name === name)

    const eloObject = {
      player: newPlayer.id,
      elo: 1200
    }

    dispatch(createElos(eloObject))
  }
  
  return (
    <form onSubmit={addPlayer}>
      <table>
       <thead>
        <tr>
            <td>Name</td>
            <td><input name='name'/></td>
            <td><button type='submit'> Add </button></td>
          </tr>
       </thead>
      </table>
    </form>
  )
}

export default PlayerForm
