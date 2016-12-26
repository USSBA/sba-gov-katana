const businessInfoReducer = (state = {}, action) => {
  console.log("the action is " + JSON.stringify(action));
  if (action.type === "CREATE_BUSINESS_INFO") {
    return Object.assign({}, state, {
      businessInfoData: action.businessInfoData
    });
  }
  return state;
};


export default businessInfoReducer;