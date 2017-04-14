import axios from "axios";
import types from './types.js';

function receiveContent(prop, type, id, data) {
  return {
    type: types.restContent,
    contentType: prop,
    id,
    data: data,
    receivedAt: Date.now()
  };
}

function fetchContent(prop, type, id) {
  return (dispatch) => {
    dispatch(receiveContent(prop, type, id));
    return axios.get("/content/" + type + " /" + id + "/" + ".json").then((response) => {
      return response.data;
    }).then((data) => {
      return dispatch(receiveContent(prop, type, id, data));
    });
  };
}

function shouldFetchContent(state, prop, type, id) {
  return id !== null; // TODO check current state
}
export function fetchContentIfNeeded(prop, type, id) {
  return (dispatch, getState) => {
    if (shouldFetchContent(getState(), prop, type, id)) {
      return dispatch(fetchContent(prop, type, id));
    }
    return Promise.resolve();
  };
}
