const Player = ({n, elo}) => {
  return (
    <>
      <tr>
        <td>
          {n}
        </td>
        <td>
          {elo.toFixed(1)}
        </td>
      </tr>
    </>
  )
}

export default Player