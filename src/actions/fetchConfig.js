import fetch from 'isomorphic-fetch'
import * as actions from './'
import * as constants from '../constants'
import { apiUrl } from '../lib/api'

export function fetchConfig() {
  return (dispatch, getState) => {
    dispatch(actions.setLoading({config: true}))

    fetch(apiUrl('/configuration'))
      .then(res => {
        return res.json()
      })
      .then(res => {
        dispatch({ type: constants.SET_CONFIG, config: res })
        dispatch(actions.setLoading({config: false}))
      })
  }
}
