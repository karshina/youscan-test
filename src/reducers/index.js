import * as constants from '../constants'

const initialAppState = {
  query: "",
  movies: [],
  movie: null,
  similar: [],
  config: null,
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
    case constants.SET_SIMILAR_MOVIES:
      return {
        ...state,
        similar: action.similar
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
    case constants.SET_CONFIG:
      return {
        ...state,
        config: action.config
      }
    default:
      return state
  }
}

const initialLoadingState = {
  movies: true,
  movie: true,
  similar: true,
  config: true,
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

const initialFavState = []

export function fav(state = initialFavState, action) {
  switch (action.type) {

    case constants.TOGGLE_MOVIE_FAV:

      const { movie } = action
      const added = state.find(m => { return m.id === movie.id })
      if (added) {
        return state.filter(m => { return m.id !== movie.id })
      } else {
        return [...state, movie]
      }

    default:
      return state
  }
}

