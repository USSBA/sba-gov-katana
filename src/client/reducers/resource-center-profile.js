import types from '../actions/types.js'

const resourceCenterProfileReducer = (state = true, action) => {
  if (action.type === types.resouceCenterProfile.submitComplete) {
    return action.isSubmitComplete
  } else if (action.type === types.resouceCenterProfile.submitError) {
    return action.hadSubmitError
  }
  return state
}

export default resourceCenterProfileReducer
