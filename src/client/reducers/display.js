import types from '../actions/types.js'
import constants from '../services/constants.js'

const displayReducer = (state = {}, action) => {
  if (action.type === types.display.theme) {
    return Object.assign({}, state, {
      theme: action.themeName
    })
  }
  return state
}

export default displayReducer
