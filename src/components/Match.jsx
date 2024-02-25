const Match = ({date,p1,p2,s1,s2,elo1,elo2}) => {
  return (
    <tr>
      <td>{date}</td>
      <td>{p1}</td>
      <td>{p2}</td>
      <td>{s1}</td>
      <td>{s2}</td>
      <td>{elo1.toFixed(1)}</td>
      <td>{elo2.toFixed(1)}</td>
    </tr>
  )
}

export default Match