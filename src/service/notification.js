import { fetchAnnouncements } from "./drupal-eight.js";

function fetchNotification(req, res) {

  return fetchAnnouncements().then((allAnnouncements) => {

    /*
     1. sort announcements by end date in reverse chronological order
     2. filter announcements array into activeAnnouncements array
        - if end date is greater than today's date
    	    AND if start date is less than or equal to today's date
     3. return the first item in the activeAnnouncements array
	   */

    // 1. sort announcements by expiration date in reverse-chronological order
    allAnnouncements.sort((__a, __b) => {

      const ___a = new Date(__a.expiration);
      const ___b = new Date(__b.expiration);
      let result = 0;
      const negativeOne = -1;

      if (___a > ___b) {

        result = negativeOne;

      } else if (___a < ___b) {

        result = 1;

      }

      return result;

    });

    // 2. filter announcements whose expiration and start dates overlap today's date
    const activeAnnouncements = allAnnouncements.filter((announcement) => {

      // if current date is less than the expiration date
      // AND greater than the start date
      // return announcement

      const today = new Date();

      return (today < new Date(announcement.expiration) && today >= new Date(announcement.start));

    });

    let activeAnnouncment;

    // 3. return the first active announcement
    // if activeAnnouncements array length is greater than 0
    // return first active announcement

    if (activeAnnouncements.length > 0) {
      activeAnnouncment = activeAnnouncements[0];
    }

    return activeAnnouncment;

  });
}

export { fetchNotification };
