import React from "react";
import s from "./Article-page.scss";
import * as ContentActions from "../../../actions/content.js";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Article from "../../templates/article/article.jsx";

class ArticlePage extends React.Component {
  componentWillMount() {
    this.props.actions.fetchContentIfNeeded("articles", "articles");
  }

  render() {
    if (this.props.articles && this.props.articles.length > 1) {
      return (<Article data={this.props.articles[0]}/>);
    } else {
      return (
        <div><Article year={this.props.year} month={this.props.month} day={this.props.day} title={this.props.title}/></div>
      );
    }
  }
}

function mapReduxStateToProps(reduxState, ownProps) {
  return {articles: reduxState.contentReducer["articles"]};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(ArticlePage);
