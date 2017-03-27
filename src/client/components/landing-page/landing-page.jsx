import React from 'react';

import FindLendersIntro from './find-lenders-intro.jsx'
import { HowItWorksSection } from './how-it-works.jsx';
import { HelpfulQuestions } from './helpful-questions.jsx';
import { PreparationChecklist } from './preparation-checklist.jsx';
import { SuccessStories } from './success-stories.jsx'
import { Grid, Row, Col } from 'react-bootstrap';

class LandingPage extends React.Component {
  render() {
    return (
      <Grid fluid={ true }>
        <FindLendersIntro />
        <HowItWorksSection />
        <PreparationChecklist />
        <HelpfulQuestions/>
      </Grid>
      );
  }
}

export default LandingPage;
