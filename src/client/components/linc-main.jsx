import React from 'react';
import {
    connect
}
from 'react-redux';

import LandingPage from './landing-page/landing-page.jsx';
import BorrowerForm from './borrower-form/borrower-form.jsx';

class LincMain extends React.Component {
    render() {
        console.log(this.props.page);
        return (
            <div>
                <LandingPage class={this.props.page !== 'landingPage' ? "hidden" : ""}/>
                <BorrowerForm className={this.props.page !== 'borrowerForm' ? "hidden" : ""}/>
            </div>
        );
    }
}


LincMain.defaultProps = {
    page: 'landingPage'
};

function mapReduxStateToProps(state) {
    return {
        page: state.page
    };
}

export default connect(mapReduxStateToProps, null)(LincMain);
