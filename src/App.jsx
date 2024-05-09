import PlayerDetail from './components/PlayerDetail'
import MainPage from './components/MainPage'

import { useEffect } from 'react'
import { initializePlayers } from './reducers/playerReducer'
import { initializeMatches } from './reducers/matchReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/loginUserReducer'


const App = () => {
  const selectedPlayer = useSelector(state => state.selectedPlayer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeMatches())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializePlayers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPongadminUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const mainPageRender = () => { 
    return(
      <>      
        <MainPage />
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
