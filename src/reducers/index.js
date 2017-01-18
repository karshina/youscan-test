import * as constants from '../constants'

const initialAppState = {
  search: "",
  movies: [],
  movie: null,
}

export function app(state = initialAppState, action) {
  switch (action.type) {
    case constants.SET_MOVIES:
      return {
        ...state,
        movies: action.movies
      }
    case constants.SET_MOVIE:
      return {
        ...state,
        movie: action.movie
      }
    case constants.SET_SEARCH:
      return {
        ...state,
        search: action.search
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
