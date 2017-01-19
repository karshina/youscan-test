import fetch from 'isomorphic-fetch'
import * as actions from './'
import * as constants from '../constants'
import { apiUrl } from '../lib/api'

export function fetchSimilarMovies(id) {
  return (dispatch, getState) => {
    dispatch(actions.setLoading({similar: true}))

    fetch(apiUrl('/movie/' + id + '/similar'))
      .then(res => {
        return res.json()
      })
      .then(res => {
        dispatch({ type: constants.SET_SIMILAR_MOVIES, similar: res.results.slice(0, 4) })
        dispatch(actions.setLoading({similar: false}))
      })
  }
}
