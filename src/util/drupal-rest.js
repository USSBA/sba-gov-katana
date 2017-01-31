import axios from "axios";
import _ from "lodash";
import config from "config";
import Promise from "bluebird";

var requestObject = {
  baseURL: config.get("drupal.hostname"),
  headers: {
    "Accepts": "application/json"
  }
};


function fetchFromDrupal(url, query) {
  const options = _.merge({}, requestObject);
  options.url = url;
  if (query) {
    options.params = query;
  }
  return axios.request(options)
    .then(function(response) {
      return response.data;
    });
}


function fetchBlogsFromDrupal() {
  return fetchFromDrupal(config.get("drupal.endpoint") + "/recent-blogs")
    .then((blogs) => {
      if (_.isArray(blogs)) {
        return _.map(blogs, (blog, index) => {
          /* eslint-disable no-magic-numbers */
          return {
            url: blog.url,
            title: blog.title,
            name: blog.name,
            date: blog.date,
            imageUrl: index === 0 ? "https://s3.amazonaws.com/fearlesstesters.com/img/two-ladies.jpg" : "https://s3.amazonaws.com/fearlesstesters.com/img/open-for-business-blogs-photo.jpg"
          };
        /* eslint-enable no-magic-numbers */
        });
      }
      return [];
    });
}


function fetchFrontPageSlidesFromDrupal() {
  return fetchFromDrupal("entityqueue_subqueue.json", {
    name: "frontpage_slide_order"
  })
    .then((result) => {
      return _.map(result.list[0].eq_node, "id");
    })
    .then((ids) => {
      return Promise.map(ids, (nodeId) => {
        return fetchFromDrupal("/node/" + nodeId + ".json");
      });
    })
    .then((nodes) => {
      return _.map(nodes, function(item) {
        return {
          fileId: item.field_image.file.id,
          imageAlt: item.field_image.alt,
          url: item.field_url.url,
          title: item.title
        };
      });
    })
    .then((slides) => {
      return Promise.map(slides, (slide) => {
        return fetchFromDrupal("/file/" + slide.fileId + ".json")
          .then(function(result) {
            return {
              imageAlt: slide.imageAlt,
              url: slide.url,
              title: slide.title,
              image: result.url
            };
          });
      });
    });
}


export { fetchFromDrupal, fetchFrontPageSlidesFromDrupal, fetchBlogsFromDrupal };
