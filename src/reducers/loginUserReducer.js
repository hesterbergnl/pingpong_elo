import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'

const loginUserSlice = createSlice({
  name: 'loginUser',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser(state, action) {
      return null
    }
  }
})

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem(
      'loggedPongadminUser', JSON.stringify(user)
    ) 
    dispatch(setUser(user))
  }
}

export const { setUser, clearUser } = loginUserSlice.actions

export default loginUserSlice.reducer