/**
 * Created by aadeogun on 2/13/17.
 */
import axios from "axios";
export function fetchMainMenu() {
  return function(dispatch) {
    dispatch({
      type: "FETCH_MAIN_MENU_START"
    });
    axios.get("/content/main-menu.json")
      .then((response) => {
        dispatch({
          type: "FETCH_MAIN_MENU_SUCCESS",
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_MAIN_MENU_ERROR",
          payload: error
        });
      });
  };
}
