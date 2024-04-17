const Player = ({n, elo, clickedPlayerName}) => {
  return (
    <>
      <tr>
        <td>
          <a onClick={clickedPlayerName}>{n}</a>
        </td>
        <td>
          {elo.toFixed(1)}
        </td>
      </tr>
    </>
  )
}

export default Player