/**
 * Created by aadeogun on 2/13/17.
 */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */

import { executeQuery } from "../drupal-db.js";
import _ from "lodash";
import Promise from "bluebird";


function fetchMainMenu() {
  return Promise.all([fetchMainMenuStructure(), fetchLoansAndGrantsCalloutBlock()])
    .spread(function(menuStructure, loansAndGrantsCallout) {
      let unique = _.uniqBy(menuStructure, function(item) {
        return item.link;
      });
      const menuTree = buildMenuTree(unique);
      const loansAndGrants = _.find(menuTree, {
        linkTitle: "Loans & Grants"
      });
      if (loansAndGrants) {
        loansAndGrants.featuredCallout = loansAndGrantsCallout;
      }
      return menuTree;
    });
}


function fetchMainMenuStructure() {
  const sqlQuery = "(select mlid, plid, link_title as linkTitle, alias as link, options, weight from menu_links, url_alias where menu_name = 'main-menu' and link_path = source and hidden = 0 order by weight asc)" +
    " union all " +
    "(select mlid, plid, link_title as linkTitle, link_path as link, options, weight from menu_links where menu_name = 'main-menu' and hidden = 0 and (link_path like 'http%' or link_path like 'tool%') order by weight asc)";
  return executeQuery(sqlQuery)
    .then(function(results) {
      // conver the options buffer (because it is type blob in the DB to a string)
      _.each(results, function(result) {
        result.options = String(result.options);
      });
      return results;
    });
}


function buildMenuTree(data, parent) {
  var result = [];
  parent = typeof parent !== "undefined" ? parent : {
    mlid: 0
  };

  const children = _.filter(data, function(value) {
    return value.plid === parent.mlid;
  });
  if (!_.isEmpty(children)) {
    _.each(children, function(child) {
      if (child !== null) {

        let ownChildren = buildMenuTree(data, child);
        if (!_.isEmpty(ownChildren)) {
          ownChildren = _.sortBy(ownChildren, "weight");
          ownChildren = _.map(ownChildren, function(item) {
            return _.pick(item, ["link", "linkTitle", "children"]);
          });
          child.children = ownChildren;
        }
        const options = child.options;
        delete child.options;
        const invisible = options.includes("element-invisible");
        if (!invisible) {
          result.push(child);
        }
      }
    });
  }
  result = _.sortBy(result, "weight");
  result = _.map(result, function(item) {
    return _.pick(item, ["link", "linkTitle", "children"]);
  });
  return result;
}


function fetchLoansAndGrantsCalloutBlock() {
  const query = "select body from block_custom where info = 'Feature block for Menu - Loans & Grants';";
  return executeQuery(query)
    .then(function(result) {
      let title = "";
      let image = "";
      let text = "";
      let target = "";
      if (result && result[0] && result[0].body) {
        const body = result[0].body;
        title = (/title="(.*?)"/).exec(body)[1];
        image = (/img src="(.*?)"/).exec(body)[1];
        if ((/p>(.*?)<\/p/).exec(body) === null) {
          text = "";
        } else {
          text = (/p>(.*?)<\/p/).exec(body)[1];
        }
        target = (/href="(.*?)"/).exec(body)[1];
      }
      return {
        title,
        image,
        text,
        target
      };
    });
}

export { fetchMainMenu, fetchMainMenuStructure, fetchLoansAndGrantsCalloutBlock, buildMenuTree };
