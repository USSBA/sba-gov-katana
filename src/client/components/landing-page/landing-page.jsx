import React from 'react';

import { Introduction } from './introduction.jsx';
import { HelpfulQuestions } from './helpful-questions.jsx';
import { PreparationChecklist } from './preparation-checklist.jsx';
import { SuccessStories } from './success-stories.jsx'
import {Grid, Row, Col} from 'react-bootstrap';


class LandingPage extends React.Component{
    render(){
        return (
            <Grid fluid={true}>
                <Introduction />
                <PreparationChecklist />
                <HelpfulQuestions/>
                <SuccessStories/>
            </Grid>
        );
    }
}

export default LandingPage;