const constants = {
  routes: {
    confirmationEmail: "/linc/resend",
    submitForm: "/linc/matchFormData",
    submitFeedbackResults: "/actions/feedback/",
    submitFeedbackText: "/actions/feedback/{id}/text"
  },
  messages: {
    validation: {
      invalidName: "Please enter a valid name.",
      invalidPhoneNumber: "Please enter your 10-digit phone number.",
      invalidEmail: "Please enter a valid email address.",
      invalidZip: "Please enter a valid 5-digit US zip code.",
      invalidIndustry: "Please select at least 1 industry.",
      invalidIndustryExperience: "Please estimate your experience.",
      invalidLoanUsage: "Please select at least 1 use of funds.",
      invalidLoanDescription: "Please provide a brief description.",
      invalidLoanAmount: "The minimum loan amount is $500.",
      invalidNewsLetterEmail: "Enter a valid email address.",
      invalidNewsLetterZipCode: "Enter a 5 digit ZIP code."
    }
  }
};

export default constants;
