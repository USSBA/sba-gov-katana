import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as ContentActions from "../../actions/content.js";
import styles from "../../styles/homepage/blog.scss";
import moment from 'moment';

class Blog extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.actions.fetchContentIfNeeded("blogs", "blogs", {});
  }

  returnFormatedDate(date) {
    return moment(date, "X").format("MMMM D, YYYY");
  }

  itemMapperDesktop(items) {
    var blogThis = this;
    return (
      <div className={ styles.blogsContainer }>
        <Grid fluid>
          <Row>
            { items.map(function(item, i) {
                return (
                  <Col key={ i } xs={ 6 }>
                  <img className={ styles.blogsImage } src={ item.imageUrl } alt={ item.title } />
                  </Col>
                  );
              }) }
          </Row>
          <Row>
            { items.map(function(item, i) {
                return (
                  <Col key={ i } xs={ 6 }>
                  <div className={ styles.blogTitleContainer }>
                    <a className={ styles.blogTitle } href={ item.url }>
                      { item.title }
                    </a>
                  </div>
                  </Col>
                  );
              }) }
          </Row>
          <Row>
            { items.map(function(item, i) {
                return (
                  <Col key={ i } xs={ 6 }>
                  <div className={ styles.blogInfo }>
                    { "By " + item.name + " on " + blogThis.returnFormatedDate(item.date) }
                  </div>
                  </Col>
                  );
              }) }
          </Row>
          <Row>
            { items.map(function(item, i) {
                return (
                  <Col key={ i } xs={ 6 }>
                  <a href={ item.url } className={ "btn btn-default " + styles.blueBtn }>READ MORE</a>
                  </Col>
                  );
              }) }
          </Row>
        </Grid>
      </div>
      );
  }

  itemMapperMobile(items) {
    var blogThis = this;
    return (
      <div className={ styles.blogsContainer }>
        { items.map(function(item, i) {
            return (
              <a href={ item.url } key={ i }>
                <div className={ styles.singleBlog }>
                  <div className={ styles.blogTitle }>
                    { item.title }
                  </div>
                  <div className={ styles.blogInfo }>
                    { blogThis.returnFormatedDate(item.date) }
                  </div>
                </div>
              </a>
              );
          }) }
        <div className={ styles.whiteSpace }></div>
      </div>
      );
  }

  render() {
    let items = [];
    if (this.props.blog) {
      items = this.props.blog;
    }

    return (
      <div className={ styles.blogSection }>
        <div className={ styles.sectionTitle }>
          From the blog.
        </div>
        <div className="hidden-xs">
          { this.itemMapperDesktop(items) }
        </div>
        <div className="hidden-xl hidden-lg hidden-md hidden-sm">
          { this.itemMapperMobile(items) }
        </div>
      </div>
      );
  }

}

function mapReduxStateToProps(reduxState) {
  return {
    blog: reduxState.contentReducer.blogs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(Blog);
