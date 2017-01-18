import * as constants from '../constants'

export function setLoading(obj) {
  return {
    type: constants.SET_LOADING,
    obj
  }
}
