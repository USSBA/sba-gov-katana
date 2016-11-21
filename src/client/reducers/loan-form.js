const formReducer = (state = {}, action) => {
    console.log("the action is " + JSON.stringify(action));
    if(action.type === "SUBMIT_FORM_DATA"){
        return Object.assign({}, state, {formData: action.formData})
    }
    return state;
}


export default formReducer;