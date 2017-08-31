import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import moment from "moment";
import {SmallPrimaryButton} from "atoms";
import * as ContentActions from "../../../../actions/content.js";
import styles from "./blog.scss";

class Blog extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.actions.fetchContentIfNeeded("blogs", "blogs");
  }

  returnFormatedDate(date) {
    return moment(date, "X").format("MMMM D, YYYY");
  }

  itemMapperDesktop(items) {
    var blogThis = this;
    return (
      <div className={styles.containerDesktop}>
        <div>
          {items.map(function(item, i) {
            return (
              <div key={i} className={styles.blogColumn}>
                <img className={styles.blogsImage} src={item.imageUrl} alt={item.title}/>
              </div>
            );
          })}
        </div>
        <div>
          {items.map(function(item, i) {
            return (
              <div key={i} className={styles.blogColumn}>
                <div className={styles.blogTitleContainer}>
                  <a className={styles.blogTitle} href={item.url}>
                    {item.title}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {items.map(function(item, i) {
            return (
              <div key={i} className={styles.blogColumn}>
                <div className={styles.blogInfo}>
                  {"By " + item.name + " on " + blogThis.returnFormatedDate(item.date)}
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {items.map(function(item, i) {
            return (
              <div key={i} className={styles.blogColumn}>
                <SmallPrimaryButton text="READ MORE" URL={item.url}/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  itemMapperMobile(items) {
    var blogThis = this;
    return (
      <div className={styles.containerMobile}>
        {items.map(function(item, i) {
          return (
            <a href={item.url} key={i}>
              <div className={styles.singleBlog}>
                <div className={styles.blogTitle}>
                  {item.title}
                </div>
                <div className={styles.blogInfo}>
                  {blogThis.returnFormatedDate(item.date)}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  render() {
    let items = [];
    if (this.props.blog) {
      items = this.props.blog;
    }

    return (
      <div className={styles.blogSection}>
        <div className={styles.sectionTitle}>
          From the blog.
        </div>
        {this.itemMapperDesktop(items)}
        {this.itemMapperMobile(items)}
      </div>
    );
  }

}

function mapReduxStateToProps(reduxState) {
  return {blog: reduxState.contentReducer.blogs};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(Blog);
