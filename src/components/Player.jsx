const Player = ({n, elo, clickedPlayerName}) => {
  return (
    <>
      <tr>
        <td>
          <a onClick={clickedPlayerName}>{n}</a>
        </td>
        <td>
          {Math.round(elo)}
        </td>
      </tr>
    </>
  )
}

export default Player