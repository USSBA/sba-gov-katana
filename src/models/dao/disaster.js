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
;

export { fetchDescription };
