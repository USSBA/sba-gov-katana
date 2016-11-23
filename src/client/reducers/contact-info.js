const contactInfoReducer = (state=[], action) => {
    //console.log("the action is " + JSON.stringify(action));
    return[
        {
            inputId: 1,
            inputType: "FULL_NAME",
            inputData: "",
            inputLabel: "What is your full name?",
            inputErrorMsg: "Correct format is required for name."
        },
        {
            inputId: 2,
            inputType: "PHONE_NUMBER",
            inputData: "",
            inputLabel: "What is your phone number?",
            inputErrorMsg: "Correct format is required for phone number."
        },
        {
            inputId: 3,
            inputType: "EMAIL_ADDRESS",
            inputData: "",
            inputLabel: "What is your email address?",
            inputErrorMsg: "Correct format is required for email address."
        }
    ];
};


export default contactInfoReducer;