import Promise from "bluebird";

var masterHardCodedMenu = [{
  "link": "starting-managing-business",
  "linkTitle": "Starting & Managing",
  "children": [{
    "link": "starting-business",
    "linkTitle": "Starting a Business",
    "children": [{
      "link": "starting-business/how-start-business",
      "linkTitle": "How to Start a Business"
    }, {
      "link": "starting-business/write-your-business-plan",
      "linkTitle": "Write Your Business Plan"
    }, {
      "link": "starting-business/choose-your-business-structure",
      "linkTitle": "Choose Your Business Structure"
    }, {
      "link": "starting-business/choose-register-your-business",
      "linkTitle": "Choose & Register Your Business"
    }, {
      "link": "starting-business/choose-your-business-location-equipment",
      "linkTitle": "Choose Your Business Location & Equipment"
    }, {
      "link": "starting-business/business-licenses-permits",
      "linkTitle": "Business Licenses & Permits"
    }, {
      "link": "starting-business/learn-about-business-laws",
      "linkTitle": "Learn About Business Laws"
    }, {
      "link": "starting-business/business-financials",
      "linkTitle": "Business Financials"
    }, {
      "link": "starting-business/finance-your-business",
      "linkTitle": "Finance Your Business"
    }, {
      "link": "starting-business/filing-paying-taxes",
      "linkTitle": "Filing & Paying Taxes"
    }, {
      "link": "starting-business/hire-retain-employees",
      "linkTitle": "Hire & Retain Employees"
    }]
  }, {
    "link": "managing-business",
    "linkTitle": "Managing a Business",
    "children": [{
      "link": "managing-business/running-business",
      "linkTitle": "Running a Business"
    }, {
      "link": "managing-business/leading-your-business",
      "linkTitle": "Leading Your Business"
    }, {
      "link": "managing-business/growing-your-business",
      "linkTitle": "Growing Your Business"
    }, {
      "link": "managing-business/business-law-regulations",
      "linkTitle": "Business Law & Regulations"
    }, {
      "link": "managing-business/business-guides-industry",
      "linkTitle": "Business Guides by Industry"
    }, {
      "link": "managing-business/exporting",
      "linkTitle": "Exporting"
    }, {
      "link": "managing-business/closing-down-your-business",
      "linkTitle": "Closing Down Your Business"
    }, {
      "link": "managing-business/cybersecurity",
      "linkTitle": "Cybersecurity"
    }, {
      "link": "managing-business/forms",
      "linkTitle": "Forms"
    }]
  }]
}, {
  "link": "loans-grants",
  "linkTitle": "Loans & Grants",
  "children": [{
    "link": "loans-grants/see-what-sba-offers",
    "linkTitle": "See What SBA Offers",
    "children": [{
      "link": "loans-grants/see-what-sba-offers/sba-loan-programs",
      "linkTitle": "SBA Loan Programs"
    }, {
      "link": "sbic",
      "linkTitle": "SBIC Investments"
    }, {
      "link": "surety-bonds",
      "linkTitle": "Surety Bonds"
    }, {
      "link": "loans-grants/see-what-sba-offers/what-sba-doesnt-offer",
      "linkTitle": "What SBA Doesn't Offer"
    }]
  }, {
    "link": "loans-grants/connect-sba-lenders",
    "linkTitle": "Connect with SBA Lenders",
    "children": [{
      "link": "tools/linc",
      "linkTitle": "SBA LINC Tool"
    }]
  }, {
    "link": "loans-grants/get-ready-apply",
    "linkTitle": "Get Ready to Apply",
    "children": [{
      "link": "loans-grants/get-ready-apply/check-your-credit",
      "linkTitle": "Check Your Credit"
    }, {
      "link": "loans-grants/get-ready-apply/determine-your-financial-needs",
      "linkTitle": "Determine Your Financial Needs"
    }, {
      "link": "loans-grants/get-ready-apply/gather-info-youll-need",
      "linkTitle": "Gather the Info You'll Need"
    }]
  }, {
    "link": "loans-grants/find-other-sources-financing",
    "linkTitle": "Find Other Sources for Financing",
    "children": [{
      "link": "starting-business/finance-your-business/venture-capital/venture-capital",
      "linkTitle": "Venture Capital"
    }, {
      "link": "node/13710",
      "linkTitle": "BusinessUSA Financing Tool"
    }, {
      "link": "loans-grants/find-other-sources-financing/research-grants-small-businesses",
      "linkTitle": "Research Grants for Small Businesses"
    }]
  }],
  "featuredCallout": {
    "title": "Need Disaster Assistance? Find information about how to apply online",
    "image": "/sites/default/files/files/disaster.png",
    "text": " Apply for disaster assistance.",
    "target": "/content/apply-disaster-loan"
  }
}, {
  "link": "contracting",
  "linkTitle": "Contracting",
  "children": [{
    "link": "contracting/what-government-contracting",
    "linkTitle": "What is Government Contracting?",
    "children": [{
      "link": "contracting/what-government-contracting/overview",
      "linkTitle": "Overview"
    }, {
      "link": "contracting/what-government-contracting/sbas-role-government-contracting",
      "linkTitle": "SBA's Role in Government Contracting"
    }, {
      "link": "contracting/what-government-contracting/your-responsibilities-contractor",
      "linkTitle": "Your Responsibilities as a Contractor"
    }]
  }, {
    "link": "contracting/resources-small-businesses",
    "linkTitle": "Resources for Small Businesses",
    "children": [{
      "link": "contracting/resources-small-businesses/government-contracting-classroom",
      "linkTitle": "Government Contracting Classroom"
    }, {
      "link": "contracting/resources-small-businesses/commercial-market-representatives",
      "linkTitle": "Commercial Market Representatives"
    }, {
      "link": "contracting/resources-small-businesses/procurement-center-representatives",
      "linkTitle": "Procurement Center Representatives"
    }, {
      "link": "contracting/resources-small-businesses/certificates-competency",
      "linkTitle": "Certificates of Competency"
    }, {
      "link": "contracting/resources-small-businesses/report-fraud-waste-abuse",
      "linkTitle": "Report Fraud"
    }]
  }, {
    "link": "contracting/getting-started-contractor",
    "linkTitle": "Getting Started as a Contractor",
    "children": [{
      "link": "contracting/getting-started-contractor/qualifying-small-business",
      "linkTitle": "Qualifying as a Small Business"
    }, {
      "link": "contracting/getting-started-contractor/determine-your-naics-code",
      "linkTitle": "Determine Your NAICS Code"
    }, {
      "link": "contracting/getting-started-contractor/make-sure-you-meet-sba-size-standards",
      "linkTitle": "Make Sure You Meet SBA Size Standards"
    }, {
      "link": "contracting/getting-started-contractor/get-d-u-n-s-number",
      "linkTitle": "Get a D-U-N-S Number"
    }, {
      "link": "contracting/getting-started-contractor/register-government-contracting",
      "linkTitle": "Register for Government Contracting"
    }]
  }, {
    "link": "contracting/government-contracting-programs",
    "linkTitle": "Government Contracting Programs",
    "children": [{
      "link": "contracting/government-contracting-programs/what-small-business-set-aside",
      "linkTitle": "What is a Small Business Set Aside?"
    }, {
      "link": "contracting/government-contracting-programs/women-owned-small-businesses",
      "linkTitle": "Women-Owned Small Businesses"
    }, {
      "link": "contracting/government-contracting-programs/8a-business-development-program",
      "linkTitle": "8(a) Business Development"
    }, {
      "link": "contracting/government-contracting-programs/hubzone-program",
      "linkTitle": "HUBZone Program"
    }, {
      "link": "contracting/government-contracting-programs/service-disabled-veteran-owned-businesses",
      "linkTitle": "Service-Disabled Veterans"
    }, {
      "link": "contracting/government-contracting-programs/small-disadvantaged-businesses",
      "linkTitle": "Small Disadvantaged Businesses"
    }, {
      "link": "https://www.sba.gov/navigation-structure/all-small-mentor-protege-program",
      "linkTitle": "All Small Mentor-Protégé Program"
    }]
  }, {
    "link": "contracting/finding-government-customers",
    "linkTitle": "Finding Government Customers",
    "children": [{
      "link": "contracting/finding-government-customers/contracting-resources-small-businesses",
      "linkTitle": "Contracting Resources for Small Businesses"
    }, {
      "link": "contracting/finding-government-customers/subcontracting",
      "linkTitle": "Subcontracting"
    }, {
      "link": "contracting/finding-government-customers/see-agency-small-business-scorecards",
      "linkTitle": "See Agency Small Business Scorecards"
    }]
  }, {
    "link": "contracting/contracting-officials",
    "linkTitle": "For Contracting Officials"
  }]
}, {
  "link": "tools/sba-learning-center/search/training",
  "linkTitle": "Learning Center"
}, {
  "link": "tools/local-assistance",
  "linkTitle": "Local Assistance",
  "children": [{
    "link": "tools/local-assistance",
    "linkTitle": "SBA Offices and Resource Partners",
    "children": [{
      "link": "tools/local-assistance/districtoffices",
      "linkTitle": "SBA District Offices"
    }, {
      "link": "tools/local-assistance/regionaloffices",
      "linkTitle": "SBA Regional Offices"
    }, {
      "link": "tools/local-assistance/disasteroffices",
      "linkTitle": "Disaster Field Offices"
    }, {
      "link": "tools/local-assistance/score",
      "linkTitle": "SCORE Business Mentors"
    }, {
      "link": "tools/local-assistance/sbdc",
      "linkTitle": "Small Business Development Centers"
    }, {
      "link": "tools/local-assistance/wbc",
      "linkTitle": "Women's Business Centers"
    }, {
      "link": "tools/local-assistance/eac",
      "linkTitle": "U.S. Export Assistance Centers"
    }, {
      "link": "tools/local-assistance/vboc",
      "linkTitle": "Veteran's Business Outreach Centers"
    }, {
      "link": "tools/local-assistance/cdc",
      "linkTitle": "Certified Development Companies"
    }, {
      "link": "tools/local-assistance/ptac",
      "linkTitle": "Procurement Technical Assistance Centers"
    }]
  }]
}, {
  "link": "about-sba",
  "linkTitle": "About SBA",
  "children": [{
    "link": "about-sba/what-we-do",
    "linkTitle": "What We Do",
    "children": [{
      "link": "about-sba/what-we-do/mission",
      "linkTitle": "Mission"
    }, {
      "link": "about-sba/what-we-do/history",
      "linkTitle": "History"
    }]
  }, {
    "link": "about-sba/sba-performance",
    "linkTitle": "SBA Performance",
    "children": [{
      "link": "about-sba/sba-performance/policy-regulations",
      "linkTitle": "Policy & Regulations"
    }, {
      "link": "about-sba/sba-performance/strategic-planning",
      "linkTitle": "Strategic Planning"
    }, {
      "link": "about-sba/sba-performance/performance-budget-finances",
      "linkTitle": "Performance & Budget"
    }, {
      "link": "about-sba/sba-performance/open-government",
      "linkTitle": "Open Government"
    }]
  }, {
    "link": "about-sba/oversight-advocacy",
    "linkTitle": "Oversight & Advocacy",
    "children": [{
      "link": "advocacy",
      "linkTitle": "Advocacy"
    }, {
      "link": "ombudsman",
      "linkTitle": "Ombudsman"
    }, {
      "link": "office-of-inspector-general",
      "linkTitle": "Inspector General"
    }, {
      "link": "oha",
      "linkTitle": "Hearings & Appeals"
    }]
  }, {
    "link": "about-sba/sba-team",
    "linkTitle": "SBA Team",
    "children": [{
      "link": "about-sba/sba-team/jobs-sba",
      "linkTitle": "Jobs at SBA"
    }, {
      "link": "about-sba/sba-team/sba-leadership",
      "linkTitle": "SBA Leadership"
    }]
  }, {
    "link": "about-sba/sba-locations",
    "linkTitle": "SBA Locations",
    "children": [{
      "link": "about-sba/sba-locations/headquarters-offices",
      "linkTitle": "Headquarters Offices"
    }, {
      "link": "tools/local-assistance/districtoffices",
      "linkTitle": "District Offices"
    }, {
      "link": "tools/local-assistance/regionaloffices",
      "linkTitle": "Regional Offices"
    }, {
      "link": "tools/local-assistance/disasteroffices",
      "linkTitle": "Disaster Offices"
    }]
  }, {
    "link": "about-sba/sba-newsroom",
    "linkTitle": "SBA Newsroom"
  }, {
    "link": "about-sba/sba-initiatives",
    "linkTitle": "SBA Initiatives"
  }]
}];


function fetchMainMenu() {
  return Promise.resolve(masterHardCodedMenu);
}

export { fetchMainMenu };
