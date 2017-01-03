const contactInfoReducer = (state = {}, action) => {
  if (action.type === "CREATE_CONTACT_INFO") {
    return Object.assign({}, state, {
      contactInfoData: action.contactInfoData
    });
  }
  return state;
};


export default contactInfoReducer;