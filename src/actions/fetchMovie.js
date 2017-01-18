import fetch from 'isomorphic-fetch'
import * as actions from './'
import * as constants from '../constants'
import { apiUrl } from '../lib/api'

export function fetchMovie(id) {
  return (dispatch, getState) => {
    dispatch(actions.setLoading({movie: true}))

    fetch(apiUrl('/movie/' + id))
      .then(res => {
        return res.json()
      })
      .then(res => {
        dispatch({ type: constants.SET_MOVIE, movie: res })
        dispatch(actions.setLoading({movie: false}))
      })
  }
}
