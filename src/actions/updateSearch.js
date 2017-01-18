import * as actions from './'
import * as constants from '../constants'

export function updateSearch(query) {
  return (dispatch, getState) => {
    dispatch({type: constants.SET_SEARCH, search: query})
    dispatch(actions.fetchMovies())
  }
}
