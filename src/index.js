import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import * as reducers from './reducers'
import * as containers from './containers'
import './index.css'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

const routes = (
  <Route path='/' component={containers.App}>
    <IndexRedirect to='/movies' />
    <Route path='/movies' component={containers.List} />
    <Route path='/movies/:id' component={containers.Movie} />
  </Route>
)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
