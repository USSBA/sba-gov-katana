/**
 * Created by aadeogun on 2/13/17.
 */
const mainMenuReducer = (state = {
    fetching: false,
    fetched: false,
    fetchedMainMenu: [],
    error: null
  }, action) => {
  switch (action.type) {
    case "FETCHED_MAIN_MENU_START": {
      return {
        ...state,
        fetching: true
      };
    }
    case "FETCH_MAIN_MENU_SUCCESS": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        fetchedMainMenu: action.payload
      };
    }
    case "FETCH_MAIN_MENU_ERROR": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
};


export default mainMenuReducer;
