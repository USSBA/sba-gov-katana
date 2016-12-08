import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, CheckBox} from '../helpers/form-helpers.jsx';
import { FormPanel } from '../common/form-styling.jsx'
import * as ReviewSubmitInfoActions from '../../actions/review-submit-info.js';
import { browserHistory } from 'react-router';


import { ReviewSection } from '../helpers/review-page-helpers.jsx';

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
            <FormPanel title="Take one last look and then submit">

                <div className ="col-xs-12 col-lg-6 col-lg-offset-3">
                    <ReviewSection label="test"></ReviewSection>
                </div>

                <form ref={(input) => this.reviewSubmitInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <CheckBox     label="Please email me in the future about improving this tool."
                                   name="reviewEmailProspect"
                                   handleClick={this.handleClick.bind(this)}
                    />
                    <button className="col-xs-2 col-xs-offset-5" type="submit"> Submit to Lenders </button>
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
