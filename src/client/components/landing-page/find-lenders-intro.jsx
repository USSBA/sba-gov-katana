import React from 'react';
import { HelpMeBtn } from './help-me-btn.jsx'
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LocationChangeActions from '../../actions/location-change.js';

import styles from '../../styles/landing-page/find-lenders-intro.scss'
import cornerGraphicBig from '../../../../public/assets/images/lender-match/rectangle-corner-graphic.png'
import cornerGraphicSmall from '../../../../public/assets/images/lender-match/rectangle-corner-graphic-mobile.png'
import lenderMatchHero from '../../../../public/assets/images/lender-match/hero.jpg';

class FindLendersIntro extends React.Component {
  handleClick() {
    this.props.actions.locationChange('/linc/form/contact');
  }
  render() {
    return (
      <div className=" row">
        <div className={ styles.parentContainer + " col-xs-12 nopadding" }>
          <div className={ styles.greenBox }>
            <img className={ styles.triangleBig } src={ cornerGraphicBig } aria-hidden="true" width="166" height="166" alt="" />
            <img className={ styles.triangleSmall } src={ cornerGraphicSmall } aria-hidden="true" width="92" height="92" alt="" />
            <div className={ styles.title }>
              Lender Match helps you find lenders.
            </div>
            <div className={ styles.subTitle }>
              Lender Match (formerly LINC) is a free online referral tool that connects small businesses with participating SBA-approved lenders.
            </div>
            <div className={ styles.btnContainer + " container-fluid" }>
              <div className=" col-sm-4 col-xs-12 nopadding">
                <HelpMeBtn/>
              </div>
              <div className=" col-sm-4 col-xs-12 nopadding">
                <Button block className={ styles.findLendersWhiteBtn } onClick={ this.handleClick }>FIND LENDERS</Button>
              </div>
            </div>
          </div>
          <div className={ styles.imageContainer }>
            <img src={ lenderMatchHero } alt="Match with lenders" width="947" height="646" />
          </div>
        </div>
      </div>
      );
  }
}

function mapReduxStateToProps(reduxState) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LocationChangeActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(FindLendersIntro);
