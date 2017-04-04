import { executeQuery } from "../drupal-db.js";
import mysql from "mysql";
import _ from "lodash";
import Promise from "bluebird";

function createCounselorsByLocationQuery(zipCoords) {
  // **for testing in mysql console: SELECT node.nid, node.title, taxonomy_term_data.name, location.street, location.additional, location.city, location.province, location.postal_code, location_phone.phone, field_data_field_partner_website.field_partner_website_url AS website, (COALESCE(ACOS( SIN(39.003809*PI()/180) * SIN(location.latitude*PI()/180) + COS(39.003809*PI()/180) * COS(location.latitude*PI()/180) * COS(location.longitude*PI()/180 - -77.30165*PI()/180)), 0.00000) * 6369640.5452077) AS location_distance FROM node LEFT JOIN location_instance ON node.vid = location_instance.vid LEFT JOIN location ON location_instance.lid = location.lid LEFT JOIN stg_sba_resource_partner_offices ON location.name = stg_sba_resource_partner_offices.PRTLOCNM LEFT JOIN field_data_field_partner_website ON node.nid = field_data_field_partner_website.entity_id LEFT JOIN location_phone ON location.lid = location_phone.lid LEFT JOIN taxonomy_index ON node.nid = taxonomy_index.nid LEFT JOIN taxonomy_term_data ON taxonomy_index.tid = taxonomy_term_data.tid WHERE (COALESCE(ACOS( SIN(39.003809*PI()/180) * SIN(location.latitude*PI()/180) + COS(39.003809*PI()/180) * COS(location.latitude*PI()/180) * COS(location.longitude*PI()/180 - -77.30165*PI()/180)), 0.00000) * 6369640.5452077) > 0 AND (( (node.status = '1') AND (node.type IN ('sba_resource_partner_offices')) AND (node.nid IN (SELECT taxonomy_index.nid AS nid FROM taxonomy_index WHERE ( (taxonomy_index.tid IN ('7354', '7355', '7356', '7357', '7358', '7361', '7359', '7362', '7366', '7364', '88266', '88268')) ))) )) GROUP BY node.nid, location.lid ORDER BY location_distance ASC LIMIT 3 \G;
  const queryArr = [
    "SELECT ",
    "node.title, taxonomy_term_data.name, location.street, location.additional, ",
    "location.city, location.province, location.postal_code, location_phone.phone, ",
    "field_data_field_partner_website.field_partner_website_url AS website, ",
    "location.latitude, location.longitude, ",
    "(COALESCE(ACOS( SIN(" + zipCoords.lat + "*PI()/180) * SIN(location.latitude*PI()/180) ",
    "+ COS(" + zipCoords.lat + "*PI()/180) * COS(location.latitude*PI()/180) ",
    "* COS(location.longitude*PI()/180 - " + zipCoords.lng + "*PI()/180)), 0.00000) ",
    "* 6369640.5452077) AS location_distance ",
    "FROM node ",
    "LEFT JOIN location_instance ON node.vid = location_instance.vid ",
    "LEFT JOIN location ON location_instance.lid = location.lid ",
    "LEFT JOIN stg_sba_resource_partner_offices ON location.name = stg_sba_resource_partner_offices.PRTLOCNM ",
    "LEFT JOIN field_data_field_partner_website ON node.nid = field_data_field_partner_website.entity_id ",
    "LEFT JOIN location_phone ON location.lid = location_phone.lid ",
    "LEFT JOIN taxonomy_index ON node.nid = taxonomy_index.nid ",
    "LEFT JOIN taxonomy_term_data ON taxonomy_index.tid = taxonomy_term_data.tid ",
    "WHERE ",
    "(COALESCE(ACOS( SIN(" + zipCoords.lat + "*PI()/180) * SIN(location.latitude*PI()/180) ",
    "+ COS(" + zipCoords.lat + "*PI()/180) * COS(location.latitude*PI()/180) ",
    "* COS(location.longitude*PI()/180 - " + zipCoords.lng + "*PI()/180)), 0.00000) ",
    "* 6369640.5452077) > 0 ",
    "AND (( (node.status = '1') AND (node.type IN  ('sba_resource_partner_offices')) ",
    "AND (node.nid IN ",
    "(SELECT taxonomy_index.nid AS nid ",
    "FROM taxonomy_index ",
    "WHERE ( (taxonomy_index.tid IN  ('7354', '7355', '7356', '7357', '7358', '7361', '7359', '7362', '7366', '7364', '88266', '88268')) ))) )) ",
    "GROUP BY node.nid, location.lid ",
    "ORDER BY location_distance ASC ",
    "LIMIT 3;"
  ];

  return queryArr.join("");
}

function fetchUserZipCoords(zipcode) {
  const query = mysql.format("SELECT * from zipcodes WHERE zipcodes.zip = ?;", zipcode); //mysql.format to prevent sql inject
  return executeQuery(query)
    .then(function(zipCoords) {
      return {
        lat: zipCoords[0].latitude,
        lng: zipCoords[0].longitude
      };
    });
}

function queryDataToJson(data) {
  return JSON.parse(JSON.stringify(data));
}

function fetchCounselorsByLocation(zipcode) {
  const userZipCoords = fetchUserZipCoords(zipcode);

  const counselorQuery = userZipCoords.then(function(zipCoords) {
    return createCounselorsByLocationQuery(zipCoords);
  });

  const counselorData = counselorQuery.then(function(query) {
    return executeQuery(query);
  });

  const counselorJson = counselorData.then(function(counselors) {
    return queryDataToJson(counselors);
  });

  return Promise.join(userZipCoords, counselorQuery, counselorData, counselorJson,
    function(zipCoords, query, counselors, counselorsJson) {
      return counselorsJson;
    });
}



export { fetchCounselorsByLocation }





