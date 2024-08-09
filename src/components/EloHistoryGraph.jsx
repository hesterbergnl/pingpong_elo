import {AgChartsReact} from 'ag-charts-react'

const EloHistoryGraph = ({playerElos}) => {
  const chartOptions = {
    title: { text: 'Elo History' },
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

export default EloHistoryGraph