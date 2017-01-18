import fetch from 'isomorphic-fetch'
import * as actions from './'
import * as constants from '../constants'
import { apiUrl } from '../lib/api'

export function fetchMovies() {
  return (dispatch, getState) => {
    dispatch(actions.setLoading({movies: true}))

    fetch(apiUrl('/movie/top_rated'))
      .then(res => {
        return res.json()
      })
      .then(res => {
        dispatch({ type: constants.SET_MOVIES, movies: res.results })
        dispatch(actions.setLoading({movies: false}))
      })
  }
}
