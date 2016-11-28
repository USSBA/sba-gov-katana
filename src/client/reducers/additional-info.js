const additionalInfoReducer = (state = {}, action) => {
    console.log("the action is " + JSON.stringify(action));
    if(action.type === "REVIEW_ANSWERS"){
        return Object.assign({}, state, {additionalInfoData: action.additionalInfoData})
    }
    return state;
}


export default additionalInfoReducer;