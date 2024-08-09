import {AgChartsReact} from 'ag-charts-react'

const PlaytimeGraph = (playTimes) => {

  console.log(playTimes.playTimes)

  const chartOptions = {
    title: { text: 'Hour of Play' },
    data: playTimes.playTimes.map((e) => ({
      i: e.hour,
      e: e.count, 
    })),
    series: [{type: 'bar', xKey:'i', yKey:'e' }],
  }
  
  return (
    <AgChartsReact options={chartOptions} />
  )
}

export default PlaytimeGraph