import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, CheckBox} from '../helpers/form-helpers.jsx';
import { FormPanel } from '../common/form-styling.jsx'
import * as ReviewSubmitInfoActions from '../../actions/review-submit-info.js';
import { browserHistory } from 'react-router';
import styles from '../../styles/lender-match/review-submit.scss'
import ReviewSection from '../helpers/review-page-helpers.jsx';
import { Col } from 'react-bootstrap';


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

                <ReviewSection
                    label="Contact"
                    sectionContent = {this.props.contactInfoData}
                    editPath = "/form/contact"
                />
                <ReviewSection
                    label="Business"
                    sectionContent = {this.props.businessInfoData}
                    editPath = "/form/business"
                />
                <ReviewSection
                    label="Industry"
                    sectionContent = {this.props.industryInfoData}
                    editPath = "/form/industry"
                />
                <ReviewSection
                    label="Loan"
                    sectionContent = {this.props.loanData}
                    editPath = "/form/loan"
                />
                <ReviewSection
                    label="Additional"
                    sectionContent = {this.props.additionalInfoData}
                    editPath = "/form/additional"
                />

                <form ref={(input) => this.reviewSubmitInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <CheckBox     label="Please email me in the future about improving this tool."
                                   name="reviewEmailProspect"
                                   handleClick={this.handleClick.bind(this)}
                    />
                    <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                        <button className={styles.findLendersBtn +" btn-block"} type="submit"> Submit to Lenders </button>
                    </Col>
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
