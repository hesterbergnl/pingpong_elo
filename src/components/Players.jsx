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

  const state_players = useSelector(state => state.players)

  const sorted_players = [...state_players]

  return (
    <>
      <h1>Players</h1>

      <PlayerForm />
      
      <div style={scrollStyle}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Elo</th>
            </tr>
              {sorted_players.map(player => 
                <Player key={player.id} n={player.name} elo={player.elo} clickedPlayerName={() => dispatch(setPlayer(player.id))}/>
              )}
          </thead>
        </table>
      </div>
    </>
  )
}

export default Players