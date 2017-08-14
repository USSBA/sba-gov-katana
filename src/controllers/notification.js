import HttpStatus from "http-status-codes";

function fetchNotification(req, res) {

  const mockData = {
    "expiration": "2017-08-20T15:51:07",
    "start": "2017-08-10T12:00:00",
    "url": "https://www.google.com",
    "visibleOnUrls": "/\r\n/funding-programs\r\n/funding-programs/*",
    "type": "announcement",
    "title": "This is an Important Announcement",
    "id": 3411,
    "updated": 1502383545
  };

  res.status(HttpStatus.OK).send(JSON.stringify(mockData));

//return mockData;
}

export { fetchNotification };
