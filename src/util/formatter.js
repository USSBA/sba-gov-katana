import sanitizeHtml from "sanitize-html";

function sanitizeTextSectionHtml(dirty) {
  let clean = "";
  try {
    clean = sanitizeHtml(dirty, {
      allowedTags: ["p", "strong", "em", "u", "hr", "a", "ol", "ul", "li", "dl", "dt", "dd", "table", "tbody", "thead", "tfoot", "tr", "td", "th"],
      allowedAttributes: {
        "a": ["href"]
      }
    });
  } catch (error) {
    console.error(error);
  }
  return clean;
}


export { sanitizeTextSectionHtml };
