import _ from "lodash";
import moment from "moment-timezone";
import jsonToCsv from "json2csv";


function formatFeedbackData(data) {
  const fields = _.without(_.keys(data[0]), "sourceIpAddress", "createdAt", "updatedAt");
  var newData = _.map(data, function(item) {
    return _.merge({}, item, {
      timestamp: moment.unix(item.timestamp).tz("UTC").format("YYYY-MM-DD HH:mm:SS")
    });
  });
  return jsonToCsv({
      data: newData,
      fields: fields
    }) + "\n";
}



export { formatFeedbackData };
