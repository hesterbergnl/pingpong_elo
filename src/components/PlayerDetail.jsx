import Matches from './Matches'
import Graph from './Graph'
import { get_player_elos_from_matches, compareDates } from '../util/helpers'

import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

const graphStyle = {
  width: '800px',
  height: '400px'
}

const PlayerDetail = ({ selectedPlayer }) => {
  const dispatch = useDispatch()

  console.log(selectedPlayer)

  if(selectedPlayer === null || selectedPlayer === undefined) {
    return (
      <Navigate replace to='/'/>
    )
  }

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
      <h2>Elo: {Math.round(selectedPlayer.elo)}</h2>
      <h2>Number of Matches: {playerElos.length - 1}</h2>

      <Matches selectedPlayer={selectedPlayer}/>

      <h1>Elo History</h1>
      <div style={graphStyle}>
        <Graph playerElos={playerElos.reverse()} />
      </div>
      <button onClick={() => dispatch(clearPlayer())}>Back</button>
    </>
  )
}

export default PlayerDetail