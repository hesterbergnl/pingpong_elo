import { useDispatch, useSelector } from 'react-redux'
import { createPlayer } from '../reducers/playerReducer'

import { Form, Button } from 'react-bootstrap'

const PlayerForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.loginUser)

  const addPlayer = async (event) => {
    event.preventDefault()
    
    const elo = 1200

    const name = event.target.name.value
    const photo = event.target.photo.files[0]
    console.log(photo)

    const config = {
      headers: { 
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data'
      },
    }

    event.target.name.value = ''
    event.target.photo.value = ''
  
    let newPlayer = {
      photo: photo,
      name: name,
      elo: elo
    }
    
    dispatch(createPlayer(newPlayer, config))
  }
  
  if (user === null) {
    return null
  }
  else {
    return (
      <>
        <h3>Add New Player</h3>

        <Form onSubmit={addPlayer}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control name='name' type='text' />
          </Form.Group>
          <Form.Group>
            <Form.Label>Photo</Form.Label>
            <Form.Control type="file" name='photo' />
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
}

export default PlayerForm
