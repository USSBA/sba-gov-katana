export function leaveSba(targetUrl) {
  return {
    type: "SHOW_MODAL",
    modalType: "LEAVE_SBA",
    modalProps: {
      targetUrl: targetUrl
    }
  };
}

export function showSbaNewsletter(userEmail) {
  return {
    type: "SHOW_NEWSLETTER_MODAL",
    modalType: "SBA_NEWSLETTER",
    modalProps: {
      userEmail: userEmail
    }
  };
}

export function navigateLeaveSba() {
  return {
    type: "NAVIGATE_MODAL"
  };
}

export function closeLeaveSba() {
  return {
    type: "CLOSE_MODAL"
  };
}

export function closeSbaNewsletter() {
  return {
    type: "CLOSE_MODAL"
  };
}

export function showMobileSectionNav(menuData, icon, backUrl) {
  return {
    type: "SHOW_MODAL",
    modalType: "MOBILE_SECTION_NAV",
    modalProps: {
      menuData: menuData,
      icon: icon,
      backUrl: backUrl
    }
  };
}

export function closeMobileNav() {
  return {
    type: "CLOSE_MODAL"
  };
}
