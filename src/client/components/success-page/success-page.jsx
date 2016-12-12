import React from 'react';

import DynamicCounselingAndTools from './counseling-and-tools.jsx';
import ConfirmSection from './confirm-section.jsx';


class SuccessPage extends React.Component {
    render(){
        return (
            <div>
                <ConfirmSection />
                <DynamicCounselingAndTools />
            </div>
        )
    }

}

export default SuccessPage;