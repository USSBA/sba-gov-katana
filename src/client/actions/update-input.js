export function updateInput(i, updatedText){
    return {
        type: "UPDATE_INPUT",
        i: i,
        updatedText: updatedText
    };
}