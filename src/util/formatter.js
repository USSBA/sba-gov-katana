import sanitizeHtml from "sanitize-html";
import jsonToCsv from "json2csv";
import _ from "lodash";
import moment from "moment";

function sanitizeTextSectionHtml(dirty) {
  let clean = "";
  try {
    clean = sanitizeHtml(dirty, {
      allowedTags: ["p", "strong", "em", "u", "hr", "a", "ol", "ul", "li", "dl", "dt", "dd", "table", "tbody", "thead", "tfoot", "tr", "td", "th"],
      allowedAttributes: {
        "a": ["href"],
        "td": ["rowspan"]
      }
    });
  } catch (error) {
    console.error(error);
  }
  return clean;
}


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

export { sanitizeTextSectionHtml, formatFeedbackData };
