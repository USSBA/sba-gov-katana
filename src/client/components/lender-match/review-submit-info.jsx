import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, CheckBox } from '../helpers/form-helpers.jsx';
import { FormPanel } from '../common/form-styling.jsx'
import * as ReviewSubmitInfoActions from '../../actions/review-submit-info.js';
import { browserHistory } from 'react-router';
import styles from '../../styles/lender-match/review-submit.scss'
import ReviewSection from '../helpers/review-page-helpers.jsx';
import { Col } from 'react-bootstrap';


class ReviewSubmitInfoForm extends React.Component {
  constructor() {
    super();
    this.state = {
      reviewSubmitInfoFields: {}
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.matchFormData({
      loanData: this.props.loanData,
      additionalInfoData: this.props.additionalInfoData,
      contactInfoData: this.props.contactInfoData,
      businessInfoData: this.props.businessInfoData,
      industryInfoData: this.props.industryInfoData
    });
    browserHistory.push("/linc/success");
    this.reviewSubmitInfoForm.reset();
  }

  handleChange(e) {
    let reviewSubmitInfoFields = {};
    reviewSubmitInfoFields[e.target.name] = e.target.value;
    this.setState({
      reviewSubmitInfoFields: {
        ...this.state.reviewSubmitInfoFields,
        ...reviewSubmitInfoFields
      }
    });
    console.log(this.state.reviewSubmitInfoFields);
  }

  handleClick(e) {
    let reviewSubmitInfoFields = {};
    reviewSubmitInfoFields[e.target.name] = e.target.value;
    this.setState({
      reviewSubmitFields: {
        ...this.state.reviewSubmitInfoFields,
        ...reviewSubmitInfoFields
      }
    });
    console.log(this.state.reviewSubmitInfoFields);
  }

  render() {
    return (
      <FormPanel title="Take one last look and then submit">
        <ReviewSection label="Contact" sectionContent={ this.props.contactInfoData } editPath="/linc/form/contact" />
        <ReviewSection label="Business" sectionContent={ this.props.businessInfoData } editPath="/linc/form/business" />
        <ReviewSection label="Industry" sectionContent={ this.props.industryInfoData } editPath="/linc/form/industry" />
        <ReviewSection label="Loan" sectionContent={ this.props.loanData } editPath="/linc/form/loan" />
        <ReviewSection label="Additional" sectionContent={ this.props.additionalInfoData } editPath="/linc/form/additional" />
        <form ref={ (input) => this.reviewSubmitInfoForm = input } onSubmit={ (e) => this.handleSubmit(e) }>
          <CheckBox label="Please email me in the future about improving this tool." name="reviewEmailProspect" handleClick={ this.handleClick.bind(this) } />
          <Col md={ 6 } mdOffset={ 3 }>
          <button className={ styles.findLendersBtn + " btn-block" } type="submit"> Submit to Lenders </button>
          </Col>
        </form>
      </FormPanel>
      );
  }
  ;
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ReviewSubmitInfoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewSubmitInfoForm);
