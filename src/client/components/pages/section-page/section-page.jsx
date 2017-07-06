import React from 'react'
import styles from "./section-page.scss";
import path from 'path';
import SimpleCta from "../../molecules/simple-cta/simple-cta.jsx"
import BizguideTileCollection from "../../molecules/bizguide-tile/bizguide-tile-collection.jsx"
import constants from "../../../services/constants.js"

class SectionPage extends React.Component {

  render() {
    if (this.props.sectionData) {
      let sectionData = this.props.sectionData;
      return (
        <div className={styles.container}>
          <BizguideTileCollection sectionData={sectionData}/>
          <div className={styles.nineStepsCtaContainer}>
            <SimpleCta id="business-guide-panel-10-steps-callout" actionText="Start your business in 10 steps" buttonText="SEE THE GUIDE" url={constants.routes.tenSteps} eventCategory="Ten Steps CTA" labelCategory="Small" />
          </div>
        </div>
      );
    }
    return (
      <div>Loading....</div>
    );
  }
}

SectionPage.defaultProps = {
  sectionData: []
}

export default SectionPage;
