import { useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import PlaytimeGraph from './PlaytimeGraph'
import VisualElosGraph from './VisualElosGraph'
import { getPlayerElos, scoreStats } from '../util/helpers'

const Statistics = () => {
  const matches = useSelector(state => state.matches)
  const players = useSelector(state => state.players)
  var playerElos = getPlayerElos(matches, players) 
  const playHours = matches.map((match) => new Date(match.date).getHours())
  const stats = scoreStats(matches)

  var playTimes = [];

  for (var i = 0; i <= 23; i++) {
    playTimes.push({
      hour:i,
      count:0
    });
  }

  playHours.forEach((hour) => {
    playTimes[hour].count++
  })

  return(
    <>
      <Row>
        <Col lg={4} style={{'padding-top':'25px'}}>
          <h4>Average winning score: {stats.avgMax.toFixed(1)}</h4>
        </Col>
        <Col lg={4} style={{'padding-top':'25px'}}>
          <h4>Average losing score: {stats.avgMin.toFixed(1)}</h4>
        </Col>
        <Col lg={4} style={{'padding-top':'25px'}}>
          <h4>Highest winning score: {stats.highestScore}</h4>
        </Col>
      </Row>
      <Row>
        <Col lg={12} style={{'padding-top':'25px'}}>
          <VisualElosGraph playerElos={playerElos}/>
        </Col>
      </Row>
      <Row>
        <Col lg={12} style={{'padding-top':'25px'}}>
          <PlaytimeGraph playTimes={playTimes}/>
        </Col>
      </Row>
      
    </>
  )
}

export default Statistics