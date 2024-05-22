import { useSelector, useDispatch } from 'react-redux'

const baseUrl = 'http://localhost:3001'

const imgStyle = {
  width: '300px',
}

const Header = () => {
  const players = useSelector(state => state.players)
  const dispatch = useDispatch()
  const topPlayer = players[0]

  if (topPlayer !== undefined) {
    return (
      <>
        <h1>Top ranked player: <a onClick={() => dispatch(setPlayer(topPlayer))}>{topPlayer.name}</a></h1>
        <h1>Elo: {Math.round(topPlayer.elo)}</h1>
        <img style={imgStyle} src={`${baseUrl}/${topPlayer.photo}`} alt='player photo' />
      </>
    )}
  else {
    return null
  }
}

export default Header