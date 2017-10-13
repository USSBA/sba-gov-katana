import HttpStatus from "http-status-codes";

function getNaics(req, res) {
  const data = [{
    "code": "111110",
    "description": "Soybean Farming",
    "sectorId": "11",
    "sectorDescription": "Agriculture, Forestry, Fishing and Hunting",
    "subsectorId": "111",
    "subsectorDescription": "Crop Production",
    "revenueLimit": 0.75,
    "employeeCount": null,
    "footnote": null,
    "parent": null,
    "assetLimit": null
  },
    {
      "code": "611519",
      "description": "Other Technical and Trade Schools",
      "sectorId": "61",
      "sectorDescription": "Educational Services",
      "subsectorId": "611",
      "subsectorDescription": "Educational Services",
      "revenueLimit": 15,
      "employeeCount": null,
      "footnote": null,
      "parent": null,
      "assetLimit": null
    },
    {
      "code": "611519_Except",
      "description": "Job Corps Centers",
      "sectorId": "61",
      "sectorDescription": "Educational Services",
      "subsectorId": "611",
      "subsectorDescription": "Educational Services",
      "revenueLimit": 38.5,
      "employeeCount": null,
      "footnote": [
        "NAICS code 611519 – Job Corps Centers.  For classifying a Federal procurement, the purpose of the solicitation must be for the management and operation of a U.S. Department of Labor Job Corps Center.  The activities involved include admissions activities, life skills training, educational activities, comprehensive career preparation activities, career development activities, career transition activities, as well as the management and support functions and services needed to operate and maintain the facility.  For SBA assistance as a small business concern, other than for Federal Government procurements, a concern must be primarily engaged in providing the services to operate and maintain Federal Job Corps Centers. "
      ],
      "parent": "611519",
      "assetLimit": null
    }
  ];
  res.status(HttpStatus.OK).send(JSON.stringify(data));
}

function getNaicsById(req, res) {
  if (req.params && req.params.id) {
    const data = {
      "code": "111110",
      "description": "Soybean Farming",
      "sectorId": "11",
      "sectorDescription": "Agriculture, Forestry, Fishing and Hunting",
      "subsectorId": "111",
      "subsectorDescription": "Crop Production",
      "revenueLimit": 0.75,
      "employeeCount": null,
      "footnote": null,
      "parent": null,
      "assetLimit": null
    };
    res.status(HttpStatus.OK).send(JSON.stringify(data));
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Missing user id.");
  }
}


function getNaicsPropertyById(req, res) {
  if (req.params && req.params.id && req.params.property) {
    res.status(HttpStatus.OK).send("This is a the value of " + req.params.property + " for naics code " + req.params.id);
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Missing user id.");
  }
}


function determineIfSmallBusiness(req, res) {
  if (req.query && req.query.code) {
    res.status(HttpStatus.OK).send(true);
  } else {
    res.status(HttpStatus.BAD_REQUEST).send("Missing query param code");
  }
}


export { getNaics, getNaicsById, getNaicsPropertyById, determineIfSmallBusiness };
