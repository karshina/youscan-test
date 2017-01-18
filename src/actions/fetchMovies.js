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

    const initialReqs = [
      fetch(apiUrl('/configuration')).then(json),
      fetch(url).then(json),
    ]

    Promise.all(initialReqs).then(([resConfig, resData]) => {
      dispatch({
        type: constants.SET_MOVIES,
        movies: resData.results,
        config: resConfig,
        pageCount: resData.total_pages
      })
      dispatch(actions.setLoading({movies: false}))

      const movieMapper = resData.results.map(fetchOneMovie)

      Promise.all(movieMapper).then(movieDetails => {
        dispatch({
          type: constants.SET_MOVIES,
          movies: resData.results.map((movie, i) => {
            return {
              ...movie,
              human_genres: movieDetails[i].genres
            }
          }),
          config: resConfig,
          pageCount: resData.total_pages
        })
      })
    })
  }
}

function fetchOneMovie(movie) {
  return fetch(apiUrl('/movie/' + movie.id)).then(json)
}

function json(res) {
  return res.json()
}
