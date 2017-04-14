import axios from "axios";
import queryString from "querystring";
import types from './types.js';


function receiveContent(prop, type, query, data) {
  return {
    type: types.siteContent,
    contentType: prop,
    query,
    data: data,
    receivedAt: Date.now()
  };
}

function fetchContent(prop, type, query) {
  return (dispatch) => {
    dispatch(receiveContent(prop, type, query));
    return axios.get("/content/" + type + ".json" + (query ? "?" + queryString.stringify(query) : "")).then((response) => {
      return response.data;
    }).then((data) => {
      return dispatch(receiveContent(prop, type, query, data));
    });
  };
}

function shouldFetchContent(state, prop, type, query) {
  return query !== null; // TODO check current state
}
export function fetchContentIfNeeded(prop, type, query) {
  return (dispatch, getState) => {
    if (shouldFetchContent(getState(), prop, type, query)) {
      return dispatch(fetchContent(prop, type, query));
    }
    return Promise.resolve();
  };
}
