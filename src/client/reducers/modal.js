const modalReducer = (state = {}, action) => {
  if (action.type === "SHOW_MODAL") {
    return {
      modalType: action.modalType,
      modalProps: action.modalProps
    };
  }
  return state;
};


export default modalReducer;
