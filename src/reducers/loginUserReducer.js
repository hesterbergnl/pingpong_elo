import { creatSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'

const loginUserSlice = creatSlice({
  name: 'loginUser',
  initalState: null,
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
    dispatch(setUser(user))
  }
}