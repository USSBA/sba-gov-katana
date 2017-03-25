/* eslint-disable  callback-return */
function logging({getState}) {
  return (next) => {
    return (action) => {
      console.log("will dispatch", action);
      const returnValue = next(action);
      console.log("post action state", returnValue);
      return returnValue;
    };
  };
}

/* eslint-enable  callback-return */
export default logging;
