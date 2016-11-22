import React from 'react';

import Success from './success.jsx';
import DynamicLenderMatches from './dynamic-lender-matches.jsx'
import DynamicCounselingAndTools from './dynamic-counseling-and-tools.jsx'



class SuccessPage extends React.Component {
    render(){
        return (
            <div>
                <Success />
                <div className="container">
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