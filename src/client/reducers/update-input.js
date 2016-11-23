function updateInputReducer(state=[], action){
    switch(action.type){
        case 'UPDATE_INPUT':
            const i = action.index;
            return[
                ...state.slice(0,i),
                {...state[i], inputData: action.inputData},
                ...state.slice(i+1)
            ];
        default:
            return state;
    }
}
export default updateInputReducer;