const industryInfoReducer = (state = {}, action) => {
    console.log("the action is " + JSON.stringify(action));
    if(action.type === "CREATE_INDUSTRY_INFO"){
        return Object.assign({}, state, {industryInfoData: action.industryInfoData});
    }
    return state;
};


export default industryInfoReducer;