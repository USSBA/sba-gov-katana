const constants = {
  name: "U.S. Small Business Administration",
  address: "409 3rd St, SW. Washington DC 20416",
  sections: {
    businessGuide: "Business Guide",
    fundingPrograms: "Funding Programs"
  },
  routes: {
    confirmationEmail: "/lendermatch/resend",
    submitForm: "/lendermatch/matchFormData",
    submitFeedbackResults: "/actions/feedback/",
    submitFeedbackText: "/actions/feedback/{id}/text",
    tenSteps: "/business-guide/10-steps-start-your-business/"
  },
  messages: {
    validation: {
      invalidName: "Please enter your first and last name.",
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
  },
  footer: {
    mobile: [{
      text: "What we do",
      url: "/about-sba/what-we-do"
    }, {
      text: "SBA News Room",
      url: "/about-sba/sba-newsroom"
    }, {
      text: "FOIA",
      url: "/about-sba/sba-performance/open-government/foia"
    }, {
      text: "Contact SBA",
      url: "/about-sba/what-we-do/contact-sba"
    }, {
      text: "SBA en Español",
      url: "https://es.sba.gov/"
    }, {
      text: "SBA Team",
      url: "/about-sba/sba-team"
    }, {
      text: "SBA Performance",
      url: "/about-sba/sba-performance"
    }, {
      text: "Oversight & Advocacy",
      url: "/about-sba/oversight-advocacy"
    }, {
      text: "Privacy Policy",
      url: "/about-sba/sba-performance/open-government/about-sbagov-website/privacy-policy"
    }, {
      text: "Blog",
      url: "/blogs"
    }],
    tablet: [{
      text: "What we do",
      url: "/about-sba/what-we-do"
    }, {
      text: "SBA Performance",
      url: "/about-sba/sba-performance"
    }, {
      text: "Contact SBA",
      url: "/about-sba/what-we-do/contact-sba"
    }, {
      text: "SBA Team",
      url: "/about-sba/sba-team"
    }, {
      text: "FOIA",
      url: "/about-sba/sba-performance/open-government/foia"
    }, {
      text: "Privacy Policy",
      url: "/about-sba/sba-performance/open-government/about-sbagov-website/privacy-policy"
    }, {
      text: "SBA News Room",
      url: "/about-sba/sba-newsroom"
    }, {
      text: "Oversight & Advocacy",
      url: "/about-sba/oversight-advocacy"
    }, {
      text: "SBA en Español",
      url: "https://es.sba.gov/"
    }],
    desktop: [{
      "title": "Customer Service",
      "links": [{
        "url": "/about-sba",
        "text": "About SBA"
      },
        {
          "url": "/about-sba/what-we-do/contact-sba",
          "text": "Contact SBA"
        },
        {
          "url": "https://es.sba.gov/",
          "text": "En Español"
        },
        {
          "url": "/about-sba/sba-newsroom",
          "text": "Media and Press Relations"
        },
        {
          "url": "/about-sba/sba-locations",
          "text": "SBA Locations"
        },
        {
          "url": "/about-sba/sba-team",
          "text": "SBA Team"
        }
      ]
    }, {
      "title": "About SBA.gov",
      "links": [{
        "url": "/sitemap",
        "text": "Site Map"
      },
        {
          "url": "/about-sba/sba-performance/open-government/about-sbagov-website/privacy-policy",
          "text": "Privacy Policy"
        },
        {
          "url": "/about-sba/sba-performance/open-government/about-sbagov-website/linking-policy",
          "text": "Linking Policy"
        },
        {
          "url": "/about-sba/sba-performance/open-government/about-sbagov-website/accessibility",
          "text": "Accessibility"
        },
        {
          "url": "/about-sba/sba-performance/open-government/about-sbagov-website/disclaimer",
          "text": "Disclaimers"
        },
        {
          "url": "/about-sba/sba-performance/open-government/about-sbagov-website/social-media",
          "text": "Social Media"
        },
        {
          "url": "/about-sba/sba-performance/open-government/digital-sba/open-data",
          "text": "Data Store"
        },
        {
          "url": "/blogs",
          "text": "Blog"
        }
      ]
    }, {
      "title": "SBA Information",
      "links": [{
        "url": "/about-sba/sba-performance/open-government/foia",
        "text": "Freedom of Information Act"
      },
        {
          "url": "/about-sba/sba-performance/open-government/about-sbagov-website/no-fear-act",
          "text": "No Fear Act"
        },
        {
          "url": "/category/navigation-structure/contracting/contracting-officials/report-fraud-waste-abuse",
          "text": "Report Fraud, Waste and Abuse"
        },
        {
          "url": "/about-sba/sba-initiatives",
          "text": "Initiatives"
        },
        {
          "url": "/about-sba/sba-performance/open-government/other-plans-reports/plain-language-page",
          "text": "Plain Language"
        }
      ]
    }, {
      "title": "SBA Performance",
      "links": [{
        "url": "/about-sba/sba-performance/strategic-planning",
        "text": "Strategic Planning"
      },
        {
          "url": "/about-sba/sba-performance/performance-budget-finances",
          "text": "Performance, Budget & Financing"
        },
        {
          "url": "/about-sba/sba-performance/open-government",
          "text": "Open Government"
        },
        {
          "url": "/about-sba/sba-performance/policy-regulations",
          "text": "Policy and Regulations"
        },
        {
          "url": "/about-sba/sba-performance/policy-regulations/eliminating-fraud-waste-abuse",
          "text": "Eliminating Fraud, Waste, and Abuse "
        }
      ]
    }, {
      "title": "Oversight",
      "links": [{
        "url": "/office-of-inspector-general",
        "text": "Inspector General"
      },
        {
          "url": "/advocacy",
          "text": "Advocacy"
        },
        {
          "url": "/oha",
          "text": "Hearings and Appeals"
        },
        {
          "url": "/ombudsman",
          "text": "Ombudsman"
        },
        {
          "url": "https://www.whitehouse.gov",
          "text": "WhiteHouse.gov"
        },
        {
          "url": "https://www.usa.gov",
          "text": "USA.gov"
        },
        {
          "url": "https://www.regulations.gov",
          "text": "Regulations.gov"
        }
      ]
    }, {
      "title": "Tools and Features",
      "links": [{
        "url": "/tools/sba-learning-center/search/training",
        "text": "Online Training"
      },
        {
          "url": "/tools/business-plan",
          "text": "Create a Business Plan"
        },
        {
          "url": "/tools/events",
          "text": "Find Events"
        },
        {
          "url": "/tools/size-standards-tool",
          "text": "Qualify for Government Contracts"
        },
        {
          "url": "/videos",
          "text": "SBA Videos"
        }
      ]
    }]
  }
};

export default constants;
