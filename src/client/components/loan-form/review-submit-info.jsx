import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, CheckBox} from '../helpers/form-helpers.jsx';
import { FormPanel } from '../common/form-styling.jsx'
import * as ReviewSubmitInfoActions from '../../actions/review-submit-info.js';
import { browserHistory } from 'react-router';


class ReviewSubmitInfoForm extends React.Component {
    constructor(){
        super();
        this.state ={
            reviewSubmitInfoFields: {}
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.matchFormData({
            loanData: this.props.loanData,
            additionalInfoData: this.props.additionalInfoData,
            contactInfoData: this.props.contactInfoData,
            businessInfoData: this.props.businessInfoData,
            industryInfoData: this.props.industryInfoData
        });
        browserHistory.push("/success");
        this.reviewSubmitInfoForm.reset();
    }

    handleChange(e){
        let reviewSubmitInfoFields = {};
        reviewSubmitInfoFields[e.target.name] = e.target.value;
        this.setState({reviewSubmitInfoFields: {...this.state.reviewSubmitInfoFields, ...reviewSubmitInfoFields}});
        console.log(this.state.reviewSubmitInfoFields);
    }

    handleClick(e){
        let reviewSubmitInfoFields = {};
        reviewSubmitInfoFields[e.target.name] = e.target.value;
        this.setState({reviewSubmitFields: {...this.state.reviewSubmitInfoFields, ...reviewSubmitInfoFields}});
        console.log(this.state.reviewSubmitInfoFields);
    }

    render() {
        return (
            <FormPanel title="Review and Submit">
                <form ref={(input) => this.reviewSubmitInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <TextInput     label="Name"
                                   name="reviewName"
                                   handleChange={this.handleChange.bind(this)}
                                   defaultValue={this.props.contactInfoData.contactFullName}
                    />

                    <TextInput     label="Zipcode"
                                   name="reviewZipcode"
                                   handleChange={this.handleChange.bind(this)}
                                   defaultValue={this.props.businessInfoData.businessInfoZipcode}
                    />

                    <TextInput     label="Funds Needed"
                                   name="reviewNeededFunds"
                                   handleChange={this.handleChange.bind(this)}
                                   defaultValue={this.props.loanData.loanAmount}
                    />
                    <TextInput     label="Use of Funds"
                                   name="reviewUseOfFunds"
                                   handleChange={this.handleChange.bind(this)}
                                   defaultValue={this.props.loanData.loanDescription}
                    />
                    <TextInput     label="Use of Funds Description"
                                   name="reviewUseOfFundsDescription"
                                   handleChange={this.handleChange.bind(this)}
                                   defaultValue={this.props.businessInfoData.businessInfoDescription}
                    />
                    <CheckBox     label="Please email me in the future about improving this tool."
                                   name="reviewEmailProspect"
                                   handleClick={this.handleClick.bind(this)}
                    />
                    <button className="col-xs-2 col-xs-offset-5" type="submit"> See Matches </button>
                </form>
            </FormPanel>
        );
    };
}

function mapStateToProps(state) {
    return {
        loanData: state.loanReducer.loanData,
        additionalInfoData: state.additionalInfoReducer.additionalInfoData,
        contactInfoData: state.contactInfoReducer.contactInfoData,
        businessInfoData: state.businessInfoReducer.businessInfoData,
        industryInfoData: state.industryInfoReducer.industryInfoData
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(ReviewSubmitInfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewSubmitInfoForm);
