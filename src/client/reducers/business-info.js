const businessInfoReducer = (state=[], action) => {
    //console.log("the action is " + JSON.stringify(action));
    return[
        {
            inputId: 1,
            inputType: "BUSINESS_NAME",
            inputData: "",
            inputLabel: "What is the name of your business?",
            inputErrorMsg: "Business name is required."
        },
        {
            inputId: 2,
            inputType: "ZIP_CODE",
            inputData: "",
            inputLabel: "What is your ZIP code?",
            inputErrorMsg: "Zip Code is required."
        },
        {
            inputId: 3,
            inputType: "BUSINESS_WEBSITE",
            inputData: "",
            inputLabel: "What is your business website?",
            inputErrorMsg: ""
        },
        {
            inputId: 4,
            inputType: "BUSINESS_TYPE",
            inputData: "",
            inputLabel: "What type of business is it?",
            inputErrorMsg: "Please select a type of business."
        },
        {
            inputId: 5,
            inputType: "BUSINESS_DESCRIPTION",
            inputData: "",
            inputLabel: "Describe what your business does",
            inputErrorMsg: "Description of what your business does is required."
        }
    ];
};


export default businessInfoReducer;