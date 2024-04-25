import { createSlice } from '@reduxjs/toolkit'

import eloService from '../services/elo'

const eloSlice = createSlice({
    name: 'elos',
    initialState: [],
    reducers: {
        appendElo(state, action) {
            state.push(action.payload)
        },
        setElos(state, action) {
            return action.payload
        },
        replaceElo(state, action) {
            const id = action.payload.id

            return state.map(elo => {
                elo.id !== id ? elo : action.payload
            })
        }
    }
})

export const initializeElos = () => {
    return async dispatch => {
        const elos = await eloService.getAll()
        dispatch(setElos(elos))
    }
}

export const createElos = (elo) => {
    return async dispatch => {
        const newElo = await eloService.create(elo)
        dispatch(appendElo(newElo))
    }
}

export const updateElo = (id, elo) => {
    return async dispatch => {
        const updatedElo = await eloService.update(id, elo)
        dispatch(replaceElo(updatedElo))
    }
}

export const { appendElo, setElos, replaceElo } = eloSlice.actions

export default eloSlice.reducer