import { calc_elo, setStatusMessageState } from '../util/helpers'

import OptionSelect from './OptionSelect'
import { useDispatch, useSelector } from 'react-redux'
import { createMatch } from '../reducers/matchReducer'
import { updatePlayer } from '../reducers/playerReducer'

import { Form, Button } from 'react-bootstrap'

const MatchForm = (props) => {
  const dispatch = useDispatch()
  const state_players = useSelector(state => state.players)

  const dropDownStyle = {
    'height': '300px',
    'overflow-y': 'scroll'
  }

  const addMatch = async (event) => {
    try {
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

    dispatch(updatePlayer(p1obj.id, p1UpdateObject))
    dispatch(updatePlayer(p2obj.id, p2UpdateObject))
    } catch (error) {
      setStatusMessageState(error.message , true)
    }
  }
  
  return (
    <>
      <h3>Enter new match</h3>
      <Form onSubmit={addMatch}>
        <Form.Group className = 'mb-3' controlId='formBasicPlayer1'>
          <Form.Label>Player 1</Form.Label>
          <Form.Select name='player1'>
            <option>Player 1</option>
            {state_players.map(player =>
              <OptionSelect key={player.id} name={player.name} />
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Player 2</Form.Label>
          <Form.Select name='player2'>
            <option>Player 2</option>
            {state_players.map(player =>
              <OptionSelect key={player.id} name={player.name} />
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Score Player 1</Form.Label>
          <Form.Control name='p1score' type='number' />
        </Form.Group>
        <Form.Group>
          <Form.Label>Score Player 2</Form.Label>
          <Form.Control name='p2score' type='number' />
        </Form.Group>
        <Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default MatchForm
