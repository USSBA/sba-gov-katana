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



function fetchFormattedNode(nodeId, options) {
  return get("node/" + nodeId, null, options.headers);
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
  return get("siteMap");
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

  const result = {
    count: sortedDocuments.length,
    items: (params.start === "all" || params.end === "all") ? sortedDocuments : sortedDocuments.slice(params.start, params.end)
  };

  return result;

}



/* eslint-disable complexity */
function filterDocuments(params, docs) {
  return docs.filter((doc, index) => {
    const matchesUrl = params.url === "all" || doc.url === params.url;
    const matchesActivitys = !params.documentActivity || params.documentActivity === "all" || (!_.isEmpty(doc.activitys) && doc.activitys.includes(params.documentActivity));
    const matchesActivity = !params.activity || params.activity === "all" || (!_.isEmpty(doc.activitys) && doc.activitys.includes(params.activity));
    const matchesProgram = !params.program || params.program === "all" || (!_.isEmpty(doc.programs) && doc.programs.includes(params.program));
    const matchesType = !params.type || params.type === "all" || doc.documentIdType === params.type;
    const matchesDocumentType = !params.documentType || params.documentType === "all" || doc.documentIdType === params.documentType;
    return (
      (matchesType) &&
      (matchesDocumentType) &&
      (matchesProgram) &&
      (matchesActivitys) &&
      (matchesActivity) &&
      (matchesUrl) &&
      (!params.searchTerm || params.searchTerm === "all" ||
      doc.title.toLowerCase().includes(params.searchTerm.toLowerCase()) ||
      (!_.isEmpty(doc.documentIdNumber) && doc.documentIdNumber.includes(params.searchTerm)))
    );
  });
}
function filterArticles(params, allArticles) {
  return allArticles.filter((article, index) => {
    const matchesUrl = !params.url || params.url === "all" || article.url === params.url;
    const matchesProgram = !params.program || params.program === "all" || (!_.isEmpty(article.programs) && article.programs.includes(params.program));
    const matchesTitle = !params.searchTerm || params.searchTerm === "all" || article.title.toLowerCase().includes(params.searchTerm.toLowerCase());
    const matchesType = !params.articleType || params.articleType === "all" || article.type === params.articleType;
    return matchesUrl && matchesProgram && matchesTitle && matchesType;
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
  } else if (params.sortBy === "Effective Date") {
    return  _.orderBy(docs, [(doc) => {
      let latestFile = _.maxBy(doc.files, 'effectiveDate')
      return latestFile ? latestFile.effectiveDate : ""
    }], ['desc'])
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
  let sortOrder = "";
  let sortField;
  if (queryParams.sortBy === "Title") {
    sortField = "title";
  } else if (queryParams.sortBy === "Last Updated") {
    sortField = "updated";
    sortOrder = "-";
  }

  return get("collection/articles", {
    sortBy: sortOrder + sortField
  }).then((results) => {
    const filteredArticles = filterArticles(queryParams, results);
    return {
      items: (queryParams.start === "all" || queryParams.end === "all") ? filteredArticles : filteredArticles.slice(queryParams.start, queryParams.end),
      count: filteredArticles.length
    };
  });
}

function fetchAnnouncements() {
  return get("collection/announcements");
}

export { fetchFormattedNode, fetchContacts, fetchFormattedMenu, fetchCounsellorCta, fetchDocuments, fetchTaxonomyVocabulary, fetchArticles, fetchAnnouncements };
