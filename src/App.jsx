import { useState, useEffect } from 'react'
import Match from './components/Match'
import Player from './components/Player'
import MatchForm from './components/MatchForm'
import PlayerForm from './components/PlayerForm'
import eloService from './services/elo'
import playerService from './services/player'
import matchService from './services/match'
import Graph from './components/Graph'
import PlayerDetail from './components/PlayerDetail'
import MainPage from './components/MainPage'

import { initializePlayers } from './reducers/playerReducer'
import { initializeMatches } from './reducers/matchReducer'
import { useDispatch, useSelector } from 'react-redux'


const App = () => {
  const selectedPlayer = useSelector(state => state.selectedPlayer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeMatches())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializePlayers())
  }, [dispatch])

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

  const mainPageRender = () => { 
    return(
      <>
        <button onClick={recalc_elo}>
            Run scores!
        </button>
        
        <MainPage />
      </>
    )
  }
  
  const graphStyle = {
    width: '800px',
    height: '400px'
  }

  const playerRender = () => {
    return (
      <>
        <PlayerDetail />
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
