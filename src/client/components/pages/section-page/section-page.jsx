import React from "react";
import styles from "./section-page.scss";
import path from "path";
import {SimpleCta} from "molecules";
import {
  BusinessGuideTileCollection,
  FundingProgramsTileCollection
} from "organisms";
import constants from "../../../services/constants.js"

class SectionPage extends React.Component {

  render() {
    if (this.props.sectionData) {
      let sectionData = this.props.sectionData;
      let sectionName = this.props.sectionData.title;

      let tenSteps = undefined;
      if (sectionName === constants.sections.businessGuide) {
        tenSteps = (
          <div className={styles.nineStepsCtaContainer}>
            <SimpleCta id="business-guide-panel-10-steps-callout" actionText="Start your business in 10 steps" buttonText="SEE THE GUIDE" url={constants.routes.tenSteps} eventCategory="Ten Steps CTA" labelCategory="Small"/>
          </div>
        );
      }

      let tileCollection = undefined;
      if (sectionName === constants.sections.businessGuide) {
        tileCollection = (<BusinessGuideTileCollection sectionData={sectionData}/>);
      } else if (sectionName === constants.sections.fundingPrograms) {
        tileCollection = (<FundingProgramsTileCollection sectionData={sectionData}/>);
      } else {
        console.error("Unable to find matching section");
      }

      return (
        <div className={styles.container}>
          <div className={styles.tiles}>
            {tileCollection}
          </div>
          {tenSteps}
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
