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
      const {id, elo } = action.payload

      return state.map(player => player.id === id ? {...player, elo:elo } : player).sort(compareElo)
    }
  }
})

export const initializePlayers = () => {
  return async dispatch => {
    const players = await playerService.getAll()
    dispatch(setPlayers(players))
  }
}

export const createPlayer = (player, config) => {
  return async dispatch => {
    const newPlayer = await playerService.create(player, config)
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