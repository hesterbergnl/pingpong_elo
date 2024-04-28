import { configureStore } from '@reduxjs/toolkit'

import eloReducer from './reducers/eloReducer'
import matchReducer from './reducers/matchReducer'
import playerReducer from './reducers/playerReducer'

const store = configureStore({
  reducer: {
    elos: eloReducer,
    matches: matchReducer,
    players: playerReducer
  }
})

export default store