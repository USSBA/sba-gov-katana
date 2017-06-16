import React from 'react'
import styles from "./section-page.scss";
import path from 'path';
import SimpleCta from "../../molecules/simple-cta/simple-cta.jsx"
import BizguideTileCollection from "../../molecules/bizguide-tile/bizguide-tile-collection.jsx"

class SectionPage extends React.Component {

  render() {
    if (this.props.sectionData) {
      let sectionData = this.props.sectionData;
      return (
        <div className={styles.container}>
          <BizguideTileCollection sectionData={sectionData}/>
          <div className={styles.nineStepsCtaContainer}>
            <SimpleCta actionText="Start your business in 10 steps" buttonText="SEE THE GUIDE" url="https://www.google.com"/>
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
