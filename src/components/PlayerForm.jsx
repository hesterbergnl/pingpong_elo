import { useDispatch, useSelector } from 'react-redux'
import { createPlayer } from '../reducers/playerReducer'

const PlayerForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.loginUser)

  const addPlayer = async (event) => {
    event.preventDefault()
    
    const elo = 1200

    const name = event.target.name.value

    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }

    event.target.name.value = ''
  
    let newPlayer = {
      name: name,
      elo: elo
    }
    
    dispatch(createPlayer(newPlayer, config))
  }
  
  if (user === null) {
    return null
  }
  else {
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
}

export default PlayerForm
