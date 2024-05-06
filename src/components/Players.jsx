import { useSelector, useDispatch } from 'react-redux'
import { setPlayer } from '../reducers/selectedPlayerReducer'

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
  const loginPlayer = useSelector(state => state.loginPlayer)

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
                <Player key={player.id} n={player.name} elo={player.elo} clickedPlayerName={() => dispatch(setPlayer(player))}/>
              )}
          </thead>
        </table>
      </div>
    </>
  )
}

export default Players