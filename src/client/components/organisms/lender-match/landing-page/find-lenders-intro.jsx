import React from "react";
import {Hero} from "organisms";

class FindLendersIntro extends React.Component {
  constructor(props) {
    super();
    this.handleTellMeHowClicked = this.handleTellMeHowClicked.bind(this);
  }

  handleTellMeHowClicked() {
    let element = document.getElementById(this.props.tellMeHowAnchor);
    element.scrollIntoView({block: "start", behavior: "smooth"});
  }

  render() {
    let calloutMessage = "Lender Match (formerly LINC) is a free online referral tool that connects small businesses with participating SBA-approved lenders.";
    let calloutTitle = "Lender Match helps you find lenders.";
    let buttonsArray = [
      {
        url: "https://catran.sba.gov/lendermatch/form/contact.cfm",
        btnText: "FIND LENDERS",
        btnType: "LargeInversePrimaryButton"
      }
    ];
    return (<Hero title={calloutTitle} message={calloutMessage} imageUrl="/assets/images/lender-match/hero.jpg" buttons={buttonsArray} alt="Two people discussing in an office"/>);
  }
}

export default FindLendersIntro;
