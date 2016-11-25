const reviewInfoReducer = (state = {}, action) => {
    console.log("the action is " + JSON.stringify(action));
    if(action.type === "CREATE_REVIEW_INFO"){
        return Object.assign({}, state, {reviewInfoData: action.reviewInfoData})
    }
    return state;
};


export default reviewInfoReducer;