import React from 'react';
import { Grid } from 'react-bootstrap';

import FindLendersIntro from '../../organisms/lender-match/landing-page/find-lenders-intro.jsx'
import { HowItWorksSection } from '../../organisms/lender-match/landing-page/how-it-works.jsx';
import { HelpfulQuestions } from '../../organisms/lender-match/landing-page/helpful-questions.jsx';
import { PreparationChecklist } from '../../organisms/lender-match/landing-page/preparation-checklist.jsx';
import { SuccessStories } from '../../organisms/lender-match/landing-page/success-stories.jsx'

class LandingPage extends React.Component {
  render() {
    return (
      <Grid fluid={ true }>
        <FindLendersIntro tellMeHowAnchor="tell-me-how" />
        <HowItWorksSection />
        <PreparationChecklist tellMeHowAnchor="tell-me-how" />
        <HelpfulQuestions/>
      </Grid>
      );
  }
}

export default LandingPage;
