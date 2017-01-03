const industryInfoReducer = (state = {}, action) => {
  if (action.type === "CREATE_INDUSTRY_INFO") {
    return Object.assign({}, state, {
      industryInfoData: action.industryInfoData
    });
  }
  return state;
};


export default industryInfoReducer;