import { useSelector } from 'react-redux'

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

export const calc_elo = (p1elo, p2elo, p1s, p2s) => {
  let actual_p1 = p1s > p2s ? 1.0 : 0.0
  let actual_p2 = Math.abs(1 - actual_p1)
  console.log(`P1 score: ${p1s}`)
  console.log(`P2 score: ${p2s}`)
  console.log(`P1 win? ${actual_p1}`)
  console.log(`P2 win? ${actual_p2}`)


  let prob = probability_of_win(p1elo, p2elo)
  console.log(`Probability of P1 to win: ${prob}`)
  let p1_new_elo = elo_update(p1elo, actual_p1, prob)
  console.log(`P1 initial elo: ${p1elo}`)
  console.log(`P1 updated elo: ${p1_new_elo}`)
  let p2_new_elo = elo_update(p2elo, actual_p2, 1.0 - prob)
  console.log(`P2 initial elo: ${p2elo}`)
  console.log(`P2 updated elo: ${p2_new_elo}`)
  
  return {
    p1_updated_elo: p1_new_elo,
    p2_updated_elo: p2_new_elo
  }
}

// Recalculates all the elo values. Need to redo this using the redux store / local state
export const recalcElo = () => {
  const recalc_elo = async () => {
    let allMatches = await matchService.getAll()

    eloService.deleteAll()

    for (const player of players) {
      
      const updatedPlayer = {
        name: player.name,
        elo: 1200
      }

      const newPlayerObj = await playerService.update(player.id, updatedPlayer)
    }

    const ps = await playerService.getAll()
    setPlayers(ps)

    for (const match of allMatches) {
      const allPlayers = await playerService.getAll()

      let p1 = allPlayers.find(p => p.id === match.p1.id) 
      let p2 = allPlayers.find(p => p.id === match.p2.id) 

      let updated_elo = calc_elo(p1.elo, p2.elo, match.s1, match.s2)

      let newMatchObj = {
        date: match.date,
        p1: p1.id,
        p2: p2.id,
        s1: match.score,
        s2: match.score,
        elo1: updated_elo.p1_updated_elo,
        elo2: updated_elo.p2_updated_elo,
      }

      const retMatchObj = await matchService.update(match.id, newMatchObj)

      const elo1Object = {
        player: p1.id,
        match: retMatchObj.id,
        elo: updated_elo.p1_updated_elo
      }
  
      const elo2Object = {
        player: p2.id,
        match: retMatchObj.id,
        elo: updated_elo.p2_updated_elo
      }
  
      const newElo1Obj = await eloService.create(elo1Object)
  
      const newElo2Obj = await eloService.create(elo2Object)
  
      const p1UpdateObject = {
        name: p1.name,
        elo: updated_elo.p1_updated_elo
      }
  
      const p2UpdateObject = {
        name: p2.name,
        elo: updated_elo.p2_updated_elo
      }
  
      const newPlayer1Obj = await playerService.update(p1.id, p1UpdateObject)
      const newPlayer2Obj = await playerService.update(p2.id, p2UpdateObject)
      
      console.log(players)
    }

    allMatches = await matchService.getAll()
    const allPlayers = await playerService.getAll()
    const allElo = await eloService.getAll()

    setMatches(allMatches.sort(compareDates))
    setPlayers(allPlayers.sort(compareElo))
    setEloArray(allElo)
  }
}