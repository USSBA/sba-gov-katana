const additionalInfoReducer = (state = {}, action) => {
  if (action.type === "REVIEW_ANSWERS") {
    return Object.assign({}, state, {
      additionalInfoData: action.additionalInfoData
    });
  }
  return state;
};


export default additionalInfoReducer;