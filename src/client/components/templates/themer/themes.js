import _ from "lodash";

const themes = {
  "sba-blue": ["styleguide"],
  "byzantine": ["guide", "business-guide"],
  "money-green": ["lendermatch", "funding-programs", "document", "article", "partners", "disaster-assistance"],
  "cobalt-blue": []
};

function getPaths() {
  return _.chain(themes)
    .values()
    .flatten()
    .value();
}

function getTheme() {
  const theme = "sba-blue";
  const path = window.location.pathname.split("/")[1];
  return _.findKey(themes, function(object) {
    return _.includes(object, path);
  });
}

export { getTheme, getPaths };
export default themes;
