import _ from "lodash";

const themes = {
  "sba-blue": ["styleguide", "disaster"],
  "byzantine": ["guide", "business-guide"],
  "money-green": ["lendermatch", "funding-programs", "document", "article", "for-partners"],
  "cobalt-blue": []
};



function getTheme() {
  const theme = "sba-blue";
  const path = window.location.pathname.split("/")[1];
  return _.findKey(themes, function(object) {
    return _.includes(object, path);
  });
}

export { getTheme };
export default themes;
