const MatchForm = (props) => {
  return (
    <form onSubmit={props.addMatch}>
      <table>
        <tbody>
          <tr>
            <td>Player 1</td>
            <td>Player 2</td>
            <td>Player 1 Score</td>
            <td>Player 2 Score</td>
            <td></td>
          </tr>
          <tr>
            <td><input value={props.p1} onChange={props.updatep1}/></td>
            <td><input value={props.p2} onChange={props.updatep2}/></td>
            <td><input value={props.p1score} onChange={props.updatep1score}/></td>
            <td><input value={props.p2score} onChange={props.updatep2score}/></td>
            <td><button type='submit'> Add </button></td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default MatchForm
