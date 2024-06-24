import Matches from './Matches'
import Players from './Players'
import RecalcEloButton from './RecalcEloButton'
import PlayerForm from './PlayerForm'

import {Row, Col } from 'react-bootstrap'

const Admin = ({ user }) => {
  return (
    <>
       <Row>
        <Col lg={6} style={{'padding-top':'25px'}}>
          <PlayerForm />
        </Col>
        <Col lg={6} style={{'padding-top':'25px'}}>
          <RecalcEloButton />
        </Col>
      </Row>
      <Row>
        <Col lg={6} style={{'padding-top':'25px'}}>
          <Players user={user} qty={-1}/>
        </Col>
        <Col lg={6} style={{'padding-top':'25px'}}>
          <Matches user={user} selectedPlayer={null} qty={-1}/>
        </Col>
      </Row>
    </>
  )
}

export default Admin