import React from 'react';
// import { Grid } from 'react-bootstrap';

import  FindLendersIntro  from '../../organisms/lender-match/landing-page/find-lenders-intro.jsx'
import { HowItWorksSection } from '../../organisms/lender-match/landing-page/how-it-works.jsx';
import HelpfulQuestions from '../../organisms/lender-match/landing-page/helpful-questions.jsx';
import PreparationChecklist  from '../../organisms/lender-match/landing-page/preparation-checklist.jsx';
// import { SuccessStories } from '../../organisms/lender-match/landing-page/success-stories.jsx'
import styles from "../../organisms/lender-match/landing-page/landing-page.scss";

class LandingPage extends React.Component {
  render() {
    return (
        <div className={styles.landingPage}>
            <FindLendersIntro tellMeHowAnchor="tell-me-how" />
            <HowItWorksSection />
            <PreparationChecklist tellMeHowAnchor="tell-me-how" />
            <HelpfulQuestions/>
        </div>
      );
  }
}

export default LandingPage;
