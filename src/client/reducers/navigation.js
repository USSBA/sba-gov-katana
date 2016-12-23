const navigationReducer = (state, action) => {
    console.log("the action is " + JSON.stringify(action));
    if (action.type === "MOVE_TO_FIND_LENDERS") {
        return {
            currentPage: "loanForm"
        };
    } else if (action.type === "MOVE_TO_SEE_MATCHES") {
        return {
            currentPage: "successPage"
        };
    }
    return state || {
        currentPage: "landingPage"
    };
};
export default navigationReducer;
