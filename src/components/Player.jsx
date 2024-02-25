const Player = ({n, elo}) => {
  return (
    <>
      <p>
        {n} {elo.toFixed(1)}
      </p>
    </>
  )
}

export default Player