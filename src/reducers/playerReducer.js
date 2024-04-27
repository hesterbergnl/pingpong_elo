import { createSlice } from '@reduxjs/toolkit'

import playerService from '../services/player'

const playerSlice = createSlice({
  name: 'players',
  initalState: [],
  reducers: {
    appendPlayer(state, action) {
      state.push(action.payload)
    },
    setPlayers(state, action) {
      return action.payload
    },
    replacePlayer(state, action) {
      const id = action.payload.id

      return state.map(player => {
        player.id !== id ? player : action.payload
      })
    }
  }
})

export const initializePlayers = () => {
  return async dispatch => {
    const players = await playerService.getAll()
    dispatch(setPlayers(players))
  }
}

export const createPlayer = (player) => {
  return async dispatch => {
    const newPlayer = await playerService.create(player)
    dispatch(appendPlayer(newPlayer))
  }
}

export const updateplayer = (id, player) => {
  return async dispatch => {
    const updatedPlayer = await playerService.update(id, player)
    dispatch(replacePlayer(updatedPlayer))
  }
}

export const { appendPlayer, setPlayers, replacePlayer } = playerSlice.actions

export default playerSlice.reducer