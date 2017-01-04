import axios from "axios";
import queryString from "querystring";
export const receiveHappeningNow = "RECEIVE_HAPPENING_NOW";

function receiveContent(type, query, data) {
  return {
    type: receiveHappeningNow,
    query,
    data: data,
    receivedAt: Date.now()
  };
}

function fetchContent(type, query) {
  return (dispatch) => {
    dispatch(receiveContent(type, query));
    return axios.get("/content/" + type + ".json" + (query ? "?" + queryString.stringify(query) : "")).then((response) => {
      return response.data;
    }).then((data) => {
      return dispatch(receiveContent(type, query, data));
    });
  };
}

function shouldFetchContent(state, query) {
  return query !== null; // TODO check current state
}
export function fetchContentIfNeeded(type, query) {
  return (dispatch, getState) => {
    if (shouldFetchContent(getState(), type, query)) {
      return dispatch(fetchContent(type, query));
    }
    return Promise.resolve();
  };
}
