import _ from "lodash";
import resourceCenters from "./resource-centers.json";

const getPartners = () => {
  return Object.keys(resourceCenters);
};

const getPartnerOffices = (partner) => {
  return resourceCenters[partner];
};

const getOfficesByZip = (partner, zip) => {
  return _.filter(
    module.exports.getPartnerOffices(partner), // We use the module.exports version to ensure it can be mocked
    (office) => {
      return _.startsWith(office.zip, zip);
    }
  );
};

const getOfficesByState = (partner, state) => {
  return _.filter(
    module.exports.getPartnerOffices(partner), // We use the module.exports version to ensure it can be mocked
    (office) => {
      return office.state === state;
    }
  );
};

export { getPartners, getPartnerOffices, getOfficesByZip, getOfficesByState };
