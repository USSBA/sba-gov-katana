import React from "react";
import _ from "lodash";

import { Carousel } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from '../../styles/helper/carousel.scss';

class ModifiedCarousel extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      direction: null
    };
  }

  // items is an array of objects with the following properties: title, imageSrc, imageAlt
  static propTypes = {
    items: React.PropTypes.array.isRequired,
    titleStyle: React.PropTypes.string.isRequired,
    imageStyle: React.PropTypes.string.isRequired,
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      activeIndex: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    let me = this;



    if (_.isEmpty(this.props.items)) {
      return <div></div>;
    }

    let prevImgSrc, nextImgSrc;
    if(this.state.activeIndex === 0){
        prevImgSrc = this.props.items[3].imageSrc;
        nextImgSrc = this.props.items[1].imageSrc;
    }else if(this.state.activeIndex === 3){
        prevImgSrc = this.props.items[2].imageSrc;
        nextImgSrc = this.props.items[0].imageSrc;
    }else{
        prevImgSrc = this.props.items[selectedIndex - 1].imageSrc;
        nextImgSrc = this.props.items[selectedIndex + 1].imageSrc;
    }

    let currentTitle = this.props.items[this.state.activeIndex].title;
    return (
      <div>
        <Row>
            <div>
              <div className="col-xs-2 col-sm-2">
                <img className={styles.prevImg} src={prevImgSrc}/>
              </div>
              <div className="col-xs-8 col-sm-8">
                <Carousel activeIndex={ this.state.activeIndex } controls={ true } indicators={ false } direction={ this.state.direction } onSelect={ this.handleSelect.bind(this) }>
                  { this.props.items.map(function(item, index) {
                      return <Carousel.Item key={ "ModifiedCarousel-item-" + index }>
                               <img className={ me.props.imageStyle } src={ item.imageSrc } alt={ item.imageAlt }></img>
                             </Carousel.Item>;
                    }) }
                </Carousel>
              </div>
              <div className="col-xs-2 col-sm-2">
                <img className={styles.nextImg} src={nextImgSrc}/>
              </div>
            </div>
        </Row>
        <div>
          <p className={ "text-center " + this.props.titleStyle }>
            { currentTitle }
          </p>
          <ol className={ styles.indicators + " text-center" }>
            { this.props.items.map(function(item, index) {
                return <li className={ index === me.state.activeIndex ? styles.active : "inactive" }></li>
              }
              ) }
          </ol>
        </div>
      </div>
      );
  }
}

export default ModifiedCarousel;
