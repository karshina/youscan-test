import * as actions from './'
import * as constants from '../constants'

export function setPage(num) {
  return (dispatch, getState) => {
    dispatch({type: constants.SET_PAGE, page: num})
    dispatch(actions.fetchMovies())
  }
}
