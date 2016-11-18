const formReducer = (state, action) => {
    console.log("the action is " + JSON.stringify(action));
    if(action.type === "SUBMIT_FORM_DATA"){
        console.log(action)
    }
    return state;
}


export default formReducer;