import types from '../actions/types.js'

const contentReducer = (state = {}, action) => {
  if (action.type === types.siteContent) {
    const newState = {}
    newState[action.contentType] = action.data
    return Object.assign({}, state, newState)
  }
  return state
}

export default contentReducer
