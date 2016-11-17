import React from 'react';

import Header from './header.jsx';
import ValueProposition from './value-proposition.jsx';
import ProcessAndFacts from './process-and-facts.jsx';
import PrepartionAndGuidance from './preparation-and-guidance.jsx';
import ButtonSection from './button-section.jsx';
import Footer from './footer.jsx';

class LandingPage extends React.Component{
    render(){
        return (
            <div>
                <Header />
                <ValueProposition />
                <ProcessAndFacts />
                <ButtonSection />
                <PrepartionAndGuidance />
                <Footer />
            </div>    
        );
    }
}

export default LandingPage;