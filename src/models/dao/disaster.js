import { executeQuery } from "../drupal-db.js";

function fetchDescription() {
  return executeQuery("select body from block_custom where info = \"Apply For Disaster Loan Parature\";")
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
  return executeQuery("select region from block where delta = (SELECT bid FROM block_custom WHERE info = 'Apply For Disaster Loan Parature') and theme = 'smallbizd7';")
    .then(function(result) {
      let visible = false;
      if (result && result[0].region) {
        visible = result[0].region === "page_top_bar";
      }
      return visible;
    });
}


export { fetchDescription, fetchVisibility };
