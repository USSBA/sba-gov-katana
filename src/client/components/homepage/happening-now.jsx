import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';
import ModifiedCarousel from "../helpers/carousel.jsx";
import * as ContentActions from "../../actions/content.js";
import styles from "../../styles/homepage/styles.scss";

class HappeningNow extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.actions.fetchNodesIfNeeded({
      type: "slideshow_element"
    });
  }
  render() {
    let items = [];
    let mdSize = 3;
    if (this.props.happeningNow) {
      items = this.props.happeningNow.list;
      if (items.length === 3) {
        mdSize = 4;
      }
    }

    let carouselItems = items.map(function(item) {
      return {
        title: item.title,
        imageSrc: item.field_image.file.uri,
        imageAlt: item.field_image.alt
      };
    });
    return (<div className={ styles.homepageSection }>
              <Grid fluid>
                <Row>
                  <Col xs={ 12 }>
                  <p className={ styles.homepageSectionTitle }>What's happening now.</p>
                  </Col>
                </Row>
                <Row>
                  { items.map(function(item) {
                      return (<Col xsHidden smHidden md={ mdSize }>
                              <a href={ item.field_url.url }>
                                <img className="img-responsive" src={ item.field_image.file.uri } alt={ item.field_image.alt }></img>
                              </a>
                              </Col>);
                    }) }
                </Row>
                <Row>
                  { items.map(function(item) {
                      return <Col xsHidden smHidden md={ mdSize }>
                             <p className={ styles.homepageSectionItemTitle }>
                               { item.title }
                             </p>
                             </Col>;
                    }) }
                </Row>
                <Row>
                  { items.map(function(item) {
                      return <Col xsHidden smHidden md={ mdSize }>
                             <button className={ "btn btn-default " + styles.homepageLearnMore }>LEARN MORE</button>
                             </Col>;
                    }) }
                </Row>
                <Row>
                  <Col xs={ 12 } sm={ 12 } mdHidden lgHidden>
                  <div className="happeningNowCarousel">
                    <ModifiedCarousel imageStyle={ styles.carouselImage } titleStyle={ styles.homepageSectionCarouselItemTitle } items={ carouselItems } />
                  </div>
                  </Col>
                </Row>
              </Grid>
            </div>);
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    happeningNow: reduxState.contentReducer.happeningNow
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(HappeningNow);
