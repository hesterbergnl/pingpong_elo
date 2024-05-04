import Matches from './Matches'
import Graph from './Graph'
import { get_player_elos_from_matches, compareDates } from '../util/helpers'
import { clearPlayer } from '../reducers/selectedPlayerReducer'

import { useSelector, useDispatch } from 'react-redux'

const graphStyle = {
  width: '800px',
  height: '400px'
}

const PlayerDetail = () => {
  const selectedPlayer = useSelector(state => state.selectedPlayer)
  const dispatch = useDispatch()

  const elos = get_player_elos_from_matches()

  var playerElos = elos.filter(elo => elo.p.id === selectedPlayer.id)
  const initialElo = {
    p: selectedPlayer,
    elo: 1200
  }
  playerElos = playerElos.concat(initialElo)

  return (
    <>
      <h1>{selectedPlayer.name}</h1>
      <h2>Elo: {selectedPlayer.elo.toFixed(1)}</h2>
      <h2>Number of Matches: {playerElos.length}</h2>

      <Matches />

      <h1>Elo History</h1>
      <div style={graphStyle}>
        <Graph playerElos={playerElos.reverse()} />
      </div>
      <button onClick={() => dispatch(clearPlayer())}>Back</button>
    </>
  )
}

export default PlayerDetail