import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Player = ({id, user, n, elo, delFunc}) => {
  return (
    <>
      <tr>
        <td>
          <Link to={`/players/${id}`}>{n}</Link>
        </td>
        <td>
          {Math.round(elo)}
        </td>
        <td>
          {user !== null
          ? <button onClick={delFunc}>delete</button>
          : null}         
        </td>
      </tr>
    </>
  )
}

export default Player