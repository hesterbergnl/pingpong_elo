import MatchForm from './MatchForm'
import Matches from './Matches'
import Players from './Players'
import LoginForm from './LoginForm'
import LogoutButton from './LogoutButton'
import Header from './Header'
import RecalcEloButton from './RecalcEloButton'

import { useSelector } from 'react-redux'
import {Row, Col } from 'react-bootstrap'

const MainPage = ({selectedPlayer}) => {
  const loginUser = useSelector(state => state.loginUser)

  return (
    <>
      <Row>
        <Col lg={6}>
          <Header />
        </Col>
        <Col lg={6}>
          <MatchForm />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Players user={null} qty={5}/>
        </Col>
        <Col lg={6}>
          <Matches selectedPlayer={selectedPlayer} user={null} qty={5}/>
        </Col>
      </Row>
    </>
  )
}

export default MainPage