import Checkbox from '../../atoms/checkbox/checkbox-lib';
import React from 'react'
import { basename } from 'path'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormErrorMessage, MultiSelectBox, TextInput } from 'atoms'
import {SelectRangeGroup } from 'molecules'

import style from './resource-center-profile-page.scss'

class ResourceCenterProfilePage extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  handleSubmit() {

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

      const hours = [
          {value: 'Closed',
          text: 'Closed'},
          {value: '8:00 am',
          text: '8:00 am'},
          {value: '8:30 am',
          text: '8:30 am'},
          {value: '9:00 am',
          text: '9:00 am'},
          {value: '9:30 am',
          text: '9:30 am'},
          {value: '10:00 am',
          text: '10:00 am'},
          {value: '10:30 am',
          text: '10:30 am'},
          {value: '11:00 am',
          text: '11:00 am'},
          {value: '11:30 am',
          text: '11:30 am'},
          {value: '12:00 pm',
          text: '12:00 pm'},
          {value: '12:30 pm',
          text: '12:30 pm'},
          {value: '1:00 pm',
          text: '1:00 pm'},
          {value: '1:30 pm',
          text: '1:30 pm'},
          {value: '2:00 pm',
          text: '2:00 pm'},
          {value: '2:30 pm',
          text: '2:30 pm'},
          {value: '3:00 pm',
          text: '3:00 pm'},
          {value: '3:30 pm',
          text: '3:30 pm'},
          {value: '4:00 pm',
          text: '4:00 pm'},
          {value: '4:30 pm',
          text: '4:30 pm'},
          {value: '5:00 pm',
          text: '5:00 pm'},
          {value: '5:30 pm',
          text: '5:30 pm'},
          {value: '6:00 pm',
          text: '6:00 pm'}
      ]

      const officeHoursProps = {
          id: 'office-hours',
          label: 'What are yournormal office hours?',
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
            <form id={id} onSubmit={this.handleSubmit} >
                <MultiSelectBox
                    id={id + '-type'} 
                    errorText={''}
                    label="Which resource partner do you represent?"
                    name="type"
                    value="type" //todo: determine prop name
                    
                />
                <MultiSelectBox
                    id={id + '-name'}
                    errorText={''}
                    label="Which office?"
                    name="name"
                    value="name" //todo: determine prop name
                />
                <label>Is this your office address and phone number?</label>
                <Radio
                    id={id + '-should-update-contact-info'}
                    //errorText={constants.messages.validation.invalidIndustryExperience}
                    label=""
                    name="shouldUpdateContactInfo"
                    onChange={this.handleChange.bind(this)}
                    //validationState={this.state.validStates.industryExperience}
                    //value={this.state.industryExperience}
                    options={updateContactInfoOptions}
                    //onBlur={this.handleIndustryExperienceBlur.bind(this)}
                    onFocus={this.handleFocus.bind(this)}
                />
                <TextInput
                    id={id + '-website-url'}
                    //errorText={constants.messages.validation.invalidName}
                    label="What's your website URL?"
                    name="websiteUrl"
                    onChange={this.handleChange.bind(this)}
                    value={this.state.contactFullName}
                    //validationState={this.state.validStates.contactFullName}
                    autoFocus
                    onBlur={this.handleBlur.bind(this)}
                    onFocus={this.handleFocus.bind(this)}
                />
                <SelectRangeGroup {...officeHoursProps}/>
                <label>What services does your office provide?</label>
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
                <Radio options={businessStageOptions} />

                <label>In which languages other than English can your office provide counseling</label>
                <Checkbox label="Spanish"/>
                <Checkbox label="Chinese"/>
                <Checkbox label="Tagalog"/>
                <Checkbox label="Vietnamese"/>
                <Checkbox label="French"/>
                <Checkbox label="German"/>
                <Checkbox label="Korean"/>
                <Checkbox label="Arabic"/>
                <Checkbox label="Russian"/>
                <Checkbox label="Italian"/>
                <Checkbox label="Other"/>
                
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