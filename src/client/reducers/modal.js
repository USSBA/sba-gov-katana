const modalReducer = (state = {}, action) => {
  console.log("the action is " + JSON.stringify(action));
  if (action.type === "SHOW_MODAL") {
    return {
      modalType: action.modalType,
      modalProps: action.modalProps
    };
  } else if (action.type === "NAVIGATE_MODAL") {
    document.location = state.modalProps.targetUrl;
    return {
      modalType: null
    };
  } else if (action.type === "CLOSE_MODAL") {
    return {
      modalType: null
    };
  }

  return state;
};


export default modalReducer;
