import { createSlice, current } from '@reduxjs/toolkit'

import matchService from '../services/match'
import { compareDatesRev, setStatusMessageState } from '../util/helpers'

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
    try {
      const matches = await matchService.getAll()
      dispatch(setMatches(matches))
    } catch (error) {
      setStatusMessageState(error.message, true)
    }
  }
}

export const createMatch = (match) => {
  return async dispatch => {
    try {
      const newMatch = await matchService.create(match)
      setStatusMessageState(`match added!`, false)
      dispatch(appendMatch(newMatch))
    } catch (error) {
      setStatusMessageState(error.message, true)
    }
  }
}

export const updateMatch = (id, match) => {
  return async dispatch => {
    try {
      //console.log("async api call: ", id, match)
      const updatedMatch = await matchService.update(id, match)
      dispatch(replaceMatch(updatedMatch))
    } catch (error) {
      setStatusMessageState(error.message, true)
    }
  }
}

export const deleteMatch = (id, config) => {
  return async dispatch => {
    try { 
      await matchService.del(id, config)
      setStatusMessageState(`match removed: ${id}`, false)
      dispatch(removeMatch(id))
    } catch (error) {
      setStatusMessageState(error.message, true)
    }
  }
}

export const { appendMatch, setMatches, replaceMatch, removeMatch } = matchSlice.actions

export default matchSlice.reducer