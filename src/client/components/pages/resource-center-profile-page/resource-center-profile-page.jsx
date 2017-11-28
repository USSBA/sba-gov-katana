import FormErrorMessage from '../../atoms/form-error-message/form-error-message'
import React from 'react'
import { CheckBox, Radio, Checkbox, MultiSelect, TextInput, LargePrimaryButton } from 'atoms'
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
      loading: false,
      shouldUpdateContact: '',
      partners: getPartners(),
      offices: null,
      selectedOfficeOption: null,
      selectedOffice: null,
      isFieldValid: {
        type: null,
        name: null,
        address: null,
        phone: null,
        businessStage: null,
        serviceArea: null,
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
    this.setState({
      offices: _.reject(getPartnerOffices(partner), office => {
        return _.isEmpty(office)
      })
    })
    console.log(partner)
    console.log(getPartnerOffices(partner))
  }

  handleRadio(value, propName) {
    console.log(value)
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
    console.log(propName)
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
    console.log(event)
    const newProfile = _.cloneDeep(this.state.profile)
    newProfile[event.target.name] = event.target.value
    this.setState({ profile: newProfile })
  }

  formatAddress(address) {
    console.log(address)
    if (!address) {
      return 'Please select your office'
    }
    const addressPartList = [address.street1, address.street2, address.city, address.state, address.zip]
    console.log(addressPartList)
    const addressString = _.join(
      _.filter(addressPartList, addressPart => {
        console.log(addressPart)
        console.log(!_.isEmpty(addressPart))
        return !_.isEmpty(addressPart)
      }),
      ', '
    )
    console.log(addressString)
    return addressString
  }

  handleOfficeSelect(newSelection) {
    console.log(newSelection)
    const newOffice = newSelection.value
    const newProfile = _.cloneDeep(this.state.profile)
    newProfile.name = newOffice.name1
    newProfile.phone = newOffice.phone
    newProfile.address = this.formatAddress(newOffice)
    this.setState({
      profile: newProfile,
      selectedOffice: newOffice,
      selectedOfficeOption: newSelection
      // shouldUpdateContact: this.state.shouldUpdateContact || !newProfile.phone || !newProfile.address
    })
  }

  validateFields() {
    const requiredFields = [
      'type',
      'name',
      'address',
      'phone',
      'businessStage',
      'serviceArea',
      'url',
      'expertise',
      'services'
    ]
    const newValidationState = _.cloneDeep(this.state.isFieldValid)
    _.forEach(requiredFields, field => {
      newValidationState[field] = !_.isEmpty(this.state.profile[field])
    })
    this.setState({
      isFieldValid: newValidationState,
      shouldUpdateContact:
        this.props.shouldUpdateContact || !newValidationState.address || !newValidationState.phone
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    console.log('submit')
    console.log(this.state.profile)
    this.validateFields()
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
      <MultiSelect
        id="serviceArea"
        value={this.state.profile.serviceArea}
        options={areas}
        multi={false}
        onChange={e => this.handleSelect(e, 'serviceArea')}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    )
  }

  renderHourDropdowns() {
    const hours = _.map(
      [
        'Closed',
        '8:00 am',
        '8:30 am',
        '9:00 am',
        '9:30 am',
        '10:00 am',
        '10:30 am',
        '11:00 am',
        '11:30 am',
        '12:00 pm',
        '12:30 pm',
        '1:00 pm',
        '1:30 pm',
        '2:00 pm',
        '2:30 pm',
        '3:00 pm',
        '3:30 pm',
        '4:00 pm',
        '4:30 pm',
        '5:00 pm',
        '5:30 pm',
        '6:00 pm'
      ],
      hour => {
        return {
          value: hour,
          label: hour
        }
      }
    )
    const dayOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const hoursOptions = _.map(dayOfTheWeek, day => {
      const dayOpen = day.toLowerCase() + 'Open'
      const dayClose = day.toLowerCase() + 'Close'
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
        'Networking'
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
        //errorText={constants.messages.validation.invalidIndustryExperience}
        label=""
        name="shouldUpdateContactInfo"
        onChange={e => this.setState({ shouldUpdateContact: e === 'true' })}
        //validationState={this.state.validStates.industryExperience}
        value={this.state.shouldUpdateContact.toString()}
        options={updateContactInfoOptions}
        textStyle={style.radioText}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      />
    )
  }

  render() {
    const id = 'resource-center-profile-form'
    const selectedOffice = this.state.selectedOffice
    const isFieldValid = this.state.isFieldValid

    return (
      <div className={style.backgroundContainer}>
        <div className={style.container}>
          <form id={id} className={style.form}>
            <h2>Resource Center Profile</h2>
            <p>
              Answer the following questions about your office's expertise to be better matched with your
              ideal clients
            </p>
            <label className={isFieldValid.type === false ? style.invalid : ''}>
              Which resource partner do you represent?
            </label>
            {this.renderPartnerSelect()}
            {this.state.profile.type && (
              <label className={isFieldValid.name === false ? style.invalid : ''}>Which office?</label>
            )}
            {this.state.profile.type && this.renderOfficeSelect()}
            {selectedOffice && <label>Is this your office address and phone number?</label>}
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
                {this.state.shouldUpdateContact && (
                  <div>
                    <label className={isFieldValid.address === false ? style.invalid : style.formLabel}>
                      What's your address?
                    </label>
                    <TextInput
                      id={id + '-address'}
                      name="address"
                      value={this.state.profile.address}
                      onChange={this.handleChange.bind(this)}
                      autoFocus={false}
                      onBlur={this.onBlur.bind(this)}
                      onFocus={this.onFocus.bind(this)}
                    />

                    <label className={isFieldValid.phone === false ? style.invalid : style.formLabel}>
                      What's your phone number?
                    </label>
                    <TextInput
                      id={id + '-phone'}
                      name="phone"
                      value={this.state.profile.phone}
                      onChange={this.handleChange.bind(this)}
                      autoFocus={false}
                      onBlur={this.onBlur.bind(this)}
                      onFocus={this.onFocus.bind(this)}
                    />
                  </div>
                )}
              </div>
            )}
            <label className={isFieldValid.url === false ? style.invalid : ''}>
              What's your website URL?
            </label>
            <TextInput
              id={id + '-website-url'}
              //errorText={constants.messages.validation.invalidName}

              name="websiteUrl"
              onChange={this.handleChange.bind(this)}
              value={this.state.profile.websiteUrl}
              //validationState={this.state.validStates.contactFullName}
              autoFocus={false}
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
              console.log(field)
              return field === false
            }) && (
              <div className={style.submitButton}>
                <FormErrorMessage errorText="Please answer all required questions before submitting." />
              </div>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default ResourceCenterProfilePage
/***************
 Expected POST Body Sample:
 {
   "profile": {
     "type": "WBC",
     "name": "My WBC Center",
     "address": "8 Market Place, Baltimore, MD 21202",
     "phone": "123-456-7890",
     "businessStage": "Stage51",
     "serviceArea": "Area51",
     "url": "www.example.com",
     "hours": {
       "mondayOpen": "9:00 am",
       "mondayClose": "5:00 pm",
       "tuesdayOpen": "9:00 am",
       "tuesdayClose": "5:00 pm",
       "wednesdayOpen": "9:00 am",
       "wednesdayClose": "5:00 pm",
       "thursdayOpen": "9:00 am",
       "thursdayClose": "5:00 pm",
       "fridayOpen": "9:00 am",
       "fridayClose": "5:00 pm",
       "saturdayOpen": "9:00 am",
       "saturdayClose": "5:00 pm",
       "sundayOpen": "9:00 am",
       "sundayClose": "5:00 pm"
     },
     "expertise": [
       "Being Cool",
       "Being Rad"
     ],
     "services": [
       "Cool Consultancy",
       "Rad Consultancy"
     ],
     "languages": [
       "Skater",
       "Surfer"
     ]
   }
 }
 */
