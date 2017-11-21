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
        }

    }
  }

    static handleSubmit(){
      console.log('submit')
    }
    static handleClick(e){console.log(e)}

    static renderExpertiseCheckboxes() {
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
          /> 
        });
        return expertiseOptions;
    }
    static renderServiceCheckboxes() {
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
              />
            });
        return serviceOptions;
    }
    
    static renderLanguageCheckboxes() {
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
              />
        });

        return languageOptions;
    }


  render() {
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

      const officeHoursProps = {
          id: 'office-hours',
          label: 'What are your normal office hours?',
          items: [
            {
                label: 'Monday',
                start: {
                    name: '', //todo; check name
                    options: hours
                },
                end: {
                    name: '',
                    options: hours
                }
            },
            {
                label: 'Tuesday',
                start: {
                    name: '', //todo; check name
                    options: hours
                },
                end: {
                    name: '',
                    options: hours
                }
            },
            {
                label: 'Wednesday',
                start: {
                    name: '', //todo; check name
                    options: hours
                },
                end: {
                    name: '',
                    options: hours
                }
            }
        ]
      };

      
  
      return (
        <div>
            <h2>Resource Center Profile</h2>
            <p>Answer the following questions about your office's expertise to be better matched with your ideal clients</p>
            <form id={id} >
            <MultiSelect id="test" options={hours} multi={false}/>
                <label>Is this your office address and phone number?</label>
                <Radio
                    id={id + '-should-update-contact-info'}
                    //errorText={constants.messages.validation.invalidIndustryExperience}
                    label=""
                    name="shouldUpdateContactInfo"
                    //onChange={this.handleChange.bind(this)}
                    //validationState={this.state.validStates.industryExperience}
                    value="yes"
                    options={updateContactInfoOptions}
                    //onBlur={this.handleIndustryExperienceBlur.bind(this)}
                    //onFocus={this.handleFocus.bind(this)}
                />
                <TextInput
                    id={id + '-website-url'}
                    //errorText={constants.messages.validation.invalidName}
                    label="What's your website URL?"
                    name="websiteUrl"
                    //onChange={this.handleChange.bind(this)}
                    value=""
                    //validationState={this.state.validStates.contactFullName}
                    autoFocus
                    //onBlur={this.handleBlur.bind(this)}
                    //onFocus={this.handleFocus.bind(this)}
                />
                {/* <SelectRangeGroup {...officeHoursProps}/> */}
                <label>What services does your office provide?</label>
                {ResourceCenterProfilePage.renderServiceCheckboxes()}

                <label>In which three topic areas does your office have the most expertise?</label>
                {ResourceCenterProfilePage.renderExpertiseCheckboxes()}

                <label>Which business stage does your office best serve?</label>
                <Radio options={businessStageOptions} value=""/> 

                <label>In which languages other than English can your office provide counseling</label>
                {ResourceCenterProfilePage.renderLanguageCheckboxes()}
                
            </form>
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