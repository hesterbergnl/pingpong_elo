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
        {user !== null
        ? <td>
            <button onClick={delFunc}>delete</button>
          </td>
        : null}         
      </tr>
    </>
  )
}

export default Player