import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { isEmpty } from "lodash";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import './slick-theme.scss';
// import 'slick-carousel/slick/slick-theme.scss';
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
      customPaging: function(i) {
        return <button disabled>{i + 1}</button>;
      },
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "2.1%"
    };

    return (<div className={ styles.happeningNow }>
              <Grid fluid>
                <Row>
                  <Col xs={ 12 } xsHidden smHidden>
                  <p className={ styles.happeningNowTitle }>What's happening now.</p>
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
              </Grid>
              <div className="hidden-md hidden-lg">
                <div>
                  <p className={ styles.happeningNowTitleMobile }>What's happening now.</p>
                </div>
                <div className={ styles.happeningNowMobile }>
                  <Slider {...settings}>
                    { items.map(function(item, index) {
                        return <div key={ "happeningNowCarousel-item-" + index } className={ styles.happeningNowCarouselItem }>
                                 <a href={ item.url } className={ styles.carouselAnchor }>
                                   <img className={ styles.carouselImage } src={ item.image } alt={ item.imageAlt }></img>
                                   <p className={ styles.happeningNowCarouselItemTitle }>
                                     { item.title }
                                   </p>
                                 </a>
                               </div>;
                      }) }
                  </Slider>
                </div>
              </div>
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
