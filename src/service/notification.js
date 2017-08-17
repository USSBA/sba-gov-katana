import { fetchAnnouncements } from "./drupal-eight.js";

function fetchNotification(req, res) {
  return fetchAnnouncements().then((allAnnouncements) => {
    let activeAnnouncment = null;
    // Avery put logic here
    activeAnnouncment = allAnnouncements[0];
    return activeAnnouncment;
  });
}

export { fetchNotification };
