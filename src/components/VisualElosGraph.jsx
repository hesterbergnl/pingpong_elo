import {AgChartsReact} from 'ag-charts-react'

const VisualElosGraph = (playerElos) => {
  playerElos = playerElos.playerElos

  var minElo = 0
  var maxElo = 1

  if(playerElos.length > 0) {
    minElo = playerElos[playerElos.length - 1].elo
    maxElo = playerElos[0].elo
  }
  
  const chartOptions = {
    title: { text: 'Elo Comparisons' },
    data: playerElos.reverse().map((e) => ({
      player: e.name,
      elo: e.elo, 
    })),
    axes: [
      {
          type: 'category',
          position: 'bottom',
          title: { text: 'Player Name' }
      },
      {
          type: 'number',
          position: 'left',
          title: { text: 'Elo' },
          min: minElo, // Manually set the minimum limit
          max: maxElo
      }
    ],
    series: [{type: 'bar', xKey:'player', yKey:'elo' }],
  }

  return (
    <AgChartsReact options={chartOptions} />
  )
}

export default VisualElosGraph