import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { isEmpty } from "lodash";

import './carousel-overrides.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
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

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      // dotsClass: styles.happeningNowCarouselDots,
      centerMode: true
    };

    console.log(items);
    console.log(settings);
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
                <div className={ styles.happeningNowDesktop }>
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
                </div>
                <Row>
                  <Col xs={ 12 } sm={ 12 } mdHidden lgHidden>
                  <div className={ styles.happeningNowMobile }>
                    <Slider {...settings}>
                      { items.map(function(item, index) {
                          return <div key={ "happeningNowCarousel-item-" + index } class="happeningNowCarouselItem">
                                   <a href={ item.url }>
                                     <img className={ styles.carouselImage } src={ item.image } alt={ item.imageAlt }></img>
                                   </a>
                                 </div>;
                        }) }
                    </Slider>
                  </div>
                  </Col>
                </Row>
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
