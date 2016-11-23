import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoanActions from '../../actions/loan-form.js'
import { browserHistory } from 'react-router';
import { Col } from 'react-bootstrap';
var Steps = require('react-steps');

class LoanForm extends React.Component {

    render() {
        let data = {};
        return (
            <div>
                {this.props.children}
            </div>
        );
    };
}

function mapReduxStateToProps(reduxState) {
    console.log(reduxState);
    return {};
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(LoanActions, dispatch)
    }
}

export default connect(
    mapReduxStateToProps,
    mapDispatchToProps
)(LoanForm);
