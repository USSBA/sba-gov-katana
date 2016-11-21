import React from 'react';
import {
    connect
}
from 'react-redux';

import LandingPage from './landing-page/landing-page.jsx';
import BorrowerForm from './borrower-form/borrower-form.jsx';
import SuccessPage from './success-page/success-page.jsx';

class LincMain extends React.Component {
    shownIfCurrentPageIs(currentPage) {
        return this.props.page === currentPage ? "" : "hidden";
    }
    render() {
        console.log(this.props.page);
        return (
            <div>
                <div className={this.shownIfCurrentPageIs('landingPage')}>
                    <LandingPage />
                </div>
                <div className={this.shownIfCurrentPageIs('borrowerForm')}>
                    <BorrowerForm />
                </div>
                <div className={this.shownIfCurrentPageIs('successPage')}>
                    <SuccessPage />
                </div>
            </div>
        );
    }
}


LincMain.defaultProps = {
    page: 'landingPage'
};

function mapReduxStateToProps(state) {
    return {
        page: state.currentPage
    };
}

export default connect(mapReduxStateToProps, null)(LincMain);
