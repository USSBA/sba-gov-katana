import axios from "axios";
import types from "./types.js";

function receiveContent(type, id, data) {
  return {
    type: types.restContent,
    contentType: type,
    id,
    data: data,
    receivedAt: Date.now()
  };
}

function fetchContent(type, id) {
  return (dispatch) => {
    dispatch(receiveContent(type, id));
    return axios.get("/content/" + type + (id ? "/" + id : "") + ".json").then((response) => {
      return response.data;
    }).then((data) => {
      return dispatch(receiveContent(type, id, data));
    });
  };
}

function shouldFetchContent(state, type, id) {
  return id !== null; // TODO check current state
}
export function fetchContentIfNeeded(type, id) {
  return (dispatch, getState) => {
    if (shouldFetchContent(getState(), type, id)) {
      return dispatch(fetchContent(type, id));
    }
    return Promise.resolve();
  };
}
