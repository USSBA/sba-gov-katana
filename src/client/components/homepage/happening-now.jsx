import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { isEmpty } from "lodash";

import Slider from '../common/carousel/carousel.jsx';
import * as ContentActions from "../../actions/content.js";
import styles from "./happening-now.scss";

const contentProperty = "happeningNow";

class HappeningNow extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.actions.fetchContentIfNeeded(contentProperty, "frontpageslides", {});
  }

  render() {
    let items = [];
    let mdSize = 3;
    if (this.props.happeningNow) {
      items = this.props.happeningNow;
      if (items.length === 3) {
        mdSize = 4;
      }
    }

    if (isEmpty(items)) {
      return <div></div>;
    }

    return (
      <div className={ styles.happeningNow }>
        <div className="hidden-xs">
          <Grid fluid>
            <Row>
              <Col sm={ 12 } xsHidden>
              <p className={ styles.happeningNowTitle }>What's happening now.</p>
              </Col>
            </Row>
            <div className={ styles.happeningNowDesktop }>
              <Row>
                { items.map(function(item, i) {
                    return (
                      <Col key={ i } xsHidden sm={ mdSize }>
                      <a href={ item.url }>
                        <img className="img-responsive" src={ item.image } alt={ item.imageAlt }></img>
                      </a>
                      </Col>
                      );
                  }) }
              </Row>
              <Row>
                { items.map(function(item, i) {
                    return <Col key={ i } xsHidden sm={ mdSize }>
                           <p className={ styles.happeningNowItemTitle }>
                             { item.title }
                           </p>
                           </Col>;
                  }) }
              </Row>
              <Row>
                { items.map(function(item, i) {
                    return <Col key={ i } xsHidden sm={ mdSize }>
                           <a href={ item.url } className={ "btn btn-default " + styles.happeningNowLearnMore }>LEARN MORE</a>
                           </Col>;
                  }) }
              </Row>
            </div>
          </Grid>
        </div>
        <div className="hidden-md hidden-lg hidden-sm">
          <div>
            <p className={ styles.happeningNowTitleMobile }>What's happening now.</p>
          </div>
          <div className={ styles.happeningNowMobile }>
            <Slider items={ items } />
          </div>
        </div>
      </div>
      );

  }

}

function mapReduxStateToProps(reduxState) {
  return {
    happeningNow: reduxState.contentReducer[contentProperty]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(HappeningNow);
