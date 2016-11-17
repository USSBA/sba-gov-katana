const nameReducer = (state, action) => {
    // if(action.type === "UPDATE_NAME"){
    //     console.log("the action is "+ JSON.stringify(action));
    //     state.name = action.name;
    //     console.log("The new state is " + JSON.stringify(state));
    //     return state;
    // } else{
    //     return state || {};
    // }
    console.log("the action is "+ JSON.stringify(action));
    if(action.type === "MAKE_READY"){
        return {ready: !state.ready};
    }else if(action.type === "FIND_LENDERS"){
        // let newState = _.a(state, {ready: !state.ready})
        
        // return state;
    }else{
        return state || {};
    }
}


export default nameReducer;