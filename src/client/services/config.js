const clientConfig = {
  routes: {
    confirmationEmail: "/linc/resend",
    submitForm: "/linc/matchFormData"
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
      invalidLoanDescription: "Please provide a brief description."
    }
  }
};

export default clientConfig;
