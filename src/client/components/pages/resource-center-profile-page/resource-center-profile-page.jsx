import PageLink from '../../atoms/page-link/page-link'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submitProfile } from '../../../actions/resource-center-profile'
import React from 'react'
import {
  CheckBox,
  Radio,
  Checkbox,
  MultiSelect,
  TextInput,
  LargePrimaryButton,
  FormErrorMessage
} from 'atoms'
import _ from 'lodash'
import {
  getPartners,
  getPartnerOffices,
  getPartnersByZip
} from '../../../services/resource-center-lookup.js'
import style from './resource-center-profile-page.scss'

class ResourceCenterProfilePage extends React.Component {
  constructor() {
    super()
    this.state = {
      submitted: false,
      partners: getPartners(),
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
          sundayClose: null
        },
        expertise: [],
        services: [],
        languages: []
      }
    }
  }

  onFocus() {}

  onBlur() {}

  updateOffices(partner) {
    let offices = _.reject(getPartnerOffices(partner), office => {
      return _.isEmpty(office)
    })
    offices = _.orderBy(offices, [office => office.name2.toLowerCase()])
    console.log(offices)
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

  validateFields() {
    let allFieldsValid = true
    const requiredFields = [
      'type',
      'name',
      'businessStage',
      'serviceArea',
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
      <MultiSelect
        id="partner"
        value={this.state.profile.type}
        options={partners}
        multi={false}
        onChange={e => this.handleSelect(e, 'type')}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
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
      <MultiSelect
        id="office"
        value={this.state.selectedOfficeOption}
        options={offices}
        multi={false}
        onChange={this.handleOfficeSelect.bind(this)}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
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
        <MultiSelect
          id="serviceArea"
          value={this.state.profile.serviceArea}
          options={areas}
          multi={false}
          onChange={e => {
            this.handleSelect(e, 'serviceArea')
            this.setState({ otherServiceArea: '' })
          }}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {this.state.profile.serviceArea === 'Other' && (
          <TextInput
            id={'serviceArea'}
            name="serviceArea"
            placeholder="Custom other value"
            onChange={e => this.setState({ otherServiceArea: e.target.value })}
            value={this.state.otherServiceArea}
            autoFocus={false}
            onBlur={this.onBlur.bind(this)}
            onFocus={this.onFocus.bind(this)}
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
      if (hour === 0) hour = 12
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
              id={dayOpen}
              value={this.state.profile.hours[dayOpen]}
              options={hours}
              multi={false}
              key={dayOpen}
              placeholder={dayOpenPlaceholder}
              onChange={e => this.handleSelect(e, dayOpen)}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
          </div>
          <div className={style.hoursTo}>to</div>
          <div className={style.hoursSelect}>
            <MultiSelect
              className={style.hoursSelect}
              id={dayClose}
              value={this.state.profile.hours[dayClose]}
              options={hours}
              multi={false}
              key={dayClose}
              placeholder={dayClosePlaceholder}
              onChange={e => this.handleSelect(e, dayClose)}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            />
          </div>
        </div>
      )
    })
    return <div>{hoursOptions}</div>
  }

  renderExpertiseCheckboxes() {
    const expertiseOptions = _.map(
      [
        'Creating a plan',
        'Getting a loan',
        'Business finances',
        'Marketing and sales',
        'Government contracting',
        'Legal issues',
        'International trade',
        'Networking',
        'Business management'
      ],
      expertise => {
        return (
          <Checkbox
            id={expertise}
            name={expertise}
            label={expertise}
            key={expertise}
            handleChange={e => this.handleCheckbox(e, 'expertise')}
            checked={this.state.profile.expertise.includes(expertise)}
          />
        )
      }
    )
    return expertiseOptions
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
            id={service}
            name={service}
            label={service}
            key={service}
            handleChange={e => this.handleCheckbox(e, 'services')}
            checked={this.state.profile.services.includes(service)}
          />
        )
      }
    )
    return serviceOptions
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
            id={language}
            name={language}
            label={language}
            key={language}
            checked={this.state.profile.languages.includes(language)}
            handleChange={e => this.handleCheckbox(e, 'languages')}
          />
        )
      }
    )

    return languageOptions
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
      <Radio
        options={businessStageOptions}
        value={this.state.profile.businessStage}
        onChange={e => this.handleRadio(e, 'businessStage')}
        textStyle={style.radioText}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      />
    )
  }

  renderShouldUpdateAddressRadios() {
    const id = 'resource-center-profile-form'

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
      <Radio
        id={id + '-should-update-contact-info'}
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
      />
    )
  }

  renderSubmissionComplete() {
    return (
      <div>
        <h1>One Last Step</h1>
        <p>
          Thanks for completing this form. Your submission will help us better match you with your ideal
          clients.
        </p>
        <p>
          To update your office address and phone number, contact SBA's{' '}
          <a href="mailto:anna.kojzar@sba.gov">Office of Entrepreneurial Development</a>
        </p>
      </div>
    )
  }

  render() {
    const id = 'resource-center-profile-form'
    const selectedOffice = this.state.selectedOffice
    const isFieldValid = this.state.isFieldValid

    return (
      <div className={style.backgroundContainer}>
        <div className={style.container}>
          <form id={id} className={this.props.isSubmitComplete ? style.hidden : style.form}>
            <h1>Resource Center Profile</h1>
            <p>
              Answer the following questions about your office's expertise to be better matched with your
              ideal clients. Thank you for your time and insight!
            </p>
            <label className={isFieldValid.type === false ? style.invalid : ''}>
              Which resource partner do you represent?
            </label>
            {this.renderPartnerSelect()}
            {this.state.profile.type && (
              <label className={isFieldValid.name === false ? style.invalid : ''}>Which office?</label>
            )}
            {this.state.profile.type && this.renderOfficeSelect()}
            {selectedOffice && (
              <label className={isFieldValid.needsUpdating === false ? style.invalid : ''}>
                Is this your office address and phone number?
              </label>
            )}
            {selectedOffice && (
              <div>
                <div>{selectedOffice.street1}</div>
                <div>{selectedOffice.street2}</div>
                <div>
                  {selectedOffice.city ? selectedOffice.city + ', ' : ''}
                  {selectedOffice.state ? selectedOffice.state + ', ' : ''}
                  {selectedOffice.zip ? selectedOffice.zip : ''}
                </div>
                <div>{selectedOffice.phone}</div>
                {this.renderShouldUpdateAddressRadios()}
              </div>
            )}
            <label className={isFieldValid.url === false ? style.invalid : ''}>
              What's your website URL?
            </label>
            <TextInput
              id={id + '-url'}
              name="url"
              onChange={this.handleChange.bind(this)}
              value={this.state.profile.url}
              autoFocus={false}
              placeholder="http://"
              onBlur={this.onBlur.bind(this)}
              onFocus={this.onFocus.bind(this)}
            />
            <label>
              What are your normal office hours? <span className={style.optional}>(optional)</span>
            </label>
            <div className={style.grid}>{this.renderHourDropdowns()}</div>

            <label className={isFieldValid.serviceArea === false ? style.invalid : ''}>
              What area does your office serve?
            </label>
            {this.renderAreaSelect()}

            <label className={isFieldValid.services === false ? style.invalid : ''}>
              What services does your office provide?
            </label>
            {this.renderServiceCheckboxes()}

            <label className={isFieldValid.expertise === false ? style.invalid : ''}>
              In which three topic areas does your office have the most expertise?
            </label>
            {this.renderExpertiseCheckboxes()}

            <label className={isFieldValid.businessStage === false ? style.invalid : ''}>
              Which business stage does your office best serve?
            </label>
            {this.renderBusinessStageRadios()}

            <label>
              In which languages other than English can your office provide counseling{' '}
              <span className={style.optional}>(optional)</span>
            </label>
            {this.renderLanguageCheckboxes()}
            <div className={style.submitButton} onClick={this.handleSubmit.bind(this)}>
              <LargePrimaryButton id="feedback-submit-button" text="SUBMIT" url="" />
            </div>
            {_.some(isFieldValid, field => {
              return field === false
            }) && (
              <div className={style.submitButton}>
                <FormErrorMessage errorText="Please answer all required questions before submitting." />
              </div>
            )}
            {this.props.hadSubmitErrors && (
              <div className={style.submitButton}>
                <FormErrorMessage errorText="There was an error submitting the form." />
              </div>
            )}
            <div className={style.maidenNameContainer} aria-hidden="true">
              <input id="maiden-name" onChange={this.handleMaidenNameChange.bind(this)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ResourceCenterProfilePage)
