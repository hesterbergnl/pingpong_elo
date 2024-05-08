import { useSelector } from 'react-redux'

const Player = ({n, elo, clickedPlayerName, delFunc}) => {
  const user = useSelector(state => state.loginUser)

  return (
    <>
      <tr>
        <td>
          <a onClick={clickedPlayerName}>{n}</a>
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