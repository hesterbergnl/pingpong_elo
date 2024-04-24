import { createSlice } from '@reduxjs/toolkit'

import matchService from '../services/match'

const matchSlice = createSlice({
  name: 'matches',
  initialState: [],
  reducers: {
    appendMatch(state, action) {
      state.push(action.payload)
    },
    setMatches(state, action) {
      return action.payload
    },
    replaceMatch(state, action) {
      const id = action.payload.id

      return state.map(match => {
        match.id !== id ? match : action.payload
      })
    }
  }
})

export const initializeMatches = () => {
  return async dispatch => {
    const matches = await matchService.getAll()
    dispatch(setMatches(matches))
  }
}

export const createMatch = (match) => {
  return async dispatch => {
    const newMatch = await matchService.create(match)
    dispatch(appendMatch(newMatch))
  }
}

export const updateMatch = (id, match) => {
  return async dispatch => {
    const updatedMatch = await matchService.update(id, match)
    dispatch(replaceMatch(updatedMatch))
  }
}

export const { appendMatch, setMatches, replaceMatch } = matchSlice.actions

export default matchSlice.reducer