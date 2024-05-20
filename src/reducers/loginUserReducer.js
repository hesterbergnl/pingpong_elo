import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import { setStatusMessageState } from '../util/helpers'

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
    try { 
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedPongadminUser', JSON.stringify(user)
      )
      setStatusMessageState(`${user.username} logged in!`, false)
      dispatch(setUser(user))
    } catch (error) {
      setStatusMessageState(error.message, true)
    }
  }
}

export const { setUser, clearUser } = loginUserSlice.actions

export default loginUserSlice.reducer