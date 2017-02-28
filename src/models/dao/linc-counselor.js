import { executeQuery } from "../drupal-db.js";
import mysql from "mysql";
import _ from "lodash";
import Promise from "bluebird";

function parseCounselorsByLocation(counselors) {
  return counselors;
}

function fetchCounselorsByLocation(zipcode) {
  //mysql.format to prevent sql injections of dynamic zipcode
  const query = mysql.format("SELECT node.title AS node_title, node.nid AS nid, location.city AS location_city, location.street AS location_address, stg_sba_resource_partner_offices.PHYADDRSTR2TXT AS location_suite, location.postal_code AS ?, field_data_field_partner_website.field_partner_website_url AS website, location_phone.phone AS phone, (COALESCE(ACOS(0.77710412277735*COS(RADIANS(location.latitude))*(0.21981811088358*COS(RADIANS(location.longitude)) + -0.97554087465753*SIN(RADIANS(location.longitude))) + 0.62937205400497*SIN(RADIANS(location.latitude))), 0.00000)*6369640.5452077) AS location_distance FROM node LEFT JOIN location_instance ON node.vid = location_instance.vid LEFT JOIN location ON location_instance.lid = location.lid LEFT JOIN stg_sba_resource_partner_offices ON location.name = stg_sba_resource_partner_offices.PRTLOCNM LEFT JOIN field_data_field_partner_website ON node.nid = field_data_field_partner_website.entity_id LEFT JOIN location_phone ON location.lid = location_phone.lid WHERE (COALESCE(ACOS(0.77710412277735*COS(RADIANS(location.latitude))*(0.21981811088358*COS(RADIANS(location.longitude)) + -0.97554087465753*SIN(RADIANS(location.longitude))) + 0.62937205400497*SIN(RADIANS(location.latitude))), 0.00000)*6369640.5452077) > 0 AND (( (node.status = '1') AND (node.type IN ('sba_resource_partner_offices')) AND (node.nid IN (SELECT taxonomy_index.nid AS nid FROM taxonomy_index WHERE ( (taxonomy_index.tid IN ('7354', '7355', '7356', '7357', '7358', '7361', '7359', '7362', '7366', '7364', '88266', '88268')) ))) )) GROUP BY node.nid, location.lid ORDER BY location_distance ASC LIMIT 3;", zipcode);
  return executeQuery(query)
    .then(function(counselors) {
      return parseCounselorsByLocation(counselors);
    })
    .catch(function(err) {
      return err;
    });
}





export { fetchCounselorsByLocation };