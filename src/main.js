import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from "history/lib/createBrowserHistory";
import { useRouterHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import createStore from './store/createStore';
import './styles/main.scss';

// Store Initialization
// ------------------------------------
const browserHistory = useRouterHistory(createBrowserHistory)();
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState,browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
});
// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const App = require('./components/App').default
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <App store={store} history={history} routes={routes} />,
    MOUNT_NODE
  )
}

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (e) {
        console.error(e)
        renderError(e)
      }
    }

    // Setup hot module replacement
    module.hot.accept([
      './components/App',
      './routes/index',
    ], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render()
export default store
