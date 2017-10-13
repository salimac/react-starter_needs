import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import { routerMiddleware } from "react-router-redux";
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import logger from "redux-logger";
const createStore = (initialState = {},history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk,routerMiddleware(history)];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  let composeEnhancers = compose

  if (__DEV__) {
    const log =  logger({ diff: true, collapsed: true });
    middleware.push(log);
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

/*  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))*/

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}

export default createStore
