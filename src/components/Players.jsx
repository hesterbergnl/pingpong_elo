import { useSelector, useDispatch } from 'react-redux'
import { deletePlayer } from '../reducers/playerReducer'
import { deleteMatch } from '../reducers/matchReducer'
import PlayerForm from './PlayerForm'
import Player from './Player'

const scrollStyle = {
  width: '400px',
  height: '400px',
  overflow: 'scroll'
}

const Players = ({ user, qty }) => {
  const dispatch = useDispatch()

  var players = useSelector(state => state.players)
  const matches = useSelector(state => state.matches)
  console.log(players)

  var config = null

  if(user !== null) {
    config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }
  }

  if(qty > 0) {
    players = players.slice(0, qty)
  } 

  const delFunc = (id) => {
    for (const match of matches) {
      if(match.p1.id === id || match.p2.id === id) {
        dispatch(deleteMatch(match.id, config))
      }
    }

    dispatch(deletePlayer(id, config))
  }

  return (
    <>
      <h3>Players</h3>

      <div style={scrollStyle}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Elo</th>
            </tr>
              {players.map(player => 
                <Player key={player.id} user={user} id={player.id} n={player.name} elo={player.elo} clickedPlayerName={() => dispatch(setPlayer(player))} delFunc={() => delFunc(player.id)} />
              )}
          </thead>
        </table>
      </div>
    </>
  )
}

export default Players