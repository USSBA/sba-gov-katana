import React from 'react'
import { CheckBox, Radio, Checkbox, MultiSelect, TextInput} from 'atoms'
import _ from 'lodash'
//import {SelectRangeGroup } from 'molecules'

import style from './resource-center-profile-page.scss'

class ResourceCenterProfilePage extends React.Component {
    constructor() {
        super()
        this.state = {
        loading: false,
        shouldUpdateContact: 'false',
        websiteUrl: '',
        type: '',
        office: 'adsfadfa',
        loanUsage: 'wearaer',
        validStates: {
            loanAmount: null,
            loanDescription: null,
            loanUsage: null
        },
        profile: {
            type: null,
            name: null,
            address: null,
            phone: null,
            businessStage: null,
            serviceArea: null,
            url: null,
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
            expertise: [
            ],
            services: [
            ],
            languages: [
            ]
          }

    }
  }

  onFocus() {}

  onBlur() {}

  handleCheckbox(event, propName) {
    const newProfile = _.cloneDeep(this.state.profile);
    const arrayToUpdate = newProfile[propName];
    const itemToUpdate = event.target.name
    if (event.target.checked) {
        arrayToUpdate.push(itemToUpdate);
    } else {
        _.remove(arrayToUpdate, item => { return item === itemToUpdate });
    }
    this.setState({profile:newProfile});
  }

  handleSelect(newSelection, propName) {
    const value = newSelection.value;
    const newProfile = _.cloneDeep(this.state.profile);
    console.log(propName)
    if (_.endsWith(propName, 'Open') || _.endsWith(propName, 'Close')){
        newProfile.hours[propName] = value;
    } else {
        newProfile[propName] = value;
    }
    this.setState({profile: newProfile});
  }

  handleChange(event, propName) {
      console.log(event);
    const newProfile = _.cloneDeep(this.state.profile);
    newProfile[event.target.name] = event.target.value;
    this.setState({profile:newProfile});
  }

    static handleSubmit(){
      console.log('submit')
    }
    static handleClick(e){console.log(e)}

    renderHourDropdowns() {
        const hours = _.map([
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
          ], hour => {
              return {value: hour,
                label: hour};
          });
        const dayOfTheWeek = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ]
        const hoursOptions = _.map(dayOfTheWeek,
            day => {
                const dayOpen = day.toLowerCase() + 'Open';
                const dayClose = day.toLowerCase() + 'Close';
                return (
                    <div className={style.hoursRow} key={day + "-container"}>
                        <div className={style.hoursLabel}><label>{day}</label></div>
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
                         to 
                         <div className={style.hoursSelect}>
                            <MultiSelect 
                                className={style.hoursSelect} 
                                id={dayClose} 
                                value={this.state.profile.hours[dayClose]} 
                                options={hours} 
                                multi={false} 
                                key={dayClose}
                                onChange={e=> this.handleSelect(e, dayClose)}
                                onBlur={this.onBlur}
                                onFocus={this.onFocus}
                            />
                        </div>
                    </div>
                );
            }
        )
        return <div>{hoursOptions}</div>
    }

    renderExpertiseCheckboxes() {
        const expertiseOptions = _.map([
            'Creating a plan',
            'Getting a loan',
            'Business finances',
            'Marketing and sales',
            'Government contracting',
            'Legal issues',
            'International trade',
            'Networking'
        ], expertise => {
            return <Checkbox
            id={expertise}
            name={expertise}
            label={expertise}
            key={expertise}
            onChange={this.handleChange.bind(this)}
          /> 
        });
        return expertiseOptions;
    }
    renderServiceCheckboxes() {
        const serviceOptions = _.map([
            'Walk-ins',
            'Appointments',
            'In-person',
            'By phone',
            'By video chat or online',
            'Trainings or workshops',
            'Certifications',
            'Night or weekend availability'],
            service => {
                return <Checkbox
                id={service}
                name={service}
                label={service}
                key={service}
                onChange={this.handleChange.bind(this)}
              />
            });
        return serviceOptions;
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
                return <Checkbox
                id={language}
                name={language}
                label={language}
                key={language}
                checked={this.state.profile.languages.includes(language)}
                handleChange={e => this.handleCheckbox(e, 'languages')}
              />
        });

        return languageOptions;
    }

    renderBusinessStageRadios() {
        const businessStageOptions = [
            {
                value: true, //todo: check value
                text: 'New and early stage businesses'
            },
            {
                value: false, //todo: check value
                text: 'Established businesses'
            }
          ];
          return <Radio 
            options={businessStageOptions} 
            value=""
            onChange={this.handleChange.bind(this)}
            /> 
    }

    renderShouldUpdateAddressRadios() {
        const id = 'resource-center-profile-form';
        
        const updateContactInfoOptions = [
            {
              value: true, //todo: check needed value
              text: 'Yes'
            },
            {
              value: false, //todo: check needed value
              text: 'No, it needs to be updated'
            }
            
        ];
        return <Radio
            id={id + '-should-update-contact-info'}
            //errorText={constants.messages.validation.invalidIndustryExperience}
            label=""
            name="shouldUpdateContactInfo"
            onChange={this.handleChange.bind(this)}
            //validationState={this.state.validStates.industryExperience}
            value="yes"
            options={updateContactInfoOptions}
            //onBlur={this.handleIndustryExperienceBlur.bind(this)}
            //onFocus={this.handleFocus.bind(this)}
        />
    }

  render() {
      const id = 'resource-center-profile-form';
    
      return (
        <div className={style.backgroundContainer}>
            <div className={style.container}>
                <h2>Resource Center Profile</h2>
                <p>Answer the following questions about your office's expertise to be better matched with your ideal clients</p>
                <form id={id} >
                    <label>Is this your office address and phone number?</label>
                    {this.renderShouldUpdateAddressRadios()}
                    <TextInput
                        id={id + '-website-url'}
                        //errorText={constants.messages.validation.invalidName}
                        label="What's your website URL?"
                        name="websiteUrl"
                        onChange={this.handleChange.bind(this)}
                        value={this.state.profile.websiteUrl}
                        //validationState={this.state.validStates.contactFullName}
                        autoFocus={false}
                        //onBlur={this.handleBlur.bind(this)}
                        //onFocus={this.handleFocus.bind(this)}
                    />
                    <label>What are your normal office hours? <span>(optional)</span></label>
                    {this.renderHourDropdowns()}

                    <label>What services does your office provide?</label>
                    {this.renderServiceCheckboxes()}

                    <label>In which three topic areas does your office have the most expertise?</label>
                    {this.renderExpertiseCheckboxes()}

                    <label>Which business stage does your office best serve?</label>
                    {this.renderBusinessStageRadios()}

                    <label>In which languages other than English can your office provide counseling</label>
                    {this.renderLanguageCheckboxes()}
                    
                </form>
            </div>
        </div>
    );
  }
}

export default ResourceCenterProfilePage;
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