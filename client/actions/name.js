export function updateName(name) {
    return {
        name: name,
        type: "UPDATE_NAME"
    };
}

export function loadDefault(){
    return {
      type: "LOAD_DEFAULTS"  
    };
}

export function deleteThing(index){
    return {
        index: index,
        type: "DELETE_THING"
    };
}