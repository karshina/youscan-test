import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'

import * as reducers from './reducers'
import * as containers from './containers'

import './index.css'

injectTapEventPlugin()

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

const enhancer = compose(
  applyMiddleware(thunk),
  persistState('fav'),
)

const store = createStore(reducer, enhancer)

const routes = (
  <Route path='/' component={containers.App}>
    <IndexRedirect to='/movies' />
    <Route path='/movies' component={containers.List} />
    <Route path='/movies/:id' component={containers.Movie} />
    <Route path='/favorites' component={containers.Favorites} />
    <Route path='/favorites/:id' component={containers.Movie} />
  </Route>
)

const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
