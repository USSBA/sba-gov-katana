const reviewSubmitInfoReducer = (
  state = {
    matching: false,
    matched: false,
    matchedResponse: [],
    error: null
  },
  action
) => {
  switch (action.type) {
    case "MATCH_FORM_DATA_START": {
      return {
        ...state,
        matching: true
      };
    }
    case "MATCH_FORM_DATA_SUCCESS": {
      return {
        ...state,
        matching: false,
        matched: true,
        matchedResponse: action.payload
      };
    }
    case "MATCH_FORM_DATA_ERROR": {
      return {
        ...state,
        matching: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default reviewSubmitInfoReducer;
