const contactInfoReducer = (state = {}, action) => {
    console.log("the action is " + JSON.stringify(action));
    if(action.type === "CREATE_CONTACT_INFO"){
        return Object.assign({}, state, {contactInfoData: action.contactInfoData})
    }
    return state;
};


export default contactInfoReducer;