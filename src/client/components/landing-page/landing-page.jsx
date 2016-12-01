import React from 'react';

import { Introduction } from './introduction.jsx';
import { HelpfulQuestions } from './helpful-questions.jsx';
import { PreparationChecklist } from './preparation-checklist.jsx';
import { SuccessStories } from './success-stories.jsx'


class LandingPage extends React.Component{
    render(){
        return (
            <div>
                <Introduction />
                <PreparationChecklist />
                <HelpfulQuestions />
                <SuccessStories/>
            </div>
        );
    }
}

export default LandingPage;