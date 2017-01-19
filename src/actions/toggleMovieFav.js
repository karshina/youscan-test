import * as constants from '../constants'

export function toggleMovieFav(movie) {
  return {
    type: constants.TOGGLE_MOVIE_FAV,
    movie,
  }
}
