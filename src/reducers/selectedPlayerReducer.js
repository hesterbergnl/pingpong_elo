import { createSlice } from '@reduxjs/toolkit'

const selectedPlayerSlice = createSlice({
  name: 'selectedPlayer',
  initialState: null,
  reducers: {
    setPlayer(state, action) {
      return action.payload
    },
    clearPlayer(state) {
      return null
    }
  }
})

export const { setPlayer, clearPlayer } = selectedPlayerSlice.actions

export default selectedPlayerSlice.reducer