import Match from './Match'
import { deleteMatch } from '../reducers/matchReducer'
import { Table } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'

const Matches = ({user, selectedPlayer, qty}) => {
  const dispatch = useDispatch()
  var matches = useSelector(state => state.matches)
  var headerText = 'All Matches'
  var config = null

  if(user !== null) {
    //console.log('user !== null, user object:', user)
    config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }
  }

  //console.log(config)

  //console.log('Selected player: ', selectedPlayer)

  if(selectedPlayer !== null) {
    matches = matches.filter(match => {
      return match.p1.id === selectedPlayer.id || match.p2.id === selectedPlayer.id
    })
  }

  if(qty > 0) {
    matches = matches.slice(0, qty)
    headerText = `Most Recent ${qty} Matches`
  }

  return (
    <>
      <h3>{headerText}</h3>
      
      <div>
        <Table striped bordered hover>
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
            <Match key={match.id} user={user} date={match.date} p1={match.p1.name} p2={match.p2.name} s1={match.s1} s2={match.s2} elo1={match.elo1} elo2={match.elo2} delFunc={() => dispatch(deleteMatch(match.id, config))}/>
          )}
          </thead>
        </Table>
      </div>
    </>
  )
}

export default Matches