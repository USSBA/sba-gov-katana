import axios from 'axios';
const qs = require('qs');

export function matchFormData(reviewSubmitInfoData){
    return function(dispatch){
        dispatch({type: "MATCH_FORM_DATA_START"});
        console.log("Match Form Data being sent to the server.");
        axios.post("matchFormData",
            reviewSubmitInfoData/*,
            {
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }*/)
            .then((response) => {
                dispatch({type: "MATCH_FORM_DATA_SUCCESS", payload: response.data});
                console.log("SUCCESS: " + response.data);
            })
            .catch((error) => {
                dispatch({type: "MATCH_FORM_DATA_ERROR", payload: error});
                console.log("ERROR: " + error);
            });
    };
}