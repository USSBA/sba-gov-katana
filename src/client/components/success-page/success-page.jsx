import React from 'react';

import DynamicLenderMatches from './dynamic-lender-matches.jsx';
import DynamicCounselingAndTools from './dynamic-counseling-and-tools.jsx';
import ConfirmSection from './confirm-section.jsx';


class SuccessPage extends React.Component {
    render(){
        return (
            <div>
                <div className="container">
                    <ConfirmSection />
                    <div className="row">
                        <DynamicLenderMatches />
                        <DynamicCounselingAndTools />
                    </div>
                </div>
            </div>
        )
    }

}

export default SuccessPage;