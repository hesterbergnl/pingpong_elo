import { useState, useEffect } from 'react'
import Match from './components/Match'
import Player from './components/Player'
import MatchForm from './components/MatchForm'
import PlayerForm from './components/PlayerForm'
import eloService from './services/elo'
import playerService from './services/player'
import matchService from './services/match'
import Graph from './components/Graph'


const App = () => {
  const [matches, setMatches] = useState([])
  const [players, setPlayers] = useState([])
  const [eloArray, setEloArray] = useState([])
  const [p1, setp1] = useState('')
  const [p2, setp2] = useState('')
  const [p1score, setp1score] = useState(0)
  const [p2score, setp2score] = useState(0)
  const [name, setName] = useState('')
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  const matchHook = () => {
    matchService
      .getAll()
      .then(data => {
        setMatches(data.sort(compareDates))
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  useEffect(matchHook, [])

  const playerHook = () => {
    playerService
      .getAll()
      .then(data => {
        setPlayers(data.sort(compareElo))
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  useEffect(playerHook, [])

  const eloHook = () => {
    eloService
      .getAll()
      .then(data => {
        setEloArray(data)
      })
      .catch((error) => {
        console.log(error.message)
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

  const addMatch = async (event) => {
    event.preventDefault()

    console.log(`p1: ${p1}`)
    console.log(`p2: ${p2}`)

    let p1obj = players.find((player) => player.name === p1)

    if (typeof p1obj === undefined) {
      console.log('p1 not found')
      return
    }

    let p2obj = players.find((player) => player.name === p2)

    if (typeof p2obj === undefined) {
      console.log('p2 not found')
      return
    }
    
    let matchDate = Date()

    console.log(players)
    console.log(`p1 obj: ${p1obj}, p2 obj: ${p2obj}`)

    let updated_elo = calc_elo(p1obj.elo, p2obj.elo, Number(p1score), Number(p2score))

    let newMatchObj = {
      date: matchDate,
      p1: p1obj.id,
      p2: p2obj.id,
      s1: parseInt(p1score),
      s2: parseInt(p2score),
      elo1: updated_elo.p1_updated_elo,
      elo2: updated_elo.p2_updated_elo,
    }

    const retMatchObj = await matchService.create(newMatchObj)

    setp1score('')
    setp2score('')

    setMatches(matches.concat(retMatchObj).sort(compareDates))

    const elo1Object = {
      player: p1obj.id,
      match: retMatchObj.id,
      elo: updated_elo.p1_updated_elo
    }

    const elo2Object = {
      player: p2obj.id,
      match: retMatchObj.id,
      elo: updated_elo.p2_updated_elo
    }

    const newElo1Obj = await eloService.create(elo1Object)
    const newElo2Obj = await eloService.create(elo2Object)

    const newEloObjs = [newElo1Obj, newElo2Obj]

    setEloArray((eloArray) => [...eloArray, ...newEloObjs])

    const p1UpdateObject = {
      name: p1obj.name,
      elo: updated_elo.p1_updated_elo
    }

    const p2UpdateObject = {
      name: p2obj.name,
      elo: updated_elo.p2_updated_elo
    }

    const newPlayer1Obj = await playerService.update(p1obj.id, p1UpdateObject)
    const newPlayer2Obj = await  playerService.update(p2obj.id, p2UpdateObject)
    
    let newPArray = players.map(p => p.id !== newPlayer1Obj.id ? p : newPlayer1Obj).sort(compareElo)
    newPArray = newPArray.map(p => p.id !== newPlayer2Obj.id ? p : newPlayer2Obj).sort(compareElo)

    setPlayers(newPArray)
    console.log(eloArray)

  }

  const addPlayer = (event) => {
    event.preventDefault()

    const elo = 1200

    const playerObject = {
      name: name,
      elo: elo
    }

    playerService.
      create(playerObject)
      .then(newPlayerObj => {
        setPlayers(players.concat(newPlayerObj).sort(compareElo))
        setName('')

        const eloObject = {
          player: newPlayerObj.id,
          elo: 1200
        }

        eloService
          .create(eloObject)
          .then(newEloObj => {
            setEloArray(eloArray.concat(newEloObj))
          })
      })
  }

  const compareElo = (a, b) => {
    return b.elo - a.elo
  }

  const compareDates= (a, b) => {
    if(b.date < a.date) {
      return -1
    }
    return 1
  }

  const scrollStyle = {
    width: '400px',
    height: '400px',
    overflow: 'scroll'
  }

  const mainPageRender = () => {
    return(
      <>
        <h1>Matches</h1>
          <MatchForm p1={p1} updatep1={updatep1} p2={p2} updatep2={updatep2} p1score={p1score} updatep1score={updatep1score} p2score={p2score} updatep2score={updatep2score} addMatch={addMatch} players={players}/>
          
          <div style={scrollStyle}>
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
                <Match key={match.id} date={match.date} p1={match.p1.name} p2={match.p2.name} s1={match.s1} s2={match.s2} elo1={match.elo1} elo2={match.elo2}/>
              )}
              </thead>
            </table>
          </div>

          <h1>Players</h1>

          < PlayerForm addPlayer={addPlayer} name={name} updateName={updateName} />
          
          <div style={scrollStyle}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Elo</th>
                </tr>
                  {players.map(player => 
                    <Player key={player.id} n={player.name} elo={player.elo} clickedPlayerName={() => setSelectedPlayer(player)}/>
                  )}
              </thead>
            </table>
          </div>
        
        <button onClick={recalc_elo}>
            Run scores!
        </button>
      </>
    )
  }
  
  const graphStyle = {
    width: '800px',
    height: '400px'
  }

  const playerRender = () => {
    console.log(matches)
    console.log(eloArray)

    var playerMatches = matches.filter(m => m.p1.id === selectedPlayer.id || m.p2.id === selectedPlayer.id)
    var playerElos = eloArray.filter(e => e.player.id === selectedPlayer.id)

    return (
      <>
        <h1>Name: {selectedPlayer.name}</h1>
        <h2>Elo: {selectedPlayer.elo}</h2>
        <button onClick={() => {setSelectedPlayer(null)}}>Back to Overview</button>
        <h2>Matches:</h2>
        <div style={scrollStyle}>
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
            
              {playerMatches.map(match =>
                <Match key={match.id} date={match.date} p1={match.p1.name} p2={match.p2.name} s1={match.s1} s2={match.s2} elo1={match.elo1} elo2={match.elo2}/>
              )}
              </thead>
            </table>
          </div>
        
        <h2>Elo History:</h2>
        <div style={graphStyle}>
          <Graph playerElos={playerElos} />
        </div>
      </>
    )
  }

  return (
    <>
      {selectedPlayer === null ? mainPageRender() : playerRender()}
    </>
  )
}

export default App
