import { calc_elo } from '../util/helpers'

import OptionSelect from './OptionSelect'
import { useDispatch, useSelector } from 'react-redux'
import { createMatch } from '../reducers/matchReducer'
import { updateplayer } from '../reducers/playerReducer'

const MatchForm = (props) => {
  const dispatch = useDispatch()
  const state_players = useSelector(state => state.players)

  const addMatch = async (event) => {
    event.preventDefault()

    let p1 = event.target.player1.value
    let p2 = event.target.player2.value

    console.log(`p1: ${p1}`)
    console.log(`p2: ${p2}`)

    let p1obj = state_players.find((player) => player.name === p1)

    if (typeof p1obj === undefined) {
      console.log('p1 not found')
      return
    }

    let p2obj = state_players.find((player) => player.name === p2)

    if (typeof p2obj === undefined) {
      console.log('p2 not found')
      return
    }
    
    let p1score = parseInt(event.target.p1score.value)
    let p2score = parseInt(event.target.p2score.value)
    let matchDate = Date()

    console.log(JSON.stringify(state_players))
    console.log(`p1 obj: ${p1obj}, p2 obj: ${p2obj}`)

    let updated_elo = calc_elo(p1obj.elo, p2obj.elo, p1score, p2score)

    let newMatchObj = {
      date: matchDate,
      p1: p1obj.id,
      p2: p2obj.id,
      s1: p1score,
      s2: p2score,
      elo1: updated_elo.p1_updated_elo,
      elo2: updated_elo.p2_updated_elo,
    }

    dispatch(createMatch(newMatchObj))

    event.target.p1score.value = ''
    event.target.p2score.value = ''

    const p1UpdateObject = {
      name: p1obj.name,
      elo: updated_elo.p1_updated_elo
    }

    const p2UpdateObject = {
      name: p2obj.name,
      elo: updated_elo.p2_updated_elo
    }

   dispatch(updateplayer(p1obj.id, p1UpdateObject))
   dispatch(updateplayer(p2obj.id, p2UpdateObject))
  }
  
  return (
    <form onSubmit={addMatch}>
      <table>
        <tbody>
          <tr>
            <td>Player 1</td>
            <td>Player 2</td>
            <td>Player 1 Score</td>
            <td>Player 2 Score</td>
            <td></td>
          </tr>
          <tr>
            <td>
              <select name='player1'>
                <option>Player 1</option>
                {state_players.map(player =>
                  <OptionSelect key={player.id} name={player.name} />
                )}
              </select>
            </td>
            <td>
              <select name='player2'>
                <option>Player 2</option>
                {state_players.map(player =>
                  <OptionSelect key={player.id} name={player.name} />
                )}
              </select>
            </td>
            <td><input name='p1score'/></td>
            <td><input name='p2score'/></td>
            <td><button type='submit'> Add </button></td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default MatchForm
