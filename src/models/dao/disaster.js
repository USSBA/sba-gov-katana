import { executeQuery } from "../drupal-db.js";

function fetchDescription() {
  return executeQuery('select body from block_custom where info = "Apply For Disaster Loan Parature";')
    .then(function(result) {
      let description = "";
      if (result && result[0].body) {
        let divResult = /<div class='disaster-description'>.*<\/div>/.exec(result[0].body);
        if (divResult) {
          let descriptionResult = /<div class='disaster-description'>(.*)<\/div>/.exec(divResult[0]);
          if (descriptionResult && descriptionResult.length > 1) {
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
        visible = "page_top_bar" === result[0].region;
      }
      return visible;
    });
}


export { fetchDescription, fetchVisibility };
