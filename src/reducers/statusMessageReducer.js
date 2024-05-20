import { createSlice } from '@reduxjs/toolkit'

const statusMessageSlice = createSlice({
  name: 'statusMessage',
  initialState: null,
  reducers: {
    setStatusMessage(state, action) {
      const { message, error } = action.payload
      return { message: message, error:error }
    },
    clearStatusMessage(state, action) {
      return null
    }
  }
})

export const { setStatusMessage, clearStatusMessage } = statusMessageSlice.actions

export default statusMessageSlice.reducer