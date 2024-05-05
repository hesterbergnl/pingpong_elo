import { configureStore } from '@reduxjs/toolkit'

import matchReducer from './reducers/matchReducer'
import playerReducer from './reducers/playerReducer'
import selectedPlayerReducer from './reducers/selectedPlayerReducer'

const store = configureStore({
  reducer: {
    matches: matchReducer,
    players: playerReducer,
    selectedPlayer: selectedPlayerReducer,
  }
})

export default store