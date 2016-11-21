const navigationReducer = (state, action) => {
    console.log("nav reducer");
    console.log("state:");
    console.log(state);
    console.log("the action is " + JSON.stringify(action));

    if (action.type === "MOVE_TO_FIND_LENDERS") {
        return {
            currentPage: "borrowerForm"
        };
    } else {
        return state || {
            currentPage: "landingPage"
        };
    }

};


export default navigationReducer;



