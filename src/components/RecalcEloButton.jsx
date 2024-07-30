import { calc_elo, setStatusMessageState, getPlayerElosFromArray} from '../util/helpers'

import { useSelector, useDispatch } from 'react-redux'
import { updatePlayer } from '../reducers/playerReducer'
import { updateMatch } from '../reducers/matchReducer'

export const recalcElo = (dispatch, matches, players) => {
  var tempMatches = []

  for (const match of matches) {
    const playerElos = getPlayerElosFromArray(tempMatches, players)
    console.log(`playerElos recalc func: ${JSON.stringify(playerElos)}`)
    const p1 = players.find(p => p.id === match.p1.id) 
    const p2 = players.find(p => p.id === match.p2.id) 

    var p1elo = 1200
    var p2elo = 1200

    let p1EloObj = playerElos.find((elo) => elo.name === p1)
    let p2EloObj = playerElos.find((elo) => elo.name === p2)

    console.log(`p1EloObj ${JSON.stringify(p1EloObj)}`)
    console.log(`p2EloObj ${JSON.stringify(p2EloObj)}`)
    console.log(`${typeof p1EloObj !== 'undefined'}`)

    if (typeof p1EloObj !== 'undefined') {
      p1elo = p1EloObj.elo
    }
    if (typeof p2EloObj !== 'undefined') {
      p2elo = p2EloObj.elo
    }

    const updated_elo = calc_elo(p1elo, p2elo, match.s1, match.s2)

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

    tempMatches.push(newMatchObj)
    console.log(`temp matches: ${JSON.stringify(tempMatches)}`)
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