import { receiveBlog } from "../actions/blog-homepage-content";

const blogHomepageReducer = (state = {}, action) => {
  if (action.type === receiveBlog) {
    return {
      blog: action.nodes
    };
  }
  return state;
};


export default blogHomepageReducer;