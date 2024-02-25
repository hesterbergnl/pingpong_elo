const MatchForm = (props) => {
  return (
    <form onSubmit={props.addMatch}>
      Player 1: <input value={props.p1} onChange={props.updatep1}/>
      Player 2: <input value={props.p2} onChange={props.updatep2}/>
      Player 1 Score: <input value={props.p1score} onChange={props.updatep1score}/>
      Player 2 Score: <input value={props.p2score} onChange={props.updatep2score}/>
      <button type='submit'> Add </button>
    </form>
  )
}

export default MatchForm