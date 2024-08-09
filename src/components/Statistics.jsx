import PlaytimeGraph from './PlaytimeGraph'

import { useSelector } from 'react-redux'

const Statistics = () => {
  const matches = useSelector(state => state.matches)
  const playHours = matches.map((match) => new Date(match.date).getHours())

  var playTimes = [];

  for (var i = 0; i <= 23; i++) {
    playTimes.push({
      hour:i,
      count:0
    });
  }

  playHours.forEach((hour) => {
    playTimes[hour].count++
  })

  return(
    <>
      <h1>Statistics</h1>
      <PlaytimeGraph playTimes={playTimes}/>
    </>
  )
}

export default Statistics