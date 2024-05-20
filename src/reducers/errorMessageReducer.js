import { createSlice } from '@reduxjs/toolkit'

const errorMessageSlice = createSlice({
  name: 'errorMessage',
  initialState: null,
  reducers: {
    setErrorMessage(state, action) {
      return action.payload
    },
    clearErrorMessage(state, action) {
      return null
    }
  }
})

export const { setErrorMessage, clearErrorMessage } = errorMessageSlice.actions

export default errorMessageSlice.reducer