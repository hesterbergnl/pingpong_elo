const Match = ({date,p1,p2,s1,s2,elo1,elo2}) => {
  var options = { year: 'numeric', month: 'short', day: 'numeric' };

  return (
    <tr>
      <td>{new Date(date).toLocaleDateString("en-NL", options)}</td>
      <td>{p1}</td>
      <td>{p2}</td>
      <td>{s1}</td>
      <td>{s2}</td>
      <td>{Math.round(elo1)}</td>
      <td>{Math.round(elo2)}</td>
    </tr>
  )
}

export default Match