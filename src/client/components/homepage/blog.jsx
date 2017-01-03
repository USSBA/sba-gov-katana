import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogContentActions from "../../actions/blog-homepage-content.js";

class Blog extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.actions.fetchBlogNodesIfNeeded({
      type: "blog"
    });
  }
  render() {
    let items = [];
    if (this.props.blog) {
      items = this.props.blog.list;
    }
    console.log(items)

    return (
      <div>
        Hello
      </div>


      );
  }

}


function mapReduxStateToProps(reduxState) {
  return {
    blog: reduxState.blogHomepageReducer.blog
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(BlogContentActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(Blog);