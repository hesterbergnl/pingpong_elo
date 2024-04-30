import MatchForm from './PlayerForm'
import Match from './Match'

import { useSelector, useDispatch } from 'react-redux'

const scrollStyle = {
  width: '400px',
  height: '400px',
  overflow: 'scroll'
}

const Matches = () => {
  const dispatch = useDispatch()

  const state_matches = useSelector(state => state.matches)

  return (
    <>
      <h1>Matches</h1>
      
      {/*<MatchForm /> */}

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
        
          {state_matches.map(match =>
            <Match key={match.id} date={match.date} p1={match.p1.name} p2={match.p2.name} s1={match.s1} s2={match.s2} elo1={match.elo1} elo2={match.elo2}/>
          )}
          </thead>
        </table>
      </div>
    </>
  )
}

export default Matches