import { executeDrupalQuery } from "../drupal-db.js";
import Promise from "bluebird";



function fetchDescription() {
  return executeDrupalQuery("select body from block_custom where info = \"Apply For Disaster Loan Parature\";")
    .then(function(result) {
      let description = "";
      const minLength = 1;
      if (result && result[0].body) {
        const divResult = (/<div class='disaster-description'>.*<\/div>/).exec(result[0].body);
        if (divResult) {
          const descriptionResult = (/<div class='disaster-description'>(.*)<\/div>/).exec(divResult[0]);
          if (descriptionResult && descriptionResult.length > minLength) {
            description = descriptionResult[1];
          }
        }
      }
      return description;
    });
}

function fetchVisibility() {
  return executeDrupalQuery("select region from block where delta = (SELECT bid FROM block_custom WHERE info = 'Apply For Disaster Loan Parature') and theme = 'smallbizd7';")
    .then(function(result) {
      let visible = false;
      if (result && result[0].region) {
        visible = result[0].region === "page_top_bar";
      }
      return visible;
    });
}


function fetchDisasterFromDrupalDatabase() {
  return Promise.all([fetchDescription(), fetchVisibility()])
    .spread((description, visible) => {
      return {
        description: description,
        visible: visible
      };
    });
}

export { fetchDisasterFromDrupalDatabase };
