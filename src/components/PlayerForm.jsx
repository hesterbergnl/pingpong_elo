const PlayerForm = (props) => {
  return (
    <form onSubmit={props.addPlayer}>
      <table>
       <thead>
        <tr>
            <td>Name</td>
            <td><input value={props.name} onChange={props.updateName}/></td>
            <td><button type='submit'> Add </button></td>
          </tr>
       </thead>
      </table>
    </form>
  )
}

export default PlayerForm
