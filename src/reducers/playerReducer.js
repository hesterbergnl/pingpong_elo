import { createSlice } from '@reduxjs/toolkit'

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
      const id = action.payload.id

      return state.map(player => {
        player.id !== id ? player : action.payload
      }).sort(compareElo)
    }
  }
})

export const initializePlayers = () => {
  return async dispatch => {
    const players = await playerService.getAll()
    console.log(players)
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