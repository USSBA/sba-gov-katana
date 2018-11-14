import { TRANSLATIONS } from '../translations'

// eslint-disable-next-line id-match
const { businessGuide, fundingPrograms, forPartners, disasterAssistance, federalContracting } = TRANSLATIONS

// eslint-disable-next-line id-match
const SECTIONS = {
  businessGuide: TRANSLATIONS.businessGuide,
  fundingPrograms: TRANSLATIONS.fundingPrograms,
  forPartners: TRANSLATIONS.forPartners,
  disasterAssistance: TRANSLATIONS.disasterAssistance,
  federalContracting: TRANSLATIONS.federalContracting
}

const constants = {
  name: 'U.S. Small Business Administration',
  address: '409 3rd St, SW. Washington DC 20416',
  sectionTitles: {
    planYourBusiness: 'Plan your business',
    launchYourBusiness: 'Launch your business',
    manageYourBusiness: 'Manage your business',
    growYourBusiness: 'Grow your business',
    disasterAssistance: 'Disaster assistance',
    suretyProviders: 'Surety Providers',
    lenders: 'Lenders',
    // Spanish version:
    // Disaster Assistance
    spanishDisasterAssistance: 'Ayuda en desastres'
  },
  routes: {
    confirmationEmail: '/lendermatch/resend',
    submitForm: '/lendermatch/matchFormData',
    submitFeedbackResults: '/api/feedback',
    tenSteps: '/business-guide/10-steps-start-your-business/',
    submitProfile: '/actions/misc/resourceCenterProfile'
  },
  messages: {
    validation: {
      invalidName: 'Please enter your first and last name.',
      invalidPhoneNumber: 'Please enter your 10-digit phone number.',
      invalidEmail: 'Please enter a valid email address.',
      invalidZip: 'Please enter a valid 5-digit US zip code.',
      invalidIndustry: 'Please select at least 1 industry.',
      invalidIndustryExperience: 'Please estimate your experience.',
      invalidLoanUsage: 'Please select at least 1 use of funds.',
      invalidLoanDescription: 'Please provide a brief description.',
      invalidLoanAmount: 'The minimum loan amount is $500.',
      invalidNewsLetterEmail: 'Enter a valid email address.',
      invalidNewsLetterZipCode: 'Enter a 5 digit ZIP code.'
    }
  },
  eventCategories: {
    frontPage: 'Front-Page',
    learningCenter: 'Learning Center'
  }
}

export default constants

const { address, eventCategories, messages, name, routes, sectionTitles } = constants
export { address, eventCategories, messages, name, routes, sectionTitles }
export { SECTIONS }
