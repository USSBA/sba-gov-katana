import React from 'react';

import Header from '../common/header.jsx';
import Footer from '../common/footer.jsx';
import Success from './success.jsx';
import DynamicLenderMatches from './dynamic-lender-matches.jsx'
import DynamicCounselingAndTools from './dynamic-counseling-and-tools.jsx'



class SuccessPage extends React.Component {
    render(){
        return (
            <div>
                <Header />
                <Success />
                <div className="container">
                    <div className="row">
                        <DynamicLenderMatches />
                        <DynamicCounselingAndTools />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default SuccessPage;