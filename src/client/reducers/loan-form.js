const loanReducer = (state = {}, action) => {
  console.log("the action is " + JSON.stringify(action));
  if (action.type === "CREATE_LOAN") {
    return Object.assign({}, state, {
      loanData: action.loanData
    });
  }
  return state;
};


export default loanReducer;