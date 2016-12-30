const loanReducer = (state = {}, action) => {
  if (action.type === "CREATE_LOAN") {
    return Object.assign({}, state, {
      loanData: action.loanData
    });
  }
  return state;
};


export default loanReducer;