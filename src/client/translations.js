// eslint-disable-next-line id-match
const SECONDARY_NAVIGATION_TRANSLATIONS = {
  translate: {
    en: {
      text: 'Translate'
    },
    es: {
      text: 'ES Translate'
    }
  },
  sbaEnEspanol: {
    en: {
      text: 'SBA en Español',
      url: '/anuncio-especial'
    },
    es: {
      text: 'SBA en Español',
      url: '/anuncio-especial'
    }
  },
  forPartners: {
    en: {
      text: 'For Partners',
      url: '/partners'
    },
    es: {
      text: 'ES For Partners',
      url: '/es/partners'
    }
  },
  newsroom: {
    en: {
      text: 'Newsroom',
      url: '/about-sba/sba-newsroom'
    },
    es: {
      text: 'ES Newsroom',
      url: '/es/about-sba/sba-newsroom'
    }
  },
  contactUs: {
    en: {
      text: 'Contact Us',
      url: '/about-sba/what-we-do/contact-sba'
    },
    es: {
      text: 'ES Contact Us',
      url: '/es/about-sba/what-we-do/contact-sba'
    }
  },
  register: {
    en: {
      text: 'Register',
      url: '/user/register'
    },
    es: {
      text: 'ES Register',
      url: '/es/user/register'
    }
  },
  login: {
    en: {
      text: 'Login',
      url: '/user/login'
    },
    es: {
      text: 'ES Login',
      url: '/es/user/login'
    }
  },
  adminTool: {
    en: {
      text: 'Admin Tool',
      url: '/admintool'
    },
    es: {
      text: 'ES Admin Tool',
      url: '/es/admintool'
    }
  },
  myAccount: {
    en: {
      text: 'My Account',
      url(id) {
        return `/user/${id}/edit`
      }
    },
    es: {
      text: 'ES My Account',
      url(id) {
        return `/es/user/${id}/edit`
      }
    }
  },
  logOut: {
    en: {
      text: 'Log Out',
      url: '/user/logout'
    },
    es: {
      text: 'ES Log Out',
      url: '/es/user/logout'
    }
  },
  sbaNearYou: {
    en: {
      text: 'SBA Near You',
      url: '/tools/local-assistance#locations-page'
    },
    es: {
      text: 'ES SBA Near You',
      url: '/tools/local-assistance#locations-page'
    }
  },
  smallBusinessEvents: {
    en: {
      text: 'Small Business Events',
      url: '/tools/events#events-page'
    },
    es: {
      text: 'ES Small Business Events',
      url: '/tools/events#events-page'
    }
  }
}

// eslint-disable-next-line id-match
const MISC_TRANSLATIONS = {
  content: {
    en: 'Content',
    es: 'Contenidos'
  }
}

// eslint-disable-next-line id-match
const TEN_STEPS_CALLOUTS_TRANSLATIONS = {
  navigation: {
    en: {
      headline: 'Not sure where to start? Start your business in 10 steps.',
      linkText: 'See the guide'
    },
    es: {
      headline: 'No estás seguro por dónde empezar? Comience su negocio en 10 pasos.',
      linkText: 'Ver la guía'
    }
  },
  panel: {
    en: {
      headline: 'Start your business in 10 steps',
      linkText: 'See the guide'
    },
    es: {
      headline: 'Comience su negocio en 10 pasos',
      linkText: 'Ver la guía'
    }
  }
}

export {
  MISC_TRANSLATIONS,
  TEN_STEPS_CALLOUTS_TRANSLATIONS,
  SECONDARY_NAVIGATION_TRANSLATIONS
}
