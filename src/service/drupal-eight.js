import _ from "lodash";
import Promise from "bluebird";
import config from "config";

import { get } from "../models/dao/daisho-client.js";
import localContacts from "../models/dao/sample-data/contacts.js";
import sbicContacts from "../models/dao/sample-data/sbic-contacts.js";
import suretyContacts from "../models/dao/sample-data/surety-contacts.js";
import documents from "../models/dao/sample-data/documents.js";
import articlesData from "../models/dao/sample-data/articles.js";
const localDataMap = {
  "State registration": localContacts,
  "SBIC": sbicContacts,
  "Surety bond agency": suretyContacts
};



function fetchFormattedNode(nodeId) {
  return get("node/" + nodeId);
}

function fetchContacts(queryParams) {
  const category = queryParams.category;
  if (config.get("developmentOptions.useLocalDataNotDaisho")) {
    console.log("Using Development Contacts information");
    return Promise.resolve(localDataMap[category] || []);
  }

  return get("collection/contacts", queryParams);
}


function fetchFormattedMenu() {
  return get("menu");
}

function fetchCounsellorCta() {
  const counsellorCtaNodeId = config.get("counsellorCta.nodeId");
  return get("node/" + counsellorCtaNodeId).then((data) => {
    return _.assign({}, data, {
      size: "Large"
    });
  });
}



function fetchDocuments(queryParams) {
  if (config.get("developmentOptions.useLocalDataNotDaisho")) {
    console.log("Using Development Documents information");
    return Promise.resolve(filterAndSortDocuments(sanitizeDocumentParams(queryParams), documents));
  }

  return get("collection/documents")
    .then((data) => {
      return filterAndSortDocuments(sanitizeDocumentParams(queryParams), data);
    });
}

function sanitizeDocumentParams(params) {
  const sanitizedParams = {
    type: "all",
    program: "all",
    activity: "all",
    search: "all",
    start: "all",
    end: "all",
    url: "all"
  };
  _.mapValues(params, (value, key) => {
    if (key === "start" || key === "end") {
      if (parseInt(value, 10) || value === "0") {
        sanitizedParams[key] = parseInt(value, 10);
      } else {
        throw new TypeError("start / end params should be a number");
      }
    } else {
      value && (sanitizedParams[key] = value);
    }
  });
  return sanitizedParams;
}

function filterAndSortDocuments(params, docs) {
  const filteredDocuments = filterDocuments(params, docs);
  const sortedDocuments = sortDocuments(params, filteredDocuments);
  if (params.start === "all" || params.end === "all") {
    return sortedDocuments;
  } else {
    return sortedDocuments.slice(params.start, params.end);
  }
}

/* eslint-disable complexity */
function filterDocuments(params, docs) {
  return docs.filter((doc) => {
    const matchesUrl = params.url === "all" || doc.url === params.url;
    const matchesActivity = params.activity === "all" || doc.activitys.includes(params.activity);
    const matchesProgram = params.program === "all" || doc.programs.includes(params.program);
    return (
      (params.type === "all" || doc.documentIdType === params.type) &&
      (matchesProgram) &&
      (matchesActivity) &&
      (matchesUrl) &&
      (params.search === "all" ||
      doc.title.toLowerCase().includes(params.search.toLowerCase()) ||
      doc.documentIdNumber.includes(params.search))
    );
  });
}
/* eslint-enable complexity */

function sortDocuments(params, docs) {
  let sortOrder = ["asc"];
  let sortItems;
  if (params.sortBy === "Title") {
    sortItems = ["title"];
  } else if (params.sortBy === "Number") {
    sortItems = ["documentIdNumber"];
  } else if (params.sortBy === "Last Updated") {
    sortItems = ["updated"];
    sortOrder = ["desc"];
  } else {
    return docs;
  }
  return _.orderBy(
    docs, [(doc) => {
      return (typeof doc[sortItems] === "string" ? doc[sortItems].toLowerCase() : doc[sortItems]);
    }],
    sortOrder
  );
}





function fetchTaxonomyVocabulary(queryParams) {
  return get("collection/taxonomys")
    .then((data) => {
      let names = _.map(data, "name");
      if (queryParams.names) {
        names = queryParams.names.split(",");
      }
      return Promise.resolve(data) // TODO remove unnessary promise wrapper
        .then((results) => {
          return _.filter(results, (item) => {
            return _.includes(names, item.name);
          });
        });
    });

}

function fetchArticles(queryParams) {
  return get("collection/articles", queryParams);
}





export { fetchFormattedNode, fetchContacts, fetchFormattedMenu, fetchCounsellorCta, fetchDocuments, fetchTaxonomyVocabulary, fetchArticles };
