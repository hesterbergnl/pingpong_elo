import { configureStore } from '@reduxjs/toolkit'

import matchReducer from './reducers/matchReducer'
import playerReducer from './reducers/playerReducer'
import loginUserReducer from './reducers/loginUserReducer'
import errorMessageReducer from './reducers/errorMessageReducer'

const store = configureStore({
  reducer: {
    matches: matchReducer,
    players: playerReducer,
    loginUser: loginUserReducer,
    errorMessage: errorMessageReducer
  }
})

export default store