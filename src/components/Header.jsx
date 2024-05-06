import { useSelector, useDispatch } from 'react-redux'
import { setPlayer } from '../reducers/selectedPlayerReducer'

const Header = () => {
  const players = useSelector(state => state.players)
  const dispatch = useDispatch()
  const topPlayer = players[0]

  if (topPlayer !== undefined) {
    return (
      <>
        <h1>Best player in the office: <a onClick={() => dispatch(setPlayer(topPlayer))}>{topPlayer.name}</a></h1>
        <h1>Elo: {Math.round(topPlayer.elo)}</h1>
      </>
    )}
  else {
    return null
  }
}

export default Header