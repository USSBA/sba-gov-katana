import axios from 'axios';
const qs = require('qs');

export function matchFormData(reviewSubmitInfoData){
    console.log("JSON stringify: " + JSON.stringify(reviewSubmitInfoData));
    //console.log("querystring stringify: " + querystring.stringify(reviewSubmitInfoData));
    console.log("qs stringify: " + qs.stringify(reviewSubmitInfoData));
    return function(dispatch){
        dispatch({type: "MATCH_FORM_DATA_START"});
        axios.post("http://localhost:3000/matchFormData",
            reviewSubmitInfoData,
            {
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
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