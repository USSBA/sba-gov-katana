import axios from "axios";
import queryString from "querystring";
import types from "./types.js";


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
    const url = "/api/content/" + type + ".json" + (query ? "?" + queryString.stringify(query) : "");
    return axios.get(url).then((response) => {
      return response.data;
    }).then((data) => {
      return dispatch(receiveContent(prop, type, query, data));
    })
      .catch((error) => {
        return dispatch(receiveContent(prop, type, query, null));
      });
  };
}

function shouldFetchContent(state, prop, type, query) {
  return true; // TODO check current state
}
export function fetchContentIfNeeded(prop, type, query) {
  return (dispatch, getState) => {
    if (prop && type && shouldFetchContent(getState(), prop, type, query)) {
      return dispatch(fetchContent(prop, type, query));
    }
    return Promise.resolve();
  };
}
