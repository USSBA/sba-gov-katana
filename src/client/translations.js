// eslint-disable-next-line id-match
const SECONDARY_NAVIGATION_TRANSLATIONS = {
  translate: {
    en: {
      text: 'Translate'
    },
    es: {
      text: 'Traducir'
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
      text: 'Área de socios',
      url: '/partners'
    }
  },
  newsroom: {
    en: {
      text: 'Newsroom',
      url: '/about-sba/sba-newsroom'
    },
    es: {
      text: 'Sala de prensa',
      url: '/about-sba/sba-newsroom'
    }
  },
  contactUs: {
    en: {
      text: 'Contact Us',
      url: '/about-sba/what-we-do/contact-sba'
    },
    es: {
      text: 'Contacte',
      url: '/about-sba/what-we-do/contact-sba'
    }
  },
  register: {
    en: {
      text: 'Register',
      url: '/user/register'
    },
    es: {
      text: 'Regístrese',
      url: '/user/register'
    }
  },
  login: {
    en: {
      text: 'Login',
      url: '/user/login'
    },
    es: {
      text: 'Acceda',
      url: '/user/login'
    }
  },
  adminTool: {
    en: {
      text: 'Admin Tool',
      url: '/admintool'
    },
    es: {
      text: 'Administrar',
      url: '/admintool'
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
      text: 'Mi cuenta',
      url(id) {
        return `/user/${id}/edit`
      }
    }
  },
  logOut: {
    en: {
      text: 'Log Out',
      url: '/user/logout'
    },
    es: {
      text: 'Cerrar sesión',
      url: '/user/logout'
    }
  },
  sbaNearYou: {
    en: {
      text: 'SBA Near You',
      url: '/tools/local-assistance#locations-page'
    },
    es: {
      text: 'SBA en tu zona',
      url: '/tools/local-assistance#locations-page'
    }
  },
  smallBusinessEvents: {
    en: {
      text: 'Small Business Events',
      url: '/tools/events#events-page'
    },
    es: {
      text: 'Eventos para pequeñas empresas',
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
      headline: '¿No sabe por dónde empezar? Siga estos 10 pasos.',
      linkText: 'Vea la guía'
    }
  },
  panel: {
    en: {
      headline: 'Start your business in 10 steps',
      linkText: 'See the guide'
    },
    es: {
      headline: 'Abra su empresa siguiendo estos 10 pasos',
      linkText: 'Vea la guía'
    }
  }
}

export {
  MISC_TRANSLATIONS,
  TEN_STEPS_CALLOUTS_TRANSLATIONS,
  SECONDARY_NAVIGATION_TRANSLATIONS
}
