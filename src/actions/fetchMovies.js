import fetch from 'isomorphic-fetch'
import * as actions from './'
import * as constants from '../constants'
import { apiUrl } from '../lib/api'

export function fetchMovies() {
  return (dispatch, getState) => {
    dispatch(actions.setLoading({movies: true}))

    let url = apiUrl('/movie/top_rated')
    const { search } = getState().app

    if (search) {
      url = apiUrl('/search/movie', {query: search})
    }

    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        dispatch({ type: constants.SET_MOVIES, movies: res.results })
        dispatch(actions.setLoading({movies: false}))
      })
  }
}
