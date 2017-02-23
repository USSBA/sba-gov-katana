/**
 * Created by aadeogun on 2/13/17.
 */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */

import { executeQuery } from "../drupal-db.js";
import _ from "lodash";
import Promise from "bluebird";


function fetchMainMenu(){
    return Promise.all([fetchMainMenuStructure(), fetchLoansAndGrantsCalloutBlock()])
        .spread(function(menuStructure, loansAndGrantsCallout){
            const menuTree = buildMenuTree(menuStructure);
            let loansAndGrants = _.find(menuTree, {link_title: "Loans & Grants"});
            if(loansAndGrants){
                loansAndGrants.featuredCallout = loansAndGrantsCallout;
            }
            return menuTree;
        });
}


function fetchMainMenuStructure() {
    const sqlQuery = "(select mlid, plid, link_title, alias as link, options from menu_links, url_alias where menu_name = 'main-menu' and link_path = source and hidden = 0)" +
      " union all " +
      "(select mlid, plid, link_title, link_path as link, options from menu_links where menu_name = 'main-menu' and hidden = 0 and (link_path like 'http%' or link_path like 'tool%'))";
  return executeQuery(sqlQuery)
      .then(function(results){
          // conver the options buffer (because it is type blob in the DB to a string)
         _.each(results, function(result){
            result.options = new String(result.options);
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

        const ownChildren = buildMenuTree(data, child);
        if (!_.isEmpty(ownChildren)) {
          child.isParent = true;
          child.children = ownChildren;
        } else {
          child.isParent = false;
        }
        const options = child.options;
        delete child.options;
        child.invisible = options.indexOf("element-invisible") !== -1;
        result.push(child);
      }
    });
  }
  return result;
}


function fetchLoansAndGrantsCalloutBlock(){
    const query = "select body from block_custom where info = 'Feature block for Menu - Loans & Grants';"
    return executeQuery(query)
        .then(function(result){
            let title = "";
            let image = "";
            let text = "";
            let target = "";
            if(result && result[0] && result[0].body){
                let body = result[0].body;
                title = (/title="(.*?)"/).exec(body)[1];
                image = (/img src="(.*?)"/).exec(body)[1];
                text = (/p>(.*?)<\/p/).exec(body)[1];
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

export { fetchMainMenu, fetchMainMenuStructure , fetchLoansAndGrantsCalloutBlock, buildMenuTree};
