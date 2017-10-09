import _ from "lodash";
import resourceCenters from "./resource-centers.json";

const getPartners = () => {
  return Object.keys(resourceCenters);
};

const getPartnerOffices = (partner) => {
  return resourceCenters[partner];
};

const getPartnersByZip = (partner, zip) => {
  return _.filter(
    module.exports.getPartnerOffices(partner), // We use the module.exports version to ensure it can be mocked
    (office) => {
      return _.startsWith(office.zip, zip);
    }
  );
};

export { getPartners, getPartnerOffices, getPartnersByZip };