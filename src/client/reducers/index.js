import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// our customer reducers
import navigationReducer from '../reducers/navigation.js'
import reviewSubmitInfoReducer from './review-submit-info.js'
import modalReducer from './modal.js'
import contentReducer from './content.js'
import feedbackReducer from './feedback.js'
import confirmationEmailReducer from './confirmation-email.js'
import displayReducer from './display.js'
import loadingReducer from './loading.js'
import resourceCenterProfileReducer from '../reducers/resource-center-profile.js'

// combine the custom reducers with the routing reducer
const rootReducer = combineReducers({
  reviewSubmitInfoReducer: reviewSubmitInfoReducer,
  routing: routerReducer,
  modalReducer: modalReducer,
  contentReducer: contentReducer,
  confirmationEmailReducer: confirmationEmailReducer,
  feedback: feedbackReducer,
  display: displayReducer,
  navigation: navigationReducer,
  loading: loadingReducer,
  resourceCenterProfile: resourceCenterProfileReducer
})

export default rootReducer
