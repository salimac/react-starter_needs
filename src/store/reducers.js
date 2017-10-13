import { combineReducers } from 'redux'
/*import locationReducer from './location'*/
import { routerReducer as router } from "react-router-redux";
import notificationReducer from "./notificationStore"

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
  	router,
    notification: notificationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
