import {AgChartsReact} from 'ag-charts-react'

const Graph = ({playerElos}) => {
  const chartOptions = {
    data: playerElos.map((e, i) => ({
      i: i,
      e: e.elo, 
    })),
    series: [{type: 'line', xKey:'i', yKey:'e' }],
  }

  return (
    <AgChartsReact options={chartOptions} />
  )
}

export default Graph