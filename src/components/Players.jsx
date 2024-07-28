import { useSelector, useDispatch } from 'react-redux'
import { deletePlayer } from '../reducers/playerReducer'
import { deleteMatch } from '../reducers/matchReducer'
import Player from './Player'
import { getCurrentPlayerElos, get_player_elos_from_matches } from '../util/helpers'
import { Table } from 'react-bootstrap'

const Players = ({ user, qty }) => {
  const dispatch = useDispatch()

  const matches = useSelector(state => state.matches)
  var players = getCurrentPlayerElos() //useSelector(state => state.players)

  console.log(players)
  var headerText = `All Players`

  var config = null

  if(user !== null) {
    config = {
      headers: { Authorization: `Bearer ${user.token}` },
    }
  }

  if(qty > 0) {
    players = players.slice(0, qty)
    headerText = `Top ${qty} Players`
  } 

  const delFunc = (id) => {
    for (const match of matches) {
      if(match.p1.id === id || match.p2.id === id) {
        dispatch(deleteMatch(match.id, config))
      }
    }

    dispatch(deletePlayer(id, config))
  }

  return (
    <>
      <h3>{headerText}</h3>

      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Elo</th>
            </tr>
              {players.map(player => 
                <Player key={player.id} user={user} id={player.id} n={player.name} elo={player.elo} delFunc={() => delFunc(player.id)} />
              )}
          </thead>
        </Table>
      </div>
    </>
  )
}

export default Players