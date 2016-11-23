const reviewInfoReducer = (state=[], action) => {
    //console.log("the action is " + JSON.stringify(action));
    return[
        {
            inputId: 1,
            inputType: "FULL_NAME",
            inputData: "Jordan Watts",
            inputLabel: "Name",
            inputErrorMsg: "Full name is required."
        },
        {
            inputId: 2,
            inputType: "BUSINESS_ADDRESS",
            inputData: "8 Market Pl, Baltimore, MD, 21202",
            inputLabel: "Address",
            inputErrorMsg: "Address required."
        },
        {
            inputId: 3,
            inputType: "FUNDS_NEEDED",
            inputData: "$1,000,000",
            inputLabel: "What is your business website?",
            inputErrorMsg: ""
        },
        {
            inputId: 4,
            inputType: "USE_OF_FUNDS",
            inputData: "Purchasing equipment",
            inputLabel: "Use of funds",
            inputErrorMsg: "Please provide use of funds."
        },
        {
            inputId: 5,
            inputType: "USE_OF_FUNDS_DESCRIPTION",
            inputData: "I think you get the picture",
            inputLabel: "Use of Funds Description",
            inputErrorMsg: "Please provide use of funds description."
        },
        {
            inputId: 6,
            inputType: "EMAIL_REQUEST",
            inputData: "",
            inputLabel: "Please email me in the future about improving this tool.",
            inputErrorMsg: "Please select to receive email in the future or not."
        }
    ];
};


export default reviewInfoReducer;