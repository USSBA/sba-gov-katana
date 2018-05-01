import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startCase } from 'lodash'
import { Button } from 'atoms'
import { FormPageButtons } from 'molecules'

import * as LenderMatchActions from '../../../../actions/lender-match.js'
import * as LocationChangeActions from '../../../../actions/navigation.js'

import styles from './review-submit.scss'
import ReviewSection from './review-page-helpers.jsx'

class ReviewSubmitInfoForm extends React.Component {
  constructor() {
    super()
    this.state = {
      reviewSubmitInfoFields: {}
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  makeEditEvent(target) {
    return
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.actions.matchFormData({
      loanData: this.props.loanData,
      additionalInfoData: this.props.additionalInfoData,
      contactInfoData: this.props.contactInfoData,
      businessInfoData: this.props.businessInfoData,
      industryInfoData: this.props.industryInfoData
    })
    this.props.locationActions.locationChange('/lendermatch/success', {
      action: 'Submission',
      label: 'Data Submitted'
    })
    this.reviewSubmitInfoForm.reset()
  }

  handleEditClick(target) {
    this.props.locationActions.locationChange('/lendermatch/form/' + target, {
      action: 'Edit Button Pushed: ' + startCase(target)
    })
  }

  render() {
    let formId = 'lender-match-review-and-submit-form'
    return (
      <div id="lender-match-review-and-submit-panel">
        <ContactSection
          contactInfoData={this.props.contactInfoData}
          onEditClick={() => this.handleEditClick('contact')}
        />
        <BusinessSection
          businessInfoData={this.props.businessInfoData}
          onEditClick={() => this.handleEditClick('business')}
        />
        <IndustrySection
          industryInfoData={this.props.industryInfoData}
          onEditClick={() => this.handleEditClick('industry')}
        />
        <LoanSection loanData={this.props.loanData} onEditClick={() => this.handleEditClick('loan')} />
        <AdditionalSection
          additionalInfoData={this.props.additionalInfoData}
          onEditClick={() => this.handleEditClick('additional')}
        />
        <form
          id={formId}
          ref={input => (this.reviewSubmitInfoForm = input)}
          onSubmit={e => this.handleSubmit(e)}
        >
          <FormPageButtons
            parentId={formId}
            continueButtonFullWidth
            continueButtonText="SUBMIT"
            showBackButton={false}
            continueButtonHandler={this.handleSubmit.bind(this)}
          />
        </form>
      </div>
    )
  }
}

const EditButton = props => {
  return (
    <div className={styles.editButton}>
      <Button
        autoFocus={props.autoFocus}
        id={`${props.parentId}-edit-button`}
        onClick={props.onEditClick}
        secondary
        small
      >
        Edit
      </Button>
    </div>
  )
}

const ContactSection = props => {
  let id = 'lender-match-review-and-submit-panel-contact'
  let contact = props.contactInfoData
  return (
    <div id={id} className={styles.sectionContainer}>
      <h1 className={styles.title}>Contact</h1>
      <p className={styles.field}>{contact.contactFullName}</p>
      <p className={styles.field}>{contact.contactPhoneNumber}</p>
      <p className={styles.field}>{contact.contactEmailAddress}</p>
      <EditButton parentId={id} autofocus={true} onEditClick={props.onEditClick} />
    </div>
  )
}

const BusinessSection = props => {
  let id = 'lender-match-review-and-submit-panel-business'
  let business = props.businessInfoData
  return (
    <div id={id} className={styles.sectionContainer}>
      <h1 className={styles.title}>Business</h1>
      <p className={styles.field}>{business.businessInfoName}</p>
      <p className={styles.field}>{business.businessInfoWebsite || '-'}</p>
      <p className={styles.field}>{business.businessInfoZipcode}</p>
      <p className={styles.field}>{business.businessInfoDescription}</p>
      <EditButton parentId={id} onEditClick={props.onEditClick} />
    </div>
  )
}

const IndustrySection = props => {
  let id = 'lender-match-review-and-submit-panel-industry'
  let industry = props.industryInfoData
  return (
    <div className={styles.sectionContainer} id={id}>
      {' '}
      <h1 className={styles.title}>Industry</h1>
      <p className={styles.field}>{industry.industryType}</p>
      <p className={styles.field}>{industry.industryExperience}</p>
      <EditButton parentId={id} onEditClick={props.onEditClick} />
    </div>
  )
}

const LoanSection = props => {
  let id = 'review-and-submit-panel-loan'
  let loan = props.loanData
  return (
    <div id={id} className={styles.sectionContainer}>
      <h1 className={styles.title}>Loan</h1>
      <p className={styles.field}>{loan.loanAmount}</p>
      <p className={styles.field}>{loan.loanUsage}</p>
      <p className={styles.field}>{loan.loanDescription}</p>
      <EditButton parentId={id} onEditClick={props.onEditClick} />
    </div>
  )
}

const AdditionalSection = props => {
  let id = 'lender-match-review-and-submit-panel-additional'
  let additionalInfo = props.additionalInfoData
  let displaySection =
    additionalInfo.isGeneratingRevenue ||
    additionalInfo.hasWrittenPlan ||
    additionalInfo.hasFinancialProjections ||
    additionalInfo.isVeteran
  return (
    <div>
      {displaySection ? (
        <div id={id} className={styles.sectionContainer}>
          <h1 className={styles.title}>Additional</h1>
          {additionalInfo.isGeneratingRevenue ? (
            <p className={styles.field}>I'm generating revenue</p>
          ) : null}
          {additionalInfo.hasWrittenPlan ? (
            <p className={styles.field}>I have a written business plan</p>
          ) : null}
          {additionalInfo.hasFinancialProjections ? (
            <p className={styles.field}>I have financial projections</p>
          ) : null}
          {additionalInfo.isVeteran ? <p className={styles.field}>I'm a veteran</p> : null}
          <EditButton parentId={id} onEditClick={props.onEditClick} />
        </div>
      ) : null}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loanData: state.lenderMatch.loanData,
    additionalInfoData: state.lenderMatch.additionalInfoData,
    contactInfoData: state.lenderMatch.contactInfoData,
    businessInfoData: state.lenderMatch.businessInfoData,
    industryInfoData: state.lenderMatch.industryInfoData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch),
    locationActions: bindActionCreators(LocationChangeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSubmitInfoForm)
