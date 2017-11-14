import querystring from "querystring";
import moment from "moment";
import _ from "lodash";

function getCurrentFile(files, oneFile) {
  let found = null;
  if (files && files.length > 0) {
    found = _.chain(files)
      .filter((file) => {
        const {effectiveDate} = file;
        const date = moment(effectiveDate);
        return date.isValid && date.isSameOrBefore(moment());
      })
      .sortBy("effectiveDate")
      .last()
      .value();

    if (!found) {
      found = files[0];
    }
  } else if (oneFile) {
    found = {
      fileUrl: oneFile
    };
  }
  return found;
}

function getQueryParams() {
  let queryParams = {};
  const {search} = window.location;
  if (search && search !== "") {
    queryParams = querystring.decode(search.replace("?", ""));
  }
  return queryParams;
}

export { getCurrentFile, getQueryParams };
