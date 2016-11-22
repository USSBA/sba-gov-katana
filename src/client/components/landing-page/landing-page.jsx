import React from 'react';

import ValueProposition from './value-proposition.jsx';
import ProcessAndFacts from './process-and-facts.jsx';
import PrepartionAndGuidance from './preparation-and-guidance.jsx';
import ButtonSection from './button-section.jsx';

class LandingPage extends React.Component{
    render(){
        return (
            <div>
                <ValueProposition />
                <ProcessAndFacts />
                <ButtonSection />
                <PrepartionAndGuidance />
            </div>
        );
    }
}

export default LandingPage;