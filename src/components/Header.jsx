import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const baseUrl = 'http://localhost:3001'

const imgStyle = {
  width: '300px',
}

const Header = () => {
  const players = useSelector(state => state.players)
  const topPlayer = players[0]

  if (topPlayer !== undefined) {
    return (
      <>
        <h1>Top ranked player: <Link to={`/players/${topPlayer.id}`}>{topPlayer.name}</Link></h1>
        <h1>Elo: {Math.round(topPlayer.elo)}</h1>
        <img style={imgStyle} src={`${baseUrl}/${topPlayer.photo}`} alt='player photo' />
      </>
    )}
  else {
    return null
  }
}

export default Header