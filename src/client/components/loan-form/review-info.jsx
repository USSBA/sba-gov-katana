import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput CheckBox} from '../helpers/form-helpers.jsx'
import * as ContactInfoActions from '../../actions/contact-info.js'
import { browserHistory } from 'react-router';


class ReviewInfoForm extends React.Component {
    constructor(){
        super();
        this.state ={
            reviewFields: {
                reviewName: "",
                reviewAddress: "",
                neededFunds: "",
                useOfFunds: "",
                useOfFundsDescription: "",
                emailProspect: ""
            }
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.createReviewInfo(this.state.reviewFields);
        browserHistory.push('/form/loan');
        this.loanForm.reset()
    }

    handleChange(e){
        let reviewFields = {};
        reviewFields[e.target.name] = e.target.value;
        this.setState({reviewFields: {...this.state.reviewFields, ...reviewFields}});
        console.log(this.state.reviewFields)
    }

    handleClick(e){
        let reviewFields = {};
        reviewFields[e.target.name] = e.target.value;
        this.setState({reviewFields: {...this.state.reviewFields, ...reviewFields}});
        console.log(this.state.reviewFields)
    }

    render() {
        return (
            <div>
                <form ref={(input) => this.loanForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <h2 className="col-xs-2 col-xs-offset-5">Review and Submit</h2>
                    <TextInput     label="Name"
                                   name="reviewName"
                                   handleChange={this.handleChange.bind(this)}
                    />

                    <TextInput     label="Address"
                                   name="reviewAddress"
                                   handleChange={this.handleChange.bind(this)}
                    />

                    <TextInput     label="Funds Needed"
                                   name="neededFunds"
                                   handleChange={this.handleChange.bind(this)}
                    />
                    <TextInput     label="Use of Funds"
                                   name="useOfFunds"
                                   handleChange={this.handleChange.bind(this)}
                    />
                    <TextInput     label="Use of Funds Description"
                                   name="useOfFundsDescription"
                                   handleChange={this.handleChange.bind(this)}
                    />
                    <CheckBox     label="Please email me in the future about improving this tool."
                                   name="emailProspect"
                                   handleClick={this.handleClick.bind(this)}
                    />
                    <button className="col-xs-2 col-xs-offset-5" type="submit">Next </button>
                </form>
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
        actions: bindActionCreators(ReviewInfoActions, dispatch)
    }
}

export default connect(
    mapReduxStateToProps,
    mapDispatchToProps
)(ReviewInfoForm);
