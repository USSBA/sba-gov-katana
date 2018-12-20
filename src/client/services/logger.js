/* eslint-disable  callback-return */
const logger = store => next => action => {
  console.log('dispatching', action)
  const result = next(action)
  console.log('next state', store.getState())
  return result
}
/* eslint-enable  callback-return */
export default logger
