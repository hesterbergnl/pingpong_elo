import {AgChartsReact} from 'ag-charts-react'

const PlaytimeGraph = (playTimes) => {

  const chartOptions = {
    title: { text: 'Time of Day Histogram' },
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: { text: 'Hour' },
        label: {
          avoidCollisions: false,
          formatter: (params) => {
            return params.value + 'h';
          },
        },
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Number of Matches' },
      }
    ],
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