import types from '../actions/types.js'

const resourceCenterProfileReducer = (state = {}, action) => {
  if (action.type === types.resouceCenterProfile.submitComplete) {
    return { isSubmitComplete: action.isSubmitComplete }
  } else if (action.type === types.resouceCenterProfile.submitError) {
    return { hadSubmitError: action.hadSubmitError }
  }
  return state
}

export default resourceCenterProfileReducer
