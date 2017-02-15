/**
 * Created by aadeogun on 2/13/17.
 */
import { executeQuery } from "../drupal-db.js";

class MainMenu {
  fetchMainMenuFromDB() {
    return new Promise((resolve) => {
      const sqlQuery = "select mlid, plid, link_path, link_title, hidden from menu_links where menu_name = 'main-menu'";
      executeQuery(sqlQuery).then(function(rows) {
        console.log(rows);
        resolve(rows);
      }).catch(function(err) {
        console.log(err);
      });
    }

    ).catch(function(error) {
      console.log(error);
    });

  }
}

module.exports = MainMenu;