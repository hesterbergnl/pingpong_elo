import { useDispatch } from 'react-redux'
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
    
    dispatch(createPlayer(newPlayer))
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
