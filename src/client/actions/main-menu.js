/**
 * Created by aadeogun on 2/13/17.
 */
import axios from "axios";
export function fetchMainMenu() {
  return function(dispatch) {
    dispatch({
      type: "FETCH_MAIN_MENU_START"
    });
    console.log("Fetching main menu from the server.");
    axios.get("/main-menu")
      .then((response) => {
        dispatch({
          type: "FETCH_MAIN_MENU_SUCCESS",
          payload: response.data
        });
        console.log("SUCCESS: " + response.data);
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_MAIN_MENU_ERROR",
          payload: error
        });
        console.log("ERROR: " + error);
      });
  };
}
