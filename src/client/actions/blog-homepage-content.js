import axios from "axios";
import queryString from "querystring";
export const receiveBlog = "RECEIVE_BLOG";

function receiveBlogNodes(query, data) {
  return {
    type: receiveBlog,
    query,
    nodes: data,
    receivedAt: Date.now()
  };
}

function fetchBlogNodes(query) {
  return (dispatch) => {
    dispatch(receiveBlogNodes(query));
    return axios.get("/node.json?" + queryString.stringify(query)).then((response) => {
      return response.data;
    }).then((data) => {
      return dispatch(receiveBlogNodes(query, data));
    });
  };
}

function shouldFetchBlogNodes(state, query) {
  return query !== null; // TODO check current state like content.js
}
export function fetchBlogNodesIfNeeded(query) {
  return (dispatch, getState) => {
    if (shouldBlogFetchNodes(getState(), query)) {
      return dispatch(fetchBlogNodes(query));
    }
    return Promise.resolve();
  };
}