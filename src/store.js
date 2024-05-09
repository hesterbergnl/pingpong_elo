import { configureStore } from '@reduxjs/toolkit'

import matchReducer from './reducers/matchReducer'
import playerReducer from './reducers/playerReducer'
import loginUserReducer from './reducers/loginUserReducer'

const store = configureStore({
  reducer: {
    matches: matchReducer,
    players: playerReducer,
    loginUser: loginUserReducer
  }
})

export default store