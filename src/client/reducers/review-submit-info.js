const reviewSubmitInfoReducer = (state = {}, action) => {
    console.log("the action is " + JSON.stringify(action));
    if(action.type === "CREATE_REVIEW_SUBMIT_INFO"){
        return Object.assign({}, state, {reviewSubmitInfoData: action.reviewSubmitInfoData})
    }
    return state;
};


export default reviewSubmitInfoReducer;