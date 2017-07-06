import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LocationChangeActions from '../../../../actions/navigation.js';
import lenderMatchHero from '../../../../../../public/assets/images/lender-match/hero.jpg';
import lenderMatchMobile from "../../../../../../public/assets/images/lender-match/hero-mobile.jpg";
import Hero from "../../hero/hero.jsx";


class FindLendersIntro extends React.Component {
    constructor(props) {
        super();
        this.handleLenderMatchClicked = this.handleLenderMatchClicked.bind(this);
        this.handleTellMeHowClicked = this.handleTellMeHowClicked.bind(this);
    }
  handleLenderMatchClicked() {
    this.props.actions.locationChange('/lendermatch/form/contact', {
      label: "Find Lenders #1"
    });
  }

  handleTellMeHowClicked(){
      let element = document.getElementById(this.props.tellMeHowAnchor);
      console.log(element);
      element.scrollIntoView({
          block: "start",
          behavior: "smooth"
      });
  }

  render() {
    let calloutMessage = "Lender Match (formerly LINC) is a free online referral tool that connects small businesses with participating SBA-approved lenders.";
    let calloutTitle = "Lender Match helps you find lenders.";
    let buttonsArray = [
                            {   onClickHandler: this.handleLenderMatchClicked,
                                btnText:"FIND LENDERS",
                                btnType:"LargeInversePrimaryButton"
                            }
                        ];
    return (
        <Hero title={calloutTitle} message={calloutMessage} desktopImage={lenderMatchHero} mobileImage={lenderMatchMobile} buttons={buttonsArray} alt="Two people discussing in an office"/>
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
