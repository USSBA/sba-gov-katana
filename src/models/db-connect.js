import config from "config";
import Sequelize from "sequelize";

var drupal = new Sequelize(config.get("database.drupal.databaseName"), config.get("database.drupal.user"), config.get("database.drupal.password"), {
  host: config.get("database.drupal.host"),
  dialect: "mysql",
  pool: config.get("database.pool")
});

var nonDrupal = new Sequelize(config.get("database.nonDrupal.databaseName"), config.get("database.nonDrupal.user"), config.get("database.nonDrupal.password"), {
  host: config.get("database.nonDrupal.host"),
  dialect: "mysql",
  pool: config.get("database.pool")
});


export { drupal, nonDrupal };
