import sanitizeHtml from "sanitize-html";
import jsonToCsv from "json2csv";
import _ from "lodash";
import moment from "moment-timezone";
import path from "path";
import { transliterate } from "transliteration";

function sanitizeTextSectionHtml(dirty) {
  let clean = "";
  try {
    clean = sanitizeHtml(dirty, {
      allowedTags: ["p", "strong", "em", "u", "hr", "a", "ol", "ul", "li", "dl", "dt", "dd", "table", "tbody", "thead", "tfoot", "tr", "td", "th"],
      allowedAttributes: {
        "a": ["href"],
        "td": ["rowspan"],
        "th": ["scope"]
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

function formatUrl(url, title) {
  if (url && !url.match(/\/node\/\d*/)) {
    const withoutTrailingSlack = _.trim(url, "/");
    return _.last(withoutTrailingSlack.split(path.sep));
  }
  const lower = title.toLowerCase();
  const transliterated = transliterate(lower);
  const punctuationless = transliterated.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
  const withoutExtraWhitespace = punctuationless.replace(/\s{2,}/g, " ");
  const words = _.words(withoutExtraWhitespace);
  const withoutUselessWords = _.without(words, "a", "am", "an", "and", "as", "at", "for", "of", "on", "or", "the", "to", "too", "with", "but", "by", "for", "from", "this", "that", "with");
  const finalString = _.kebabCase(withoutUselessWords);
  return finalString;
}


function formatForUrl(string) {
  const lower = string.toLowerCase();
  const finalString = _.kebabCase(lower);
  return finalString;
}


export { sanitizeTextSectionHtml, formatFeedbackData, formatUrl, formatForUrl };
