// import * as constants from '../constants'

const initialAppState = {
  movies: [
    {
      id: 1,
      title: 'Terminator 1'
    },
    {
      id: 2,
      title: 'Terminator 2'
    },
    {
      id: 3,
      title: 'Terminator 3'
    }
  ]
}

export function app (state = initialAppState, action) {
  return state
}
