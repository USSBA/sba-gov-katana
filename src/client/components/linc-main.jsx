import React from 'react';
import { connect } from 'react-redux';

import LandingPage from './landing-page/landing-page.jsx';
import LoanForm from './loan-form/loan-form.jsx';
import SuccessPage from './success-page/success-page.jsx';

class LincMain extends React.Component {
    render() {
        const page = this.props.page;
        console.log(page);
        return (
            <div>
                { page === 'landingPage' ? <LandingPage /> : null }
                { page === 'loanForm' ? <LoanForm /> : null }
                { page === 'successPage' ? <SuccessPage /> : null }
            </div>
        );
    }
}


LincMain.defaultProps = {
    page: 'landingPage'
};

function mapReduxStateToProps(state) {
    console.log(state)
    return {
        page: 'loanForm'
    };
}

export default connect(mapReduxStateToProps, null)(LincMain);
