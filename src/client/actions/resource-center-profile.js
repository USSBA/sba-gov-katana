import axios from 'axios'
import types from './types.js'
import constants from '../services/constants.js'

export function submitProfile(profile) {
  return function(dispatch) {
    axios
      .post(constants.routes.submitProfile, {
        profile: profile
      })
      .then(response => {
        dispatch({
          type: types.resouceCenterProfile.submitComplete,
          payload: response.data,
          isSubmitComplete: true
        })
      })
      .catch(error => {
        dispatch({
          type: types.resouceCenterProfile.submitError,
          payload: error,
          hadSubmitError: true
        })
      })
  }
}
