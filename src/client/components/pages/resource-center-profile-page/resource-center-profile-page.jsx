import Checkbox from '../../atoms/checkbox/checkbox-lib';
import React from 'react'
import { basename } from 'path'
import { connect } from 'react-redux'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { FormErrorMessage, MultiSelectBox, TextInput, Radio, CheckBox } from 'atoms'
import {SelectRangeGroup } from 'molecules'

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

    handleSubmit(){
      console.log('submit')
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
              return <CheckBox id={language} label={language} name={language} />
          });
    }


  render() {
      const id = 'resource-center-profile-form';
      const updateContactInfoOptions = [
        {
          value: true, //todo: check needed value
          label: 'Yes'
        },
        {
          value: false, //todo: check needed value
          label: 'No, it needs to be updated'
        }
      ];

      const businessStageOptions = [
        {
            value: true, //todo: check value
            label: 'New and early stage businesses'
        },
        {
            value: false, //todo: check value
            label: 'Established businesses'
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
                {/* <SelectRangeGroup {...officeHoursProps}/> 
                <label>What services does your office provide?</label>*/}
                <Checkbox label="Walk-ins"/>
                <Checkbox label="Appointments"/>
                <Checkbox label="In-person"/>
                <Checkbox label="By phone"/>
                <Checkbox label="By video chat or online"/>
                <Checkbox label="Trainings or workshops"/>
                <Checkbox label="Certifications"/>
                <Checkbox label="Night or weekend availability"/>

                <label>In which three topic areas does your office have the most expertise?</label>
                <Checkbox label="Creating a plan"/>
                <Checkbox label="Getting a loan"/>
                <Checkbox label="Business finances"/>
                <Checkbox label="Marketing and sales"/>
                <Checkbox label="Government contracting"/>
                <Checkbox label="Legal issues"/>
                <Checkbox label="International trade"/>
                <Checkbox label="Networking"/>
            
                <label>Which business stage does your office best serve?</label>
                <Radio options={businessStageOptions} value=""/> 

                <label>In which languages other than English can your office provide counseling</label>
                {this.renderLanguageCheckboxes()}
                
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