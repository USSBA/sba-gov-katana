import React from 'react';
import {
    connect
}
from 'react-redux';
import {
    bindActionCreators
}
from 'redux';
import * as LoanActions from '../../actions/loan-form.js';
import Steps from 'react-steps';
import _ from 'lodash';

class LoanForm extends React.Component {
    render() {
        // TODO: refactor this to be more extensible
        let pages = ['contact', 'loan', 'business', 'additional', 'review and submit']; // TODO make this static or configuration
        let page = this.props.location.replace('/form/', '');
        let locationIndex = _.indexOf(pages, page);
        let data = [{
            text: "Contact",
            isActive: locationIndex === 0,
            isDone: locationIndex > 0
        }, {
            text: "Loan",
            isActive: locationIndex === 1,
            isDone: locationIndex > 1
        }, {
            text: "Business",
            isActive: locationIndex === 2,
            isDone: locationIndex > 2
        }, {
            text: "Additional",
            isActive: locationIndex === 3,
            isDone: locationIndex > 3
        }, {
            text: "Review and Submit",
            isActive: locationIndex === 4,
            isDone: locationIndex > 4
        }];
        return (
            <div>
                <Steps items={data} type={'point'}/>
                {this.props.children}
            </div>
        );
    };
}

function mapReduxStateToProps(reduxState, ownProps) {
    return {
        location: ownProps.location.pathname
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(LoanActions, dispatch)
    }
}

export default connect(
    mapReduxStateToProps,
    mapDispatchToProps
)(LoanForm);
