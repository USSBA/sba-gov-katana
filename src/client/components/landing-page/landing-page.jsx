import React from 'react';

import { FindLendersIntro } from './find-lenders-intro.jsx'
import { Introduction } from './introduction.jsx';
import { HelpfulQuestions } from './helpful-questions.jsx';
import { PreparationChecklist } from './preparation-checklist.jsx';
import { SuccessStories } from './success-stories.jsx'
import { Grid, Row, Col } from 'react-bootstrap';

class LandingPage extends React.Component {
  render() {
    return (
      <Grid fluid={ true }>
        <FindLendersIntro />
        <Introduction />
        <PreparationChecklist />
        <HelpfulQuestions/>
        <SuccessStories/>
      </Grid>
      );
  }
}

export default LandingPage;