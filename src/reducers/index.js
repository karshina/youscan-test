import * as constants from '../constants'

const initialAppState = {
  query: "",
  movies: [],
  movie: null,
  page: 1,
  pageCount: 0
}

export function app(state = initialAppState, action) {
  switch (action.type) {
    case constants.SET_MOVIES:
      return {
        ...state,
        movies: action.movies,
        pageCount: action.pageCount
      }
    case constants.SET_MOVIE:
      return {
        ...state,
        movie: action.movie
      }
    case constants.SET_SEARCH:
      return {
        ...state,
        query: action.query
      }
    case constants.SET_PAGE:
      return {
        ...state,
        page: action.page
      }
    default:
      return state
  }
}

const initialLoadingState = {
  movies: true,
  movie: true,
}

export function loading(state = initialLoadingState, action) {
  switch (action.type) {
    case constants.SET_LOADING:
      return {
        ...state,
        ...action.obj
      }
    default:
      return state
  }
}
