import { useSelector } from 'react-redux'

import PlayerForm from './PlayerForm'
import Player from './Player'

const scrollStyle = {
  width: '400px',
  height: '400px',
  overflow: 'scroll'
}

const Players = () => {
  const state_players = useSelector(state => state.players)

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
              {state_players.map(player => 
                <Player key={player.id} n={player.name} elo={player.elo} clickedPlayerName={() => setSelectedPlayer(player)}/>
              )}
          </thead>
        </table>
      </div>
    </>
  )
}

export default Players