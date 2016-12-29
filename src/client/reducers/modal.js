const modalReducer = (state = {}, action) => {
  console.log("the action is " + JSON.stringify(action));
  if (action.type === "SHOW_MODAL") {
    return {
      modalType: action.modalType,
      modalProps: action.modalProps
    };
  }
  return state;
};


export default modalReducer;
