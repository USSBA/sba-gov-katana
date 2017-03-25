import { browserHistory } from "react-router";


export function locationChange(targetLocation) {
  return function(dispatch) {
    browserHistory.push(targetLocation);
    dispatch({
      type: "LOCATION_CHANGE",
      path: targetLocation
    });
  };
}

export function goBack() {
  return function(dispatch) {
    browserHistory.back();
    dispatch({
      type: "LOCATION_CHANGE",
      path: ""
    });
  };
}
