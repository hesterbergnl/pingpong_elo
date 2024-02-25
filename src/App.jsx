import { useState, useEffect } from 'react'
import Match from './components/Match'
import Player from './components/Player'
import MatchForm from './components/MatchForm'

const App = () => {
  const [matches, setMatches] = useState([])
  const [players, setPlayers] = useState([])
  const [p1, setp1] = useState('')
  const [p2, setp2] = useState('')
  const [p1score, setp1score] = useState(0)
  const [p2score, setp2score] = useState(0)

  let init_matches = [
    {date: 'February 22, 2024 15:30:00', p1:'nh', p2:'pc', s1:10, s2:12, elo1:0, elo2:0},
    {date: 'February 22, 2024 15:35:00', p1:'nh', p2:'pc', s1:16, s2:14, elo1:0, elo2:0},
    {date: 'February 22, 2024 15:40:00', p1:'nh', p2:'pc', s1:11, s2:6, elo1:0, elo2:0},
    {date: 'February 22, 2024 15:50:00', p1:'nh', p2:'pc', s1:11, s2:8, elo1:0, elo2:0},
    {date: 'February 22, 2024 16:30:00', p1:'nh', p2:'pc', s1:8, s2:11, elo1:0, elo2:0},
    {date: 'February 22, 2024 16:35:00', p1:'nh', p2:'pc', s1:11, s2:4, elo1:0, elo2:0},
    {date: 'February 22, 2024 16:40:00', p1:'nh', p2:'pc', s1:11, s2:9, elo1:0, elo2:0},
    {date: 'February 22, 2024 16:50:00', p1:'nh', p2:'pc', s1:8, s2:11, elo1:0, elo2:0},
    {date: 'February 22, 2024 16:55:00', p1:'rh', p2:'pc', s1:7, s2:11, elo1:0, elo2:0},
    {date: 'February 22, 2024 17:05:00', p1:'rh', p2:'nh', s1:9, s2:11, elo1:0, elo2:0},
    {date: 'February 22, 2024 17:15:00', p1:'nh', p2:'pc', s1:10, s2:12, elo1:0, elo2:0},
    {date: 'February 22, 2024 17:25:00', p1:'nh', p2:'jg', s1:11, s2:7, elo1:0, elo2:0},
    {date: 'February 22, 2024 17:38:00', p1:'jg', p2:'pc', s1:11, s2:7, elo1:0, elo2:0},
    {date: 'February 23, 2024 15:30:00', p1:'jg', p2:'rh', s1:11, s2:9, elo1:0, elo2:0},
    {date: 'February 23, 2024 15:35:00', p1:'nh', p2:'pc', s1:11, s2:6, elo1:0, elo2:0},
    {date: 'February 23, 2024 15:40:00', p1:'nh', p2:'jg', s1:11, s2:4, elo1:0, elo2:0},
    {date: 'February 23, 2024 15:48:00', p1:'pc', p2:'jg', s1:11, s2:8, elo1:0, elo2:0},
    {date: 'February 23, 2024 15:53:00', p1:'nh', p2:'pc', s1:8, s2:11, elo1:0, elo2:0},
    {date: 'February 23, 2024 15:59:00', p1:'nh', p2:'pc', s1:9, s2:11, elo1:0, elo2:0},
    {date: 'February 23, 2024 16:10:00', p1:'nh', p2:'pc', s1:11, s2:9, elo1:0, elo2:0},
    {date: 'February 23, 2024 16:22:00', p1:'nh', p2:'zz', s1:11, s2:7, elo1:0, elo2:0},
    {date: 'February 23, 2024 16:30:00', p1:'pc', p2:'zz', s1:11, s2:9, elo1:0, elo2:0},
  ]

  let init_players = [
    {n:'nh', elo:1200},
    {n:'pc', elo:1200},
    {n:'rh', elo:1200},
    {n:'jg', elo:1200},
    {n:'zz', elo:1200},
  ]

  useEffect(() => {
    setMatches(init_matches)
  }, [])

  useEffect(() => {
    setPlayers(init_players)
  }, [])

  const updatep1 = (event) => {
    setp1(event.target.value)
  }

  const updatep2 = (event) => {
    setp2(event.target.value)
  }

  const updatep1score = (event) => {
    setp1score(event.target.value)
  }

  const updatep2score = (event) => {
    setp2score(event.target.value)
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

  const calc_elo = (p1elo, p2elo, p1s, p2s) => {
    let actual_p1 = p1s > p2s ? 1.0 : 0.0
    let actual_p2 = Math.abs(1 - actual_p1)

    let prob = probability_of_win(p1elo, p2elo)
    let p1_new_elo = elo_update(p1elo, actual_p1, prob)
    let p2_new_elo = elo_update(p2elo, actual_p2, 1.0 - prob)
    return {
      p1_updated_elo: p1_new_elo,
      p2_updated_elo: p2_new_elo
    }
  }

  const recalc_elo = () => {
    matches.forEach((match) => {
      let p1_index = players.findIndex((player) => player.n == match.p1)
      let p2_index = players.findIndex((player) => player.n == match.p2)

      let p1 = players[p1_index]
      let p2 = players[p2_index]

      let updated_elo = calc_elo(p1.elo, p2.elo, match.s1, match.s2)

      let p1_new_elo = updated_elo.p1_updated_elo
      let p2_new_elo = updated_elo.p2_updated_elo

      console.log(p1_new_elo, p2_new_elo)

      p1.elo = p1_new_elo
      p2.elo = p2_new_elo

      players[p1_index] = p1
      players[p2_index] = p2

      match.elo1 = p1_new_elo
      match.elo2 = p2_new_elo

      setPlayers([...players])
      setMatches([...matches])

      console.log(players)

      console.log(p1)
      console.log(p2)
    })

    console.log(players)
  }

  const addMatch = () => {
    let p1obj = players.find((player) => player.n == p1)
    if (typeof p1obj === undefined) {
      console.log('p1 not found')
    }

    let p2obj = players.find((player) => player.n == p2)

    if (typeof p2obj === undefined) {
      console.log('p2 not found')
    }
    
    let matchDate = Date()

    let updated_elo = calc_elo(p1obj.elo, p2obj.elo, p1score, p2score)

    console.log(updated_elo)
    
    let new_match = {
      date: matchDate,
      p1: p1,
      p2: p2,
      s1: p1score,
      s2: p2score,
      elo1: updated_elo.p1_updated_elo,
      elo2: updated_elo.p2_updated_elo,
    }

    console.log(new_match)

    let new_matches = [...matches]
    new_matches.push(new_match)

    setMatches([...new_matches])
  }

  return (
    <>
      <h1>Matches</h1>
      <MatchForm p1={p1} updatep1={updatep1} p2={p2} updatep2={updatep2} p1score={p1score} updatep1score={updatep1score} p2score={p2score} updatep2score={updatep2score} addMatch={addMatch}/>
      
      <table>
        <thead>
        <tr>
          <th>Date</th>
          <th>P1</th>
          <th>P2</th>
          <th>S1</th>
          <th>S2</th>
          <th>ELO1</th>
          <th>ELO2</th>
        </tr>
        {matches.map(match =>
          <Match date={match.date} p1={match.p1} p2={match.p2} s1={match.s1} s2={match.s2} elo1={match.elo1} elo2={match.elo2}/>
        )}
        </thead>
      </table>

      <h1>Players</h1>

      {players.map(player => 
        <Player n={player.n} elo={player.elo} />
      )}
    
    <button onClick={recalc_elo}>
        Run scores!
    </button> 

    </>
  )
}

export default App
