export function leaveSba(targetUrl) {
  return {
    type: "SHOW_MODAL",
    modalType: "LEAVE_SBA",
    modalProps: {
      targetUrl: targetUrl
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
