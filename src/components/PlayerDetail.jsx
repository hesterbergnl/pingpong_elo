import Matches from './Matches'
import Graph from './Graph'
import { get_player_elos_from_matches, compareDates } from '../util/helpers'

import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import {Row, Col } from 'react-bootstrap'

const baseUrl = 'http://localhost:3001'

const imgStyle = {
  width: '300px',
}

const PlayerDetail = ({ user, selectedPlayer }) => {
  const players = useSelector(state => state.players)
  const rank = players.findIndex(player => player.id === selectedPlayer.id) + 1
  const playerCount = players.length

  console.log(selectedPlayer)

  if(selectedPlayer === null || selectedPlayer === undefined) {
    return (
      <Navigate replace to='/'/>
    )
  }

  const elos = get_player_elos_from_matches()
  console.log(`elos: ${JSON.stringify(elos)}`)

  var playerElos = elos.filter(elo => elo.p.id === selectedPlayer.id)
  const initialElo = {
    p: selectedPlayer,
    elo: 1200
  }
  playerElos = playerElos.concat(initialElo)

  return (
    <>
    <Row>
      <Col md={6}>
        <h1>{selectedPlayer.name}</h1>
        <img style={imgStyle} src={`${baseUrl}/${selectedPlayer.photo}`} alt='player photo' />
      </Col>
      <Col md={6}>
        <h2>Rank: {rank} of {playerCount}</h2>
        <h2>Elo: {Math.round(selectedPlayer.elo)}</h2>
        <h2>Match Count: {playerElos.length - 1}</h2>
      </Col>
    </Row>
    <Row>
        <h1>Elo History</h1>
        <Graph playerElos={playerElos.reverse()} />
    </Row>
    <Row>
      <Col>
        <Matches user={user} selectedPlayer={selectedPlayer} qty={-1}/>
      </Col>
    </Row>

     

      
    </>
  )
}

export default PlayerDetail