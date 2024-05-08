import MatchForm from './MatchForm'
import Match from './Match'
import { deleteMatch } from '../reducers/matchReducer'

import { useSelector, useDispatch } from 'react-redux'

const scrollStyle = {
  width: '400px',
  height: '400px',
  overflow: 'scroll'
}

const Matches = () => {
  const dispatch = useDispatch()
  var matches = useSelector(state => state.matches)
  const user = useSelector(state => state.loginUser)
  const selectedPlayer = useSelector(state => state.selectedPlayer)

  var config = null

  if(user !== null) {
    config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }
  }

  console.log(config)

  if(selectedPlayer !== null) {
    matches = matches.filter(match => {
      return match.p1.id === selectedPlayer.id || match.p2.id === selectedPlayer.id
    })
  }

  return (
    <>
      <h3>Matches</h3>
      
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
            <Match key={match.id} date={match.date} p1={match.p1.name} p2={match.p2.name} s1={match.s1} s2={match.s2} elo1={match.elo1} elo2={match.elo2} delFunc={() => dispatch(deleteMatch(match.id, config))}/>
          )}
          </thead>
        </table>
      </div>
    </>
  )
}

export default Matches