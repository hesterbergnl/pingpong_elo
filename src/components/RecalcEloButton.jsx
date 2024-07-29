import { calc_elo, setStatusMessageState } from '../util/helpers'

import { useSelector, useDispatch } from 'react-redux'
import { updatePlayer } from '../reducers/playerReducer'
import { updateMatch } from '../reducers/matchReducer'

export const recalcElo = (dispatch, matches, players) => {
  for (const player of players) {
    players = players.map(p => p.id === player.id ? {...p, elo:1200 } : p)
  }

  for (const match of matches) {
    const p1 = players.find(p => p.id === match.p1.id) 
    const p2 = players.find(p => p.id === match.p2.id) 
    
    const updated_elo = calc_elo(p1.elo, p2.elo, match.s1, match.s2)

    const newMatchObj = {
      date: match.date,
      p1: p1.id,
      p2: p2.id,
      s1: match.s1,
      s2: match.s2,
      elo1: updated_elo.p1_updated_elo,
      elo2: updated_elo.p2_updated_elo,
    }

    const id = match.id
    console.log(newMatchObj)

    dispatch(updateMatch(id, newMatchObj))
  }

  setStatusMessageState(`recalc in progress... please be patient`, false)
}

const RecalcEloButton = () => {
  const dispatch = useDispatch()
  let matches = useSelector(state => state.matches)
  let players = useSelector(state => state.players)
  matches = [...matches].reverse()

  return(
    <div>
      <button onClick={() => recalcElo(dispatch, matches, players)}>Recalculate Elo Scores</button>
    </div>
  )
}

export default RecalcEloButton