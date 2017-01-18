import fetch from 'isomorphic-fetch'
import * as actions from './'
import * as constants from '../constants'
import { apiUrl } from '../lib/api'

export function fetchMovies() {
  return (dispatch, getState) => {
    dispatch(actions.setLoading({movies: true}))

    const { query, page } = getState().app
    let url = apiUrl('/movie/popular', {page})

    if (query) {
      url = apiUrl('/search/movie', {page, query})
    }

    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        dispatch({ type: constants.SET_MOVIES, movies: res.results, pageCount: res.total_pages })
        dispatch(actions.setLoading({movies: false}))
      })
  }
}
