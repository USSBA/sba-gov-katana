import resourceCenterProfileReducer from '../../../reducers/resource-center-profile'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submitProfile } from '../../../actions/resource-center-profile'
import React from 'react'
import {
  Button,
  CheckBox,
  Checkbox,
  FormErrorMessage,
  MultiSelect,
  Radio,
  TextArea,
  TextInput
} from 'atoms'
import _ from 'lodash'
import {
  getPartners,
  getPartnerOffices,
  getPartnersByZip
} from '../../../services/resource-center-lookup.js'
import style from './resource-center-profile-page.scss'

const idPrefix = 'resource-center-profile-'
const enableResourceCenterOverride = ['SBDC', 'VBOC', 'SCORE', 'WBC']

class ResourceCenterProfilePage extends React.Component {
  constructor() {
    super()
    this.state = {
      submitted: false,
      partners: getPartners(enableResourceCenterOverride),
      honeyPotText: '',
      offices: null,
      selectedOfficeOption: null,
      selectedOffice: null,
      otherServiceArea: '',
      isFieldValid: {
        type: null,
        name: null,
        address: null,
        phone: null,
        businessStage: null,
        serviceArea: null,
        needsUpdating: null,
        email: null,
        url: null,
        hours: true, // optional so always valid
        expertise: null,
        services: null,
        languages: true // optional so always valid
      },

      profile: {
        type: null,
        name: null,
        address: null,
        phone: null,
        businessStage: '',
        serviceArea: null,
        needsUpdating: '',
        email: '',
        url: '',
        hours: {
          mondayOpen: null,
          mondayClose: null,
          tuesdayOpen: null,
          tuesdayClose: null,
          wednesdayOpen: null,
          wednesdayClose: null,
          thursdayOpen: null,
          thursdayClose: null,
          fridayOpen: null,
          fridayClose: null,
          saturdayOpen: null,
          saturdayClose: null,
          sundayOpen: null,
          sundayClose: null,
          furtherDescription: ''
        },
        expertise: [],
        services: [],
        languages: []
      }
    }
  }

  isFieldInvalid(field) {
    return this.state.isFieldValid[field] === false
  }
  onFocus() {}

  onBlur() {}

  updateOffices(partner) {
    let offices = _.reject(getPartnerOffices(partner), office => {
      return _.isEmpty(office)
    })
    offices = _.orderBy(offices, [
      office => {
        return office.name2.toLowerCase()
      }
    ])
    this.setState({
      offices: offices
    })
  }

  handleRadio(value, propName) {
    const newProfile = _.cloneDeep(this.state.profile)
    newProfile[propName] = value
    this.setState({ profile: newProfile })
  }

  handleCheckbox(event, propName) {
    const newProfile = _.cloneDeep(this.state.profile)
    const arrayToUpdate = newProfile[propName]
    const itemToUpdate = event.target.name
    if (event.target.checked) {
      arrayToUpdate.push(itemToUpdate)
    } else {
      _.remove(arrayToUpdate, item => {
        return item === itemToUpdate
      })
    }
    this.setState({ profile: newProfile })
  }

  handleSelect(newSelection, propName) {
    const value = newSelection.value
    const newProfile = _.cloneDeep(this.state.profile)
    if (_.endsWith(propName, 'Open') || _.endsWith(propName, 'Close')) {
      newProfile.hours[propName] = value
    } else {
      newProfile[propName] = value
    }
    // if resource partner is changed
    if (propName === 'type') {
      this.updateOffices(newSelection.value)
      this.setState({
        profile: newProfile,
        selectedOffice: null,
        selectedOfficeOption: null
      })
    } else {
      this.setState({ profile: newProfile })
    }
  }

  handleChange(event, propName) {
    const newProfile = _.cloneDeep(this.state.profile)
    newProfile[event.target.name] = event.target.value
    this.setState({ profile: newProfile })
  }

  formatAddress(address) {
    if (!address) {
      return 'Please select your office'
    }
    const addressPartList = [address.street1, address.street2, address.city, address.state, address.zip]
    const addressString = _.join(
      _.filter(addressPartList, addressPart => {
        return !_.isEmpty(addressPart)
      }),
      ', '
    )
    return addressString
  }

  handleOfficeSelect(newSelection) {
    const newOffice = newSelection.value
    const newProfile = _.cloneDeep(this.state.profile)
    newProfile.name = newOffice.name1 + ' | ' + newOffice.name2
    newProfile.phone = newOffice.phone
    newProfile.address = this.formatAddress(newOffice)
    this.setState({
      profile: newProfile,
      selectedOffice: newOffice,
      selectedOfficeOption: newSelection
    })
  }

  handleMaidenNameChange(e) {
    this.setState({ honeyPotText: e.target.value })
  }

  handleFurtherDescription(event) {
    const newProfile = _.cloneDeep(this.state.profile)
    newProfile.hours.furtherDescription = event.target.value
    this.setState({ profile: newProfile })
  }

  validateFields() {
    let allFieldsValid = true
    const requiredFields = [
      'type',
      'name',
      'businessStage',
      'serviceArea',
      'email',
      'url',
      'expertise',
      'services',
      'needsUpdating'
    ]
    const newValidationState = _.cloneDeep(this.state.isFieldValid)
    _.forEach(requiredFields, field => {
      newValidationState[field] = !_.isEmpty(this.state.profile[field])
      // make sure that one of the update contact options is clicked ('' is the default value)
      if (field === 'needsUpdating') {
        newValidationState[field] = this.state.profile[field] !== ''
      }
      if (!newValidationState[field]) {
        allFieldsValid = false
      }
    })
    // if someone selects other for the service area make sure it's filled out
    if (this.state.profile.serviceArea === 'Other' && !this.state.otherServiceArea) {
      newValidationState.serviceArea = false
      allFieldsValid = false
    }
    this.setState({
      isFieldValid: newValidationState
    })
    return allFieldsValid
  }
  handleSubmit(event) {
    event.preventDefault()
    const allFieldsValid = this.validateFields()
    if (allFieldsValid) {
      const profile = _.cloneDeep(this.state.profile)
      // if the service area is specified as other, replace the value in the other text field
      if (profile.serviceArea === 'Other' && this.state.otherServiceArea) {
        profile.serviceArea = this.state.otherServiceArea
      }
      this.props.submitProfile(profile, this.state.honeyPotText)
    }
  }

  renderPartnerSelect() {
    const partners = _.map(this.state.partners, partner => {
      return {
        value: partner,
        label: partner
      }
    })

    return (
      <div>
        <label
          id={idPrefix + 'partner-label'}
          className={this.isFieldInvalid('type') ? style.invalid : style.formLabel}
        >
          Which resource partner do you represent?
        </label>
        <MultiSelect
          id={idPrefix + 'partner'}
          value={this.state.profile.type}
          options={partners}
          multi={false}
          onChange={e => {
            return this.handleSelect(e, 'type')
          }}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          aria-labelledby={idPrefix + 'partner-label'}
          required={true}
        />
      </div>
    )
  }

  renderOfficeSelect() {
    const offices = _.map(this.state.offices, office => {
      const locationArray = [office.city, office.state]
      let locationString = _.join(
        _.filter(locationArray, location => {
          return !_.isEmpty(location)
        }),
        ', '
      )
      if (locationString) {
        locationString = ' (' + locationString + ')'
      }
      return {
        value: office,
        label: office.name2 + locationString
      }
    })

    return (
      <div>
        <label
          id={idPrefix + 'office-label'}
          className={this.isFieldInvalid('name') ? style.invalid : style.formLabel}
        >
          Which office?
        </label>
        <MultiSelect
          id={idPrefix + 'office'}
          value={this.state.selectedOfficeOption}
          options={offices}
          multi={false}
          onChange={this.handleOfficeSelect.bind(this)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          aria-labelledby={idPrefix + 'office-label'}
          required={true}
        />
      </div>
    )
  }
  renderAreaSelect() {
    const areas = _.map(['Entire Nation', 'Entire State', 'Entire City', 'Other'], area => {
      return {
        value: area,
        label: area
      }
    })

    return (
      <div>
        <label
          id={idPrefix + 'service-area-label'}
          className={this.isFieldInvalid('serviceArea') ? style.invalid : style.formLabel}
        >
          What area does your office serve?
        </label>
        <MultiSelect
          id={idPrefix + 'service-area'}
          value={this.state.profile.serviceArea}
          options={areas}
          multi={false}
          onChange={e => {
            this.handleSelect(e, 'serviceArea')
            this.setState({ otherServiceArea: '' })
          }}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          aria-labelledby={idPrefix + 'service-area-label'}
          required={true}
        />
        {this.state.profile.serviceArea === 'Other' && (
          <TextInput
            id={idPrefix + 'service-area-other'}
            name="serviceArea"
            placeholder="Custom other value"
            onChange={e => {
              return this.setState({ otherServiceArea: e.target.value })
            }}
            value={this.state.otherServiceArea}
            onBlur={this.onBlur.bind(this)}
            onFocus={this.onFocus.bind(this)}
            autoFocus={true}
            required={this.state.profile.serviceArea === 'Other'}
          />
        )}
      </div>
    )
  }

  renderHourDropdowns() {
    const hourArray = ['Closed']
    // generate hours from 12:00 am to 11:30 pm
    for (let i = 0; i < 48; i++) {
      let hour = Math.floor(i / 2) % 12
      if (hour === 0) {
        hour = 12
      }
      let minutes = ':00'
      if (i % 2 > 0) {
        minutes = ':30'
      }
      let suffix = ' am'
      if (i >= 24) {
        suffix = ' pm'
      }
      const timeString = hour + minutes + suffix
      hourArray.push(timeString)
    }
    const hours = _.map(hourArray, hour => {
      return {
        value: hour,
        label: hour
      }
    })
    const dayOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const hoursOptions = _.map(dayOfTheWeek, day => {
      const dayOpen = day.toLowerCase() + 'Open'
      const dayOpenPlaceholder = day === 'Saturday' || day === 'Sunday' ? 'Closed' : '8:00 am'
      const dayClose = day.toLowerCase() + 'Close'
      const dayClosePlaceholder = day === 'Saturday' || day === 'Sunday' ? 'Closed' : '5:00 pm'
      return (
        <div className={style.hoursRow} key={day + '-container'}>
          <div className={style.hoursLabel}>
            <label>{day}</label>
          </div>
          <div className={style.hoursSelect}>
            <MultiSelect
              className={style.hoursSelect}
              id={idPrefix + dayOpen}
              value={this.state.profile.hours[dayOpen]}
              options={hours}
              multi={false}
              key={dayOpen}
              placeholder={dayOpenPlaceholder}
              onChange={e => {
                return this.handleSelect(e, dayOpen)
              }}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              aria-label={'Select your normal ' + day + ' opening time'}
            />
          </div>
          <div className={style.hoursTo}>to</div>
          <div className={style.hoursSelect}>
            <MultiSelect
              className={style.hoursSelect}
              id={idPrefix + dayClose}
              value={this.state.profile.hours[dayClose]}
              options={hours}
              multi={false}
              key={dayClose}
              placeholder={dayClosePlaceholder}
              onChange={e => {
                return this.handleSelect(e, dayClose)
              }}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              aria-label={'Select your normal ' + day + ' closing time'}
            />
          </div>
        </div>
      )
    })
    return (
      <div>
        <label className={style.formLabel}>
          What are your normal office hours? <span className={style.optional}>(optional)</span>
        </label>
        {hoursOptions}
      </div>
    )
  }

  renderExpertiseCheckboxes() {
    const expertiseOptions = _.map(
      [
        'Creating a plan',
        'Access & Capital',
        'Business finances',
        'Marketing and sales',
        'Government contracting',
        'Legal issues',
        'International trade',
        'Networking',
        'Business management',
        'Technology development',
        'Disaster preparedness',
        'HR/hiring'
      ],
      expertise => {
        return (
          <Checkbox
            id={idPrefix + expertise}
            name={expertise}
            label={expertise}
            key={expertise}
            handleChange={e => {
              return this.handleCheckbox(e, 'expertise')
            }}
            checked={this.state.profile.expertise.includes(expertise)}
          />
        )
      }
    )
    return (
      <div role="group" aria-labelledby={idPrefix + 'expertise-label'}>
        <label
          id={idPrefix + 'expertise-label'}
          className={this.isFieldInvalid('expertise') ? style.invalid : style.formLabel}
        >
          In which three topic areas does your office have the most expertise?
        </label>
        {expertiseOptions}
      </div>
    )
  }
  renderServiceCheckboxes() {
    const serviceOptions = _.map(
      [
        'Walk-ins',
        'Appointments',
        'In-person',
        'By phone',
        'By video chat or online',
        'Trainings or workshops',
        'Certifications',
        'Night or weekend availability'
      ],
      service => {
        return (
          <Checkbox
            id={idPrefix + service}
            name={service}
            label={service}
            key={service}
            handleChange={e => {
              return this.handleCheckbox(e, 'services')
            }}
            checked={this.state.profile.services.includes(service)}
          />
        )
      }
    )
    return (
      <div role="group" aria-labelledby={idPrefix + 'services-label'}>
        <label
          id={idPrefix + 'services-label'}
          className={this.isFieldInvalid('services') ? style.invalid : style.formLabel}
        >
          What services does your office provide?
        </label>
        {serviceOptions}
      </div>
    )
  }

  renderLanguageCheckboxes() {
    const languageOptions = _.map(
      [
        'Spanish',
        'Chinese',
        'Tagalog',
        'Vietnamese',
        'French',
        'German',
        'Korean',
        'Arabic',
        'Russian',
        'Italian',
        'Other'
      ],
      language => {
        return (
          <Checkbox
            id={idPrefix + language}
            name={language}
            label={language}
            key={language}
            checked={this.state.profile.languages.includes(language)}
            handleChange={e => {
              return this.handleCheckbox(e, 'languages')
            }}
          />
        )
      }
    )

    return (
      <div role="group" aria-labelledby={idPrefix + 'languages-label'}>
        <label id={idPrefix + 'languages-label'} className={style.formLabel}>
          In which languages other than English can your office provide counseling
          <span className={style.optional}>(optional)</span>
        </label>
        {languageOptions}
      </div>
    )
  }

  renderBusinessStageRadios() {
    const businessStageOptions = [
      {
        value: 'New and early stage businesses',
        text: 'New and early stage businesses'
      },
      {
        value: 'Established businesses',
        text: 'Established businesses'
      }
    ]
    return (
      <div>
        <label
          id={idPrefix + 'business-stage-label'}
          className={this.isFieldInvalid('businessStage') ? style.invalid : style.formLabel}
        >
          Which business stage does your office primarily serve?
        </label>
        <Radio
          id={idPrefix + 'business-stage'}
          options={businessStageOptions}
          value={this.state.profile.businessStage}
          onChange={e => {
            return this.handleRadio(e, 'businessStage')
          }}
          textStyle={style.radioText}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          aria-labelledby={idPrefix + 'business-stage-label'}
        />
      </div>
    )
  }

  renderShouldUpdateAddressRadios() {
    const selectedOffice = this.state.selectedOffice
    const updateContactInfoOptions = [
      {
        value: 'false',
        text: 'Yes'
      },
      {
        value: 'true',
        text: 'No, it needs to be updated'
      }
    ]
    return (
      <div>
        <div id={idPrefix + 'contact-info'}>
          <label
            id={idPrefix + 'needs-updating-label'}
            className={this.isFieldInvalid('needsUpdating') ? style.invalid : style.formLabel}
          >
            Is this your physical office address and phone number?
          </label>
          <div>{selectedOffice.street1}</div>
          <div>{selectedOffice.street2}</div>
          <div>
            {selectedOffice.city ? selectedOffice.city + ', ' : ''}
            {selectedOffice.state ? selectedOffice.state + ', ' : ''}
            {selectedOffice.zip ? selectedOffice.zip : ''}
          </div>
          <div>{selectedOffice.phone}</div>
        </div>
        <Radio
          id={idPrefix + 'should-update-contact-info'}
          label=""
          name="shouldUpdateInfo"
          onChange={value => {
            this.handleRadio(value === 'true', 'needsUpdating')
          }}
          value={this.state.profile.needsUpdating.toString()}
          options={updateContactInfoOptions}
          textStyle={style.radioText}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          aria-labelledby={idPrefix + 'contact-info'}
        />
      </div>
    )
  }

  renderSubmissionComplete() {
    return (
      <div id={idPrefix + 'submission-complete'}>
        <h1>One Last Step</h1>
        <p>
          Thanks for completing this form. Your submission will help us better match you with your ideal
          clients.
        </p>
        <p>
          To update your office address and phone number, contact SBA's{' '}
          <a href="mailto:edmis@sba.gov?subject=Resource Center Profile- updates">
            Office of Entrepreneurial Development
          </a>
        </p>
      </div>
    )
  }

  render() {
    const selectedOffice = this.state.selectedOffice
    const selectedPartner = this.state.profile.type
    const isFieldValid = this.state.isFieldValid

    return (
      <div className={style.backgroundContainer}>
        <div className={style.container}>
          <form id={idPrefix + 'form'} className={this.props.isSubmitComplete ? style.hidden : style.form}>
            <h1>Resource Center Profile</h1>
            <p>
              Answer the following questions about your office's expertise to be better matched with your
              ideal clients. Thank you for your time and insight!
            </p>

            {this.renderPartnerSelect()}

            {selectedPartner && this.renderOfficeSelect()}

            {selectedOffice && this.renderShouldUpdateAddressRadios()}

            <TextInput
              id={idPrefix + 'email'}
              name="email"
              onChange={this.handleChange.bind(this)}
              value={this.state.profile.email}
              placeholder="me@myemaildomain.com"
              onBlur={this.onBlur.bind(this)}
              onFocus={this.onFocus.bind(this)}
              label="What's your office email?"
              labelStyle={this.isFieldInvalid('email') ? style.invalid : style.formLabel}
              required={true}
            />

            <TextInput
              id={idPrefix + 'url'}
              name="url"
              onChange={this.handleChange.bind(this)}
              value={this.state.profile.url}
              placeholder="http://"
              onBlur={this.onBlur.bind(this)}
              onFocus={this.onFocus.bind(this)}
              label="What's your website URL?"
              labelStyle={this.isFieldInvalid('url') ? style.invalid : style.formLabel}
              required={true}
            />

            <div className={style.grid}>{this.renderHourDropdowns()}</div>

            <TextArea
              id={idPrefix + 'furtherDescription'}
              name="furtherDescription"
              onChange={this.handleFurtherDescription.bind(this)}
              value={this.state.profile.hours.furtherDescription}
              label="Please indicate any special/ or occasional hours outside of regular operation. i.e. (open every other Saturday)"
              labelStyle={style.formLabel + ' ' + style.paddingTop20}
              placeholder="Open every first Saturday of month"
            />

            {this.renderAreaSelect()}

            {this.renderServiceCheckboxes()}

            {this.renderExpertiseCheckboxes()}

            {this.renderBusinessStageRadios()}

            {this.renderLanguageCheckboxes()}
            <div className={style.submitButton} onClick={this.handleSubmit.bind(this)}>
              <Button id={idPrefix + 'form-submit-button'} primary>
                Submit
              </Button>
            </div>
            {_.some(isFieldValid, field => {
              return field === false
            }) && (
              <div className={style.submitButton} role="alert">
                <FormErrorMessage errorText="Please answer all required questions before submitting." />
              </div>
            )}
            {this.props.hadSubmitErrors && (
              <div className={style.submitButton} role="alert">
                <FormErrorMessage errorText="There was an error submitting the form." />
              </div>
            )}
            <div className={style.maidenNameContainer} aria-hidden="true">
              <input id={idPrefix + 'maiden-name'} onChange={this.handleMaidenNameChange.bind(this)} />
            </div>
          </form>
          {this.props.isSubmitComplete && this.renderSubmissionComplete()}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      submitProfile: submitProfile
    },
    dispatch
  )
}

function mapStateToProps(state) {
  return {
    isSubmitComplete: state.resourceCenterProfile.isSubmitComplete,
    hadSubmitErrors: state.resourceCenterProfile.hadSubmitErrors
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourceCenterProfilePage)
export { ResourceCenterProfilePage }
