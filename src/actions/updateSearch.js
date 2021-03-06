import * as actions from './'
import * as constants from '../constants'

export function updateSearch(query) {
  return (dispatch, getState) => {
    dispatch({type: constants.SET_SEARCH, query})
    dispatch({type: constants.SET_PAGE, page: 1})
    dispatch(actions.fetchMovies())
  }
}
