import PlayerDetail from './components/PlayerDetail'
import MainPage from './components/MainPage'
import RecalcEloButton from './components/RecalcEloButton'

import { useEffect } from 'react'
import { initializePlayers } from './reducers/playerReducer'
import { initializeMatches } from './reducers/matchReducer'
import { useDispatch, useSelector } from 'react-redux'


const App = () => {
  const selectedPlayer = useSelector(state => state.selectedPlayer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeMatches())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializePlayers())
  }, [dispatch])

  const mainPageRender = () => { 
    return(
      <>      
        <MainPage />
        <RecalcEloButton />
      </>
    )
  }

  const playerRender = () => {
    return (
      <>
        <PlayerDetail />
      </>
    )
  }

  return (
    <>
      {selectedPlayer === null ? mainPageRender() : playerRender()}
    </>
  )
}

export default App
