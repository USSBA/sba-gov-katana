/**
 * Created by aadeogun on 2/13/17.
 */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-magic-numbers */

import { executeQuery } from "../drupal-db.js";
import _ from "lodash";
import Promise from "bluebird";
import path from "path";


function fixLink(link, linkPath) {
  var fixedLink = link || linkPath;
  var hardCodedPrefixToRemove = "https://www.sba.gov";
  if (fixedLink.indexOf(hardCodedPrefixToRemove) !== -1) {
    fixedLink = fixedLink.substring(hardCodedPrefixToRemove.length);
  }
  fixedLink = path.join("/", fixedLink);
  return fixedLink;
}


function fetchMainMenu() {
  return Promise.all([fetchMainMenuStructure(), fetchLoansAndGrantsCalloutBlock()])
    .spread(function(menuStructure, loansAndGrantsCallout) {
      const cleaned = _.chain(menuStructure)
        .uniqWith(function(first, second) {
          return first.plid === second.plid && first.linkPath === second.linkPath;
        })
        .map(function(item) {
          return {
            link: fixLink(item.link, item.linkPath),
            linkTitle: item.linkTitle,
            weight: item.weight,
            plid: item.plid,
            mlid: item.mlid
          };
        })
        .filter(function(item) {
          return !item.mlid || (item.mlid !== 1116 && item.mlid !== 5171);
        })
        .value();



      const menuTree = buildMenuTree(cleaned);
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
  const sqlQuery = "select ml.mlid, ml.plid, ml.link_title as linkTitle, ml.link_path as linkPath, ua.alias as link, ml.weight from menu_links as ml left join url_alias as ua on ua.source = ml.link_path where ml.menu_name = 'main-menu' and hidden = 0 and options NOT LIKE '%element-invisible%' order by weight asc;";
  return executeQuery(sqlQuery);
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
        result.push(child);
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
