/**
 * Created by aadeogun on 2/13/17.
 */
import {executeQuery} from '../drupal-db.js';
import _ from "lodash";

function fetchMainMenuFromDB(){
    return new Promise((resolve)=> {
            const sqlQuery = "(select mlid, plid, link_title, alias as link from menu_links, url_alias where menu_name = 'main-menu' and link_path = source and hidden = 0)" +
                             " union all " +
                             "(select mlid, plid, link_title, link_path as link from menu_links where menu_name = 'main-menu' and hidden = 0 and (link_path like 'http%' or link_path like 'tool%'))";
            executeQuery(sqlQuery).then(function (rows) {
                let menuTree = buildMenuTree(rows);
                resolve(menuTree);
            }).catch(function (err) {
                console.log(err);
            });
        }

    ).catch(function(error){
        console.log(error);
    });

}

function buildMenuTree(data, parent){
    var result = [];
    parent = typeof parent !== 'undefined' ? parent : {mlid: 0};

    let children = _.filter(data, function(value){
        return value.plid === parent.mlid;
    });
    if(!_.isEmpty(children)){
        _.each(children, function(child){
            if (child != null){
                result.push(child);
                let ownChildren = buildMenuTree(data, child);
                if(!_.isEmpty(ownChildren)){
                    child.isParent = true;
                    child.children = ownChildren;
                }else{
                    child.isParent = false;
                }
            }
        });
    }
    return result;
}

export {fetchMainMenuFromDB};
