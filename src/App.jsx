import PlayerDetail from './components/PlayerDetail'
import MainPage from './components/MainPage'
import Matches from './components/Matches'
import LoginForm from './components/LoginForm'
import Players from './components/Players'
import Admin from './components/Admin'
import StatusMessage from './components/StatusMessage'
import LogoutButton from './components/LogoutButton'
import Navigationbar from './components/Navigationbar'
import Statistics from './components/Statistics'

import { useEffect } from 'react'
import { initializePlayers } from './reducers/playerReducer'
import { initializeMatches } from './reducers/matchReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/loginUserReducer'
import { Container } from 'react-bootstrap'

import {
  Routes, Route, useMatch
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

  const loginUser = useSelector(state => state.loginUser)
  const players = useSelector(state => state.players)
  const match = useMatch('/players/:id')

  const player = match
    ? players.find(player => player.id === match.params.id)
    : null

  return (
    <Container>
      
      <Navigationbar />
      <StatusMessage />

      <Routes>
        <Route path='/' element={<MainPage selectedPlayer={player}/>}/>
        <Route path='/matches' element={<Matches selectedPlayer={player} user={null} qty={-1}/>}/>
        <Route path='/players' element={<Players user={null} qty={-1}/>}/>
        <Route path='/players/:id' element={<PlayerDetail user={null} selectedPlayer={player}/>}/>
        <Route path='/statistics' element={<Statistics />}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/admin' element={<Admin  user={loginUser}/>}/>
        <Route path='/logout' element={<LogoutButton/>}/>
      </Routes>
    </Container>
  )
}

export default App
