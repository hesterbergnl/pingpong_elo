import { createSlice, current } from '@reduxjs/toolkit'

import playerService from '../services/player'
import { compareName, setStatusMessageState } from '../util/helpers'

const playerSlice = createSlice({
  name: 'players',
  initialState: [],
  reducers: {
    appendPlayer(state, action) {
      return state.concat(action.payload).sort(compareName)
    },
    setPlayers(state, action) {
      return action.payload.sort(compareName)
    },
    replacePlayer(state, action) {
      // For troubleshooting, use current(state)
      // console.log(`State: ${JSON.stringify(current(state))}`)
      const { id, elo } = action.payload;
      return state.map(player => 
        (player.id === id 
          ? { ...player, elo } 
          : player)
        ).sort(compareName);
    },
    removePlayer(state, action) {
      const id = action.payload
      return state.filter(player =>
        player.id !== id)
    }
  }
})

export const initializePlayers = () => {
  return async dispatch => {
    try {
      const players = await playerService.getAll()
      dispatch(setPlayers(players))
    } catch (error) {
      setStatusMessageState(error.message, true)
    }
  }
}

export const createPlayer = (player, config) => {
  return async dispatch => {
    try { 
      const newPlayer = await playerService.create(player, config)
      setStatusMessageState(`player added: ${player.name}`, false)
      dispatch(appendPlayer(newPlayer))
    } catch (error) {
      setStatusMessageState(error.message, true)
    }
  }
}

export const updatePlayer = (id, player) => {
  return async dispatch => {
    try { 
      const updatedPlayer = await playerService.update(id, player)
      dispatch(replacePlayer(updatedPlayer))
    } catch (error) {
      setStatusMessageState(error.message, true)
    }
  }
}

export const deletePlayer = (id, config) => {
  return async dispatch => {
    try { 
      await playerService.del(id, config)
      setStatusMessageState(`player deleted: ${id}`, false)
      dispatch(removePlayer(id))
    } catch (error) {
      setStatusMessageState(error.message, true)
    }
  }
}

export const { appendPlayer, setPlayers, replacePlayer, removePlayer } = playerSlice.actions

export default playerSlice.reducer