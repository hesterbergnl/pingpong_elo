import { useState, useEffect } from 'react'
import Match from './components/Match'
import Player from './components/Player'
import MatchForm from './components/MatchForm'
import PlayerForm from './components/PlayerForm'
import axios from 'axios'


const App = () => {
  const [matches, setMatches] = useState([])
  const [players, setPlayers] = useState([])
  const [eloArray, setEloArray] = useState([])
  const [p1, setp1] = useState('')
  const [p2, setp2] = useState('')
  const [p1score, setp1score] = useState(0)
  const [p2score, setp2score] = useState(0)
  const [name, setName] = useState('')

  const matchHook = () => {
    axios
      .get('http://localhost:3001/api/match')
      .then(response => {
        setMatches(response.data)
      })
  }

  useEffect(matchHook, [])

  const playerHook = () => {
    axios
      .get('http://localhost:3001/api/player')
      .then(response => {
        setPlayers(response.data)
      })
  }

  useEffect(playerHook, [])

  const eloHook = () => {
    axios
      .get('http://localhost:3001/api/elo')
      .then(response => {
        setEloArray(response.data)
      })
  }

  useEffect(eloHook, [])

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

  const updateName = (event) => {
    setName(event.target.value)
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

  const addMatch = (event) => {
    event.preventDefault()

    let p1obj = players.find((player) => player.name == p1)

    if (typeof p1obj === undefined) {
      console.log('p1 not found')
      return
    }

    let p2obj = players.find((player) => player.name == p2)

    if (typeof p2obj === undefined) {
      console.log('p2 not found')
      return
    }
    
    let matchDate = Date()

    let updated_elo = calc_elo(p1obj.elo, p2obj.elo, Number(p1score), Number(p2score))

    console.log(updated_elo)
    console.log(matches)

    let newMatchObj = {
      date: matchDate,
      p1: p1obj.id,
      p2: p2obj.id,
      s1: parseInt(p1score),
      s2: parseInt(p2score),
      elo1: updated_elo.p1_updated_elo,
      elo2: updated_elo.p2_updated_elo,
    }

    axios
      .post('http://localhost:3001/api/match', newMatchObj)
      .then(response => {
        setMatches(matches.concat(response.data))
        setp1('')
        setp2('')
        setp1score('')
        setp2score('')

        const elo1Object = {
          player: p1obj.id,
          match: response.data.id,
          elo: updated_elo.p1_updated_elo
        }

        const elo2Object = {
          player: p2obj.id,
          match: response.data.id,
          elo: updated_elo.p2_updated_elo
        }

        axios
          .post('http://localhost:3001/api/elo', elo1Object)
          .then(response => {
            setEloArray(eloArray.concat(response.data))
          })
        
        axios
          .post('http://localhost:3001/api/elo', elo2Object)
          .then(response => {
            setEloArray(eloArray.concat(response.data))
          })

        const p1UpdateObject = {
          player: p1obj.id,
          elo: updated_elo.p1_updated_elo
        }

        const p2UpdateObject = {
          player: p2obj.id,
          elo: updated_elo.p2_updated_elo
        }

        axios
          .put(`http://localhost:3001/api/player/${p1obj.id}`, p1UpdateObject)
          .then(response => {
            setPlayers(players.map(p => p.id !== p1obj.id ? p : response.data))
          })

        axios
          .put(`http://localhost:3001/api/player/${p2obj.id}`, p2UpdateObject)
          .then(response => {
            setPlayers(players.map(p => p.id !== p2obj.id ? p : response.data))
          })
      })

    console.log(matches)
  }

  const addPlayer = (event) => {
    event.preventDefault()

    const elo = 1200

    const playerObject = {
      name: name,
      elo: elo
    }

    axios
      .post('http://localhost:3001/api/player/', playerObject)
      .then(response => {
        setPlayers(players.concat(response.data))
        setName('')

        const eloObject = {
          player: response.data.id,
          elo: 1200
        }

        axios
          .post('http://localhost:3001/api/elo', eloObject)
          .then(response => {
            setEloArray(eloArray.concat(response.data))
          })
      })
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
          <Match date={match.date} p1={match.p1.name} p2={match.p2.name} s1={match.s1} s2={match.s2} elo1={match.elo1} elo2={match.elo2}/>
        )}
        </thead>
      </table>

      <h1>Players</h1>

      < PlayerForm addPlayer={addPlayer} name={name} updateName={updateName} />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Elo</th>
          </tr>
            {players.map(player => 
              <Player n={player.name} elo={player.elo} />
            )}
        </thead>
      </table>
    
    <button onClick={recalc_elo}>
        Run scores!
    </button> 

    </>
  )
}

export default App
