import PlayerDetail from './components/PlayerDetail'
import MainPage from './components/MainPage'
import Matches from './components/Matches'

import { useEffect } from 'react'
import { initializePlayers } from './reducers/playerReducer'
import { initializeMatches } from './reducers/matchReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/loginUserReducer'

import {
  Routes, Route, Link, useMatch
} from 'react-router-dom'

const App = () => {
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

  const players = useSelector(state => state.players)
  const match = useMatch('/players/:id')

  console.log(players)
  console.log(match)
  const player = match
    ? players.find(player => player.id === match.params.id)
    : null

  return (
    <>
      <div>
        <Link to='/'>home</Link>
        <Link to='/matches'>matches</Link>
      </div>

      {console.log(player)}

      <Routes>
        <Route path='/' element={<MainPage selectedPlayer={player}/>}/>
        <Route path='/matches' element={<Matches selectedPlayer={player}/>}/>
        <Route path='/players/:id' element={<PlayerDetail selectedPlayer={player}/>}/>
      </Routes>
    </>
  )
}

export default App
