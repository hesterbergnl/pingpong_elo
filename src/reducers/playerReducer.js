import { createSlice, current } from '@reduxjs/toolkit'

import playerService from '../services/player'
import { compareElo } from '../util/helpers'

const playerSlice = createSlice({
  name: 'players',
  initialState: [],
  reducers: {
    appendPlayer(state, action) {
      return state.concat(action.payload).sort(compareElo)
    },
    setPlayers(state, action) {
      return action.payload.sort(compareElo)
    },
    replacePlayer(state, action) {
      // For troubleshooting, use current(state)
      // console.log(`State: ${JSON.stringify(current(state))}`)
      const { id, elo } = action.payload;
      return state.map(player => 
        (player.id === id 
          ? { ...player, elo } 
          : player)
        ).sort(compareElo);
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
      console.log(error)
    }
  }
}

export const createPlayer = (player, config) => {
  return async dispatch => {
    const newPlayer = await playerService.create(player, config)
    dispatch(appendPlayer(newPlayer))
  }
}

export const updatePlayer = (id, player) => {
  return async dispatch => {
    const updatedPlayer = await playerService.update(id, player)
    dispatch(replacePlayer(updatedPlayer))
  }
}

export const deletePlayer = (id, config) => {
  return async dispatch => {
    await playerService.del(id, config)
    dispatch(removePlayer(id))
  }
}

export const { appendPlayer, setPlayers, replacePlayer, removePlayer } = playerSlice.actions

export default playerSlice.reducer