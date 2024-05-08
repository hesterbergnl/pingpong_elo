import { createSlice, current } from '@reduxjs/toolkit'

import matchService from '../services/match'
import { compareDatesRev } from '../util/helpers'

const matchSlice = createSlice({
  name: 'matches',
  initialState: [],
  reducers: {
    appendMatch(state, action) {
      return state.concat(action.payload).sort(compareDatesRev)
    },
    setMatches(state, action) {
      return action.payload.sort(compareDatesRev)
    },
    replaceMatch(state, action) {
      const { id, date, p1, p2, s1, s2, elo1, elo2 } = action.payload;
      return state.map(match =>
        match.id === id
          ? { ...match, date, p1, p2, s1, s2, elo1, elo2 }
          : match
      ).sort(compareDatesRev)
    },
    removeMatch(state, action) {
      const id = action.payload
      return state.filter(match =>
        match.id !== id)
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
    console.log("async api call: ", id, match)
    const updatedMatch = await matchService.update(id, match)
    dispatch(replaceMatch(updatedMatch))
  }
}

export const deleteMatch = (id, config) => {
  return async dispatch => {
    await matchService.del(id, config)
    dispatch(removeMatch(id))
  }
}

export const { appendMatch, setMatches, replaceMatch, removeMatch } = matchSlice.actions

export default matchSlice.reducer