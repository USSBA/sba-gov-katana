export function leaveSba(targetUrl) {
  return {
    type: "SHOW_MODAL",
    modalType: "LEAVE_SBA",
    modalProps: {
      targetUrl: targetUrl
    }
  };
}
