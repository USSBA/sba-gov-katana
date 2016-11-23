import React from 'react';

import ValueProposition from './value-proposition.jsx';
import ProcessAndFacts from './process-and-facts.jsx';
import PrepartionAndGuidance from './preparation-and-guidance.jsx';
import Navigation from './navigation.jsx';

class LandingPage extends React.Component{
    render(){
        return (
            <div>
                <ValueProposition />
                <ProcessAndFacts />
                <Navigation />
                <PrepartionAndGuidance />
            </div>
        );
    }
}

export default LandingPage;