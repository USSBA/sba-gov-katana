import axios from "axios";
import queryString from "querystring";
export const receiveHappeningNow = "RECEIVE_HAPPENING_NOW";

function receiveNodes(query, data) {
  return {
    type: receiveHappeningNow,
    query,
    nodes: data,
    receivedAt: Date.now()
  };
}

function fetchNodes(query) {
  return (dispatch) => {
    dispatch(receiveNodes(query));
    return axios.get("/content/node.json?" + queryString.stringify(query)).then((response) => {
      return response.data;
    }).then((data) => {
      return dispatch(receiveNodes(query, data));
    });
  };
}

function shouldFetchNodes(state, query) {
  return query !== null; // TODO check current state
}
export function fetchNodesIfNeeded(query) {
  return (dispatch, getState) => {
    if (shouldFetchNodes(getState(), query)) {
      return dispatch(fetchNodes(query));
    }
    return Promise.resolve();
  };
}
