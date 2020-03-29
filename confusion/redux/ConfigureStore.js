import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistCombineReducers, persistStore } from 'redux-persist'
// import logger from 'redux-logger'
import { AsyncStorage } from 'react-native'

import { dishes } from './dishes'
import { comments } from './comments'
import { leaders } from './leaders'
import { promotions } from './promotions'
import { favorites } from './favorite'

const config = {
  key: 'root',
  storage: AsyncStorage,
  debug: true
}
 
export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config,{
      dishes,
      comments,
      leaders,
      promotions,
      favorites
    }),
    applyMiddleware(thunk)
  )

  const persistor = persistStore(store)

  return {persistor, store}
}