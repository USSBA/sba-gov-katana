import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BlogContentActions from "../../actions/blog-homepage-content.js";
import styles from "../../styles/homepage/blog.scss"

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

  returnFormatedDate(date) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dateTime = new Date(date * 1000);
    var day = dateTime.getDate();
    var month = monthNames[dateTime.getMonth()];
    var year = dateTime.getFullYear();
    return (month + " " + day + ", " + year);
  }

  itemMapperDesktop(items) {
    var blogThis = this;
    return (
      <div className={ styles.blogsContainer + " container-fluid" }>
        { items.map(function(item) {
            return (
              <div className={ styles.singleBlog + " col-sm-6  nopadding" }>
                <div className={ styles.imageContainer }>
                  <img src={ item.image_url } alt={ item.title } width="555" height="450" />
                </div>
                <div className={ styles.blogTitle }>
                  <a href={ item.url }>{ item.title }</a>
                </div>
                <div className={ styles.blogInfo }>
                  { "by " + item.author.field_name + " on " + blogThis.returnFormatedDate(item.created) }
                </div>
                <a href={ item.url } className={ styles.blueBtn }>READ MORE</a>
              </div>
              );
          }) }
      </div>
    );
  }

  itemMapperMobile(items) {
    var blogThis = this;
    return (
      <div className={ styles.blogsContainer }>
        { items.map(function(item) {
          return (
            <a href={ item.url }>
              <div className={ styles.singleBlog }>
                <div className={ styles.blogTitle }>
                  { item.title }
                </div>
                <div className={ styles.blogInfo }>
                  { blogThis.returnFormatedDate(item.created) }
                </div>
              </div>
            </a>
          );
        }) }
        <div className = {styles.whiteSpace}></div>
      </div>
    );
  }

  render() {
    let items = [];
    if (this.props.blog) {
      items = this.props.blog.list;
    }

    return (
      <div className={ styles.blogSection }>
        <div className={ styles.sectionTitle }>
          From the blog.
        </div>
        <div className = "hidden-xs">
          { this.itemMapperDesktop(items) }
        </div>
        <div className = "hidden-xl hidden-lg hidden-md hidden-sm">
          { this.itemMapperMobile(items) }
        </div>
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