import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';
import ModifiedCarousel from "../helpers/carousel.jsx";
import * as ContentActions from "../../actions/content.js";
import styles from "../../styles/homepage/styles.scss";

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

    let carouselItems = items.map(function(item) {
      return {
        title: item.title,
        imageSrc: item.image,
        imageAlt: item.imageAlt,
        href: item.url
      };
    });
    let me = this;
    return (<div className={ styles.happeningNow }>
              <Grid fluid>
                <Row>
                  <Col xs={ 12 } xsHidden smHidden>
                  <p className={ styles.happeningNowTitle }>What's happening now.</p>
                  </Col>
                  <Col xs={ 12 } mdHidden lgHidden>
                    <p className={ styles.happeningNowTitleMobile }>What's happening now.</p>
                  </Col>
                </Row>
                <Row>
                  { items.map(function(item) {
                      return (<Col xsHidden smHidden md={ mdSize }>
                              <a href={ item.url }>
                                <img className="img-responsive" src={ item.image } alt={ item.imageAlt }></img>
                              </a>
                              </Col>);
                    }) }
                </Row>
                <Row>
                  { items.map(function(item) {
                      return <Col xsHidden smHidden md={ mdSize }>
                             <p className={ styles.happeningNowItemTitle }>
                               { item.title }
                             </p>
                             </Col>;
                    }) }
                </Row>
                <Row>
                  { items.map(function(item) {
                      return <Col xsHidden smHidden md={ mdSize }>
                             <a href={ item.url } className={ "btn btn-default " + styles.happeningNowLearnMore }>LEARN MORE</a>
                             </Col>;
                    }) }
                </Row>
                <Row>
                  <Col xs={ 12 } sm={ 12 } mdHidden lgHidden>
                  <div className={ styles.happeningNowMobile }>
                    { items.map(function(item, i) {
                        return (<div className={ styles.happeningNowSection } key={ i }>
                                  <a href={ item.url }>
                                    <img className="img-responsive" src={ item.image } alt={ item.imageAlt }></img>
                                  </a>
                                  <p className={ styles.happeningNowItemTitleMobile }>
                                    { item.title }
                                  </p>
                                  <a href={ item.url } className={ "btn btn-default " + styles.happeningNowLearnMore }>LEARN MORE</a>
                                </div>);
                      }) }
                  </div>
                  </Col>
                </Row>
                {/*<Row>
                  <Col xs={ 12 } sm={ 12 } mdHidden lgHidden>
                  <div className="happeningNowCarousel">
                    <ModifiedCarousel imageStyle={ styles.carouselImage } titleStyle={ styles.happeningNowCarouselItemTitle } items={ carouselItems } />
                  </div>
                  </Col>
                </Row>*/}
              </Grid>
            </div>);
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
