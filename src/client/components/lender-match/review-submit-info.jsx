import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, CheckBox } from '../helpers/form-helpers.jsx';
import { FormPanel } from '../common/form-styling.jsx'
import * as LenderMatchActions from '../../actions/lender-match.js';
import * as LocationChangeActions from '../../actions/location-change.js';
import styles from './review-submit.scss'
import ReviewSection from '../helpers/review-page-helpers.jsx';


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
    this.props.locationActions.locationChange("/linc/success", {
      action: "Submission",
      label: "Data Submitted"
    });
    this.reviewSubmitInfoForm.reset();
  }

  render() {
    return (
      <div>
        <ContactSection contactInfoData={ this.props.contactInfoData } onEditClick={ () => this.props.locationActions.locationChange("/linc/form/contact") } />
        <BusinessSection businessInfoData={ this.props.businessInfoData } onEditClick={ () => this.props.locationActions.locationChange("/linc/form/business") } />
        <IndustrySection industryInfoData={ this.props.industryInfoData } onEditClick={ () => this.props.locationActions.locationChange("/linc/form/industry") } />
        <LoanSection loanData={ this.props.loanData } onEditClick={ () => this.props.locationActions.locationChange("/linc/form/loan") } />
        <AdditionalSection additionalInfoData={ this.props.additionalInfoData } onEditClick={ () => this.props.locationActions.locationChange("/linc/form/additional") } />
        <form ref={ (input) => this.reviewSubmitInfoForm = input } onSubmit={ (e) => this.handleSubmit(e) }>
          <button className={ styles.submitBtn } type="submit"> SUBMIT </button>
        </form>
      </div>
      );
  }
  ;
}

// dummy objects for skipping form steps
// let contactInfoData = {
//   contactEmailAddress: "blahblah@gmail.com",
//   contactFullName: "Alexander Nelson",
//   contactPhoneNumber: "7037574642"
// };
//
// let industryInfoData = {
//   industryExperience: "",
//   industryType: "Automotive/Service Station,Energy"
// };
//
// let additionalInfoData = {
//   hasFinancialProjections: false,
//   hasWrittenPlan: false,
//   isGeneratingRevenue: false,
//   isVeteran: false
// };
//
// let businessInfoData = {
//   businessInfoDescription: "It is a business that does some interesting things yeah. It does a lot of interesting things and this paragraphs should be long enough to simulate stuff.",
//   businessInfoName: "Propers Pizza Palace",
//   businessInfoWebsite: "suhdude.com",
//   businessInfoZipcode: "22066"
// };
//
// let loanData = {
//   loanAmount: "$234,234,234",
//   loanDescription: "Developing a Product,Participating in Trade Show",
//   loanUsage: "This will be used to make some good business and make things very profitable for my stakeholders."
// };

const EditButton = (props) => {
  return (<button className={ styles.editBtn } onClick={ props.onEditClick }>Edit</button>);
};

const ContactSection = (props) => {
  let contact = props.contactInfoData;
  return (
    <div className={ styles.sectionContainer }>
      <h1 className={ styles.title }>Contact</h1>
      <p className={ styles.field }>
        { contact.contactFullName }
      </p>
      <p className={ styles.field }>
        { contact.contactPhoneNumber }
      </p>
      <p className={ styles.field }>
        { contact.contactEmailAddress }
      </p>
      <EditButton onEditClick={ props.onEditClick } />
    </div>
  )
};

const BusinessSection = (props) => {
  let business = props.businessInfoData;
  return (
    <div className={ styles.sectionContainer }>
      <h1 className={ styles.title }>Business</h1>
      <p className={ styles.field }>
        { business.businessInfoName }
      </p>
      <p className={ styles.field }>
        { business.businessInfoWebsite || "-" }
      </p>
      <p className={ styles.field }>
        { business.businessInfoZipcode }
      </p>
      <p className={ styles.field }>
        { business.businessInfoDescription }
      </p>
      <EditButton onEditClick={ props.onEditClick } />
    </div>
  )
};

const IndustrySection = (props) => {
  let industry = props.industryInfoData;
  return (
    <div className={ styles.sectionContainer }>
      <h1 className={ styles.title }>Industry</h1>
      <p className={ styles.field }>
        { industry.industryType }
      </p>
      <p className={ styles.field }>
        { industry.industryExperience }
      </p>
      <EditButton onEditClick={ props.onEditClick } />
    </div>
  )
};

const LoanSection = (props) => {
  let loan = props.loanData;
  return (
    <div className={ styles.sectionContainer }>
      <h1 className={ styles.title }>Loan</h1>
      <p className={ styles.field }>
        { loan.loanAmount }
      </p>
      <p className={ styles.field }>
        { loan.loanUsage }
      </p>
      <p className={ styles.field }>
        { loan.loanDescription }
      </p>
      <EditButton onEditClick={ props.onEditClick } />
    </div>
  )
};

const AdditionalSection = (props) => {
  let additionalInfo = props.additionalInfoData;
  let displaySection = additionalInfo.isGeneratingRevenue || additionalInfo.hasWrittenPlan || additionalInfo.hasFinancialProjections || additionalInfo.isVeteran;
  return (
    <div>
      { displaySection ? (
        <div className={ styles.sectionContainer }>
          <h1 className={ styles.title }>Additional</h1>
          { additionalInfo.isGeneratingRevenue ? <p className={ styles.field }>I'm generating revenue</p> : null }
          { additionalInfo.hasWrittenPlan ? <p className={ styles.field }>I have a written business plan</p> : null }
          { additionalInfo.hasFinancialProjections ? <p className={ styles.field }>I have financial projections</p> : null }
          { additionalInfo.isVeteran ? <p className={ styles.field }>I'm a veteran</p> : null }
          <EditButton onEditClick={ props.onEditClick } />
        </div>
        ) : null }
    </div>
  )
};



function mapStateToProps(state) {
  return {
    loanData: state.lenderMatch.loanData,
    additionalInfoData: state.lenderMatch.additionalInfoData,
    contactInfoData: state.lenderMatch.contactInfoData,
    businessInfoData: state.lenderMatch.businessInfoData,
    industryInfoData: state.lenderMatch.industryInfoData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch),
    locationActions: bindActionCreators(LocationChangeActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewSubmitInfoForm);
