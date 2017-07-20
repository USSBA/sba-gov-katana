import React from "react"
import s from "./sbic-lookup.scss";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ContentActions from "../../../actions/content.js"
import {filter} from "lodash"
import SmallInverseSecondaryButton from '../../atoms/small-inverse-secondary-button/small-inverse-secondary-button.jsx';
import MultiSelect from "../../atoms/multiselect/multiselect.jsx";
import json2csv from "json2csv"

class SbicLookup extends React.Component {
	constructor() {
		super();
		this.state = {
			contacts: null,
			contactsCsv: null,
			sortByValue: "Investor Name",
			industryValue: "Diversified",
			investingStatusValue: "All"
		}
	}

	componentWillMount() {
		this.props.actions.fetchContentIfNeeded("contacts", this.props.type);
	}

	componentWillReceiveProps(nextProps, ownProps){
    this.setState({contacts: nextProps.items}, () => {
    	this.sortAndFilterContacts()
    	this.convertContactsToCsv()
    });
  }

	handleChange(e, selectStateKey) {
		let stateCopy = this.state
		stateCopy[selectStateKey] = e.value
		this.setState({...stateCopy}, this.sortAndFilterContacts)
	}

	handleDownloadClick(e){
		e.preventDefault()
	}

	createDownloadHref() {
		console.log('data:text/plain;charset=utf-8,' + encodeURIComponent(this.state.contactsCsv))
		return 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.state.contactsCsv)
	}

	sortAndFilterContacts() {
		let sortedContacts = this.sortContacts()
		let filteredContacts = this.filterContacts(sortedContacts)
		this.setState({
			contacts: filteredContacts
		})
	}

	sortContacts() {
		let orders = []
		let iteratees = []
		if (this.state.sortByValue === "Investor Name") {
			orders.push("asc")
			iteratees.push("title")
		} else if (this.state.sortByValue === "Active Since") {
			orders.push("desc")
			iteratees.push("activeSince")
		}
		return _.orderBy(this.props.items, iteratees, orders)
	}

	//TODO remove outer array brackets [contact.industry] when industry field becomes an actual array. keep intersection though.
	filterContacts(contacts) {
		let filteredContacts = contacts
		if (this.state.industryValue !== "Diversified") {
			filteredContacts = _.filter(contacts, (contact) => {
				return !_.isEmpty(_.intersection([contact.industry], [this.state.industryValue]))
			})
		}
		if (this.state.investingStatusValue !== "All") {
			filteredContacts = _.filter(filteredContacts, (contact) => {
				return contact.investingStatus === this.state.investingStatusValue
			})
		}
		return filteredContacts
	}

	convertContactsToCsv(){
		let fields = ['activeSince', 'city', 'contactFirstName', 'contactLastName', 'email', 'industry', 'investingStatus', 'phoneNumber', 'state', 'streetAddress', 'title', 'zipCode']
		let csv = json2csv({data: this.state.contacts, fields: fields })
		this.setState({contactsCsv: csv})
	}

	renderMultiSelects() {
			let specificMultiSelectProps = [{
				id: "sort-by-select",
				onChange: (e) => {
					this.handleChange(e, "sortByValue")
				},
				label: "Sort by",
				name: "sort-by-lookup",
				value: this.state.sortByValue,
				options: [{
					label: "Investor Name",
					value: "Investor Name"
				}, {
					label: "Active Since",
					value: "Active Since"
				}]
			}, {
				id: "industry-select",
				onChange: (e) => {
					this.handleChange(e, "industryValue")
				},
				label: "Industries",
				name: "industry-lookup",
				value: this.state.industryValue,
				options: [{
					label: "All",
					value: "Diversified"
				}, {
					label: "Technology",
					value: "Technology"
				}, {
					label: "Healthcare",
					value: "Healthcare"
				}, {
					label: "Manufacturing",
					value: "Manufacturing"
				}, {
					label: "Consumer",
					value: "Consumer"
				}]
			}, {
				id: "investing-status-select",
				onChange: (e) => {
					this.handleChange(e, "investingStatusValue")
				},
				label: "Investing status",
				name: "investing-status-select",
				value: this.state.investingStatusValue,
				options: [{
					label: "All",
					value: "All"
				}, {
					label: "Likely still investing",
					value: "investing"
				}, {
					label: "Not likely investing",
					value: "notinvesting"
				}]
			}]

		return specificMultiSelectProps.map((multiSelectProps, index) => {
			return (
				<div className={s.multiSelect} key={index}>
					<MultiSelect 
						{...multiSelectProps} 
						onBlur={(e) => {this.handleBlur(e)}}
						onFocus={(e) => {this.handleFocus(e)}}
						validationState=""
						errorText="" 
						autoFocus={false}
						multi={false}
					>
					</MultiSelect>
				</div>
			)
		})
	}

	renderContacts() {
		console.log(this.state.contacts)
		return this.state.contacts.map((contact, index) => {
			return (
				<tr key={index}> 
					<td className={s.nameAndAddressCol}>
						<div className={s.mobileHeader}>Investor name & address</div>
						<NameAndAddress title={contact.title} streetAddress={contact.streetAddress} city={contact.city} state={contact.state} zipCode={contact.zipCode}/>
					</td>
					<td className={s.industryCol}>
						<div className={s.mobileHeader}>Industry</div>
						{contact.industry}
					</td>
					<td className={s.activeSinceCol}>
						<div className={s.mobileHeader}>Active since</div>
						{contact.activeSince}
					</td>
					<td className={s.investingStatusCol}>
						<div className={s.mobileHeader}>Investing status</div>
						{contact.investingStatus === "investing" ? "Likely still investing" : "Not likely still investing"}
					</td>
					<td className={s.contactInfoCol}>
						<div className={s.mobileHeader}>Contact info</div>
						<ContactInfo name={contact.contactFirstName + " " + contact.contactLastName} phoneNumber={contact.phoneNumber}/>
					</td>
				</tr>
			)
		})
	}

	render() {
		return ( 
			<div>
				<div className={s.banner}>
					<h2 className={s.header}>{this.props.title}</h2>
					{this.renderMultiSelects()}
					<a href={this.createDownloadHref()} download="sbic-contacts.csv"><SmallInverseSecondaryButton url="#" extraClassName={s.downloadBtn} text="download list (.XLS)" /></a>
				</div>
				<table className={s.table}>
					<thead>
						<tr>
							<th className={s.nameAndAddressHead}>Investor name & address</th>
							<th className={s.industryHead}>Industry</th>
							<th className={s.activeSinceHead}>Active since</th>
							<th className={s.investingStatusHead}>Investing status</th>
							<th className={s.contactInfoHead}>Contact info</th>
						</tr>
					</thead>
						{
							this.state.contacts ? <tbody>{this.renderContacts()}</tbody> : <tbody>loading</tbody>
						}
				</table>
			</div>
		);
	}
}

const NameAndAddress = (props) => {
	return (
	<div className={s.investorNameAndTitle}>
		<div className={s.investorTitle}>{props.title}</div>
		<i className={s.mapIcon + " fa fa-map-marker"} aria-hidden="true"></i>
		<div className={s.addressContainer}>
			<div className={s.streetAddress}>{props.streetAddress}</div>
			<div className={s.cityAddress}>{props.city}, {props.state} {props.zipCode}</div>
		</div>
	</div>
	)
}

const ContactInfo = (props) => {
	return (
		<div className={s.contactInfo}>
			<div className={s.investorName}>{props.name}</div>
			<div className={s.phoneContainer}>
				<i className={s.phoneIcon + " fa fa-phone"} aria-hidden="true"></i>
				<div className={s.investorPhone}>{props.phoneNumber}</div>
			</div>	
		</div>
	)
}

function mapReduxStateToProps(reduxState, ownProps) {
	return {
		items: reduxState.contentReducer[ownProps.type]
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ContentActions, dispatch)
	}
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(SbicLookup);
