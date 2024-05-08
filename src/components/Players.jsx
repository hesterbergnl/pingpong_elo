import { useSelector, useDispatch } from 'react-redux'
import { setPlayer } from '../reducers/selectedPlayerReducer'
import { deletePlayer } from '../reducers/playerReducer'
import { deleteMatch } from '../reducers/matchReducer'
import PlayerForm from './PlayerForm'
import Player from './Player'

const scrollStyle = {
  width: '400px',
  height: '400px',
  overflow: 'scroll'
}

const Players = () => {
  const dispatch = useDispatch()

  const players = useSelector(state => state.players)
  const user = useSelector(state => state.loginUser)
  const matches = useSelector(state => state.matches)

  var config = null

  if(user !== null) {
    config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }
  }

  const delFunc = (id) => {
    dispatch(deletePlayer(id, config))

    for (const match of matches) {
      if(match.p1.id === id || match.p2.id === id) {
        dispatch(deleteMatch(id, config))
      }
    }
  }

  return (
    <>
      <h3>Players</h3>

      <PlayerForm />
      
      <div style={scrollStyle}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Elo</th>
            </tr>
              {players.map(player => 
                <Player key={player.id} n={player.name} elo={player.elo} clickedPlayerName={() => dispatch(setPlayer(player))} delFunc={() => delFunc(player.id)} />
              )}
          </thead>
        </table>
      </div>
    </>
  )
}

export default Players