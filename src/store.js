import { configureStore } from '@reduxjs/toolkit'

import matchReducer from './reducers/matchReducer'
import playerReducer from './reducers/playerReducer'
import loginUserReducer from './reducers/loginUserReducer'
import statusMessageReducer from './reducers/statusMessageReducer'

const store = configureStore({
  reducer: {
    matches: matchReducer,
    players: playerReducer,
    loginUser: loginUserReducer,
    statusMessage: statusMessageReducer
  }
})

export default store