import { useSelector } from 'react-redux'
import { setStatusMessage, clearStatusMessage } from '../reducers/statusMessageReducer'
import store from '../store'


export const compareElo = (a, b) => {
  return b.elo - a.elo
}

export const compareDatesRev = (a, b) => {
  if(b.date < a.date) {
    return -1
  }
  return 1
}

export const compareDates = (a, b) => {
  if(b.date > a.date) {
    return 1
  }
  return -1
}

const probability_of_win = (r1, r2) => {
  return (1.0 / (1.0 + Math.pow(10, ((r2 - r1) / 400))))
}

const  elo_update= (rating, actual, probability) => {
  // let total_score = actual + opponent
  // let expected = probability * total_score
  const k = 30
  
  return rating + (k * (actual - probability))
}

export const get_player_elos_from_matches = () => {
  var matches = useSelector(state => state.matches)

  const p1_elos = matches.map(match => ({['date']:match.date, ['p']:match.p1, ['elo']:match.elo1, ['match_id']:match.id}))

  const p2_elos = matches.map(match => ({['date']:match.date, ['p']:match.p2, ['elo']:match.elo2, ['match_id']:match.id}))

  const elo_array = p1_elos.concat(p2_elos).sort(compareDatesRev)

  return elo_array
}

const elo_update_weighted = (elo, max_score, min_score, actual, probability) => {
  const k = 60
  const scale_factor = 1 - (min_score / max_score)
  console.log(`elo ${elo}, max_score ${max_score}, min_score ${min_score}, actual ${actual}, probability ${probability}`)

  return elo + (k * (scale_factor * (actual - probability)))
}

export const calc_elo = (p1elo, p2elo, p1s, p2s) => {
  let actual_p1 = p1s > p2s ? 1.0 : 0.0
  let actual_p2 = Math.abs(1 - actual_p1)
  const max_score = Math.max(p1s, p2s)
  const min_score = Math.min(p1s, p2s)

  console.log(max_score, min_score)

  let prob = probability_of_win(p1elo, p2elo)
  const p1_new_elo = elo_update_weighted(p1elo, max_score, min_score, actual_p1, prob)
  const p2_new_elo = elo_update_weighted(p2elo, max_score, min_score, actual_p2, 1.0 - prob)
  
  /*   
  p1_new_elo = elo_update(p1elo, actual_p1, prob)
  p2_new_elo = elo_update(p2elo, actual_p2, 1.0 - prob) 
  */
  
  return {
    p1_updated_elo: p1_new_elo,
    p2_updated_elo: p2_new_elo
  }
}

export const setStatusMessageState = (message, error) => {
  store.dispatch(setStatusMessage({message:message, error:error}))
  setTimeout(() => {
    store.dispatch(clearStatusMessage()) 
  }, 2500)
}

export const validateMatchInfo = (p1, p2, s1, s2) => {
  if (p1 === p2) {
    setStatusMessageState('player 1 and player 2 must be unique', true)
    return false
  }
  if (s1 < 11 && s2 < 11) {
    setStatusMessageState('invalid score', true)
    return false
  }
  else if (Math.abs(s2 - s1) < 2) {
    setStatusMessageState('invalid score', true)
    return false
  }
  else {
    return true
  }
}