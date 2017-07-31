import React from "react"
import s from "./document-lookup.scss";
import SmallInverseSecondaryButton from '../../atoms/small-inverse-secondary-button/small-inverse-secondary-button.jsx';
import MultiSelect from "../../atoms/multiselect/multiselect.jsx";
import json2csv from "json2csv"
import TextInput from '../../atoms/text-input/text-input.jsx';
import SearchIcon from "../../atoms/icons/search.jsx"
import {pick} from "lodash"

class DocumentLookup extends React.Component {
		constructor(ownProps) {
			console.log("ownProps", ownProps)
			super();
			this.state = {
				contacts: ownProps.items,
				contactsCsv: null,
				documentType: "all",
				programName: "all",
				documentActivity: "all",
				sortByValue: "sort-by-last-updated"
			}
		}

		componentWillReceiveProps(nextProps, ownProps) {
			console.log("nextProps", nextProps)
			this.setState({
				contacts: nextProps.items
			}, () => {
				this.sortAndFilterContacts()
				this.convertContactsToCsv()
			});
		}

		handleChange(e, selectStateKey) {
			let stateCopy = this.state
			let newValue = e.value;
			stateCopy[selectStateKey] = newValue
			this.setState({...stateCopy
			}, () => {
		        this.sortAndFilterContacts();
		        if(this.props.afterChange){
		          this.props.afterChange("sbic-lookup",  "Filter Status : " + JSON.stringify(pick(this.state, ['sortByValue','industryValue','investingStatusValue'] )) , null);
		        }
		    })
		}

		sortAndFilterContacts() {
			let contacts = this.props.items
			let sortedContacts = this.sortContacts(contacts)
			let filteredContacts = this.filterContacts(sortedContacts)
			this.setState({
				contacts: filteredContacts
			})
		}

		sortContacts(contacts) {
			let orders = []
			let iteratees = []
			if (this.state.sortByValue === "Investor Name") {
				orders.push("asc")
				iteratees.push("title")
			} else if (this.state.sortByValue === "Active Since") {
				orders.push("desc")
				iteratees.push("activeSince")
			}
			return _.orderBy(contacts, iteratees, orders)
		}

		//TODO remove outer array brackets [contact.industry] when industry field becomes an actual array. keep intersection though.
		//this filtering was intended to match multiple user selections to multiple industry types.
		filterContacts(contacts) {
			let filteredContacts = contacts
			if (this.state.industryValue !== "All") {
				filteredContacts = _.filter(contacts, (contact) => {
					return !_.isEmpty(_.intersection(_.castArray(contact.industry), _.castArray(this.state.industryValue)))
				})
			}
			if (this.state.investingStatusValue !== "All") {
				filteredContacts = _.filter(filteredContacts, (contact) => {
					return contact.investingStatus === this.state.investingStatusValue
				})
			}
			return filteredContacts
		}

		convertContactsToCsv() {
			if(this.state.contacts && this.state.contacts.length > 0){
				let fields = Object.keys(this.state.contacts[0])
				let csv = json2csv({
					data: this.state.contacts,
					fields: fields
				})
				this.setState({
					contactsCsv: csv
				})
			}
		}

		createDownloadHref() {
			return 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.state.contactsCsv)
		}

	renderMultiSelects() {
			let specificMultiSelectProps = [{
				id: "document-type-select",
				onChange: (e) => {
					this.handleChange(e, "documentType")
				},
				label: "Document type",
				name: "document-type",
				value: this.state.documentType,
				options: [{
					label: "All",
					value: "all"
				}, {
					label: "OMB",
					value: "omb"
				}, {
					label: "SBA form",
					value: "sba-form"
				}, {
					label: "SOP",
					value: "sop"
				}, {
					label: "Public Law (PL)",
					value: "pl"
				}, {
					label: "Code of Federal Regulations (CFR)",
					value: "cfr"
				}, {
					label: "Policy Guidance (PG)",
					value: "policy-guidance"
				}, {
					label: "TechNote (PG)",
					value: "technote"
				}, {
					label: "Procedural notice (PG)",
					value: "procedural-notice"
				}, {
					label: "Information notice (PG)",
					value: "information-notice"
				}, {
					label: "Policy notice (PG)",
					value: "policy-notice"
				}, {
					label: "Support",
					value: "support"
				}]
			}, {
				id: "program-name-select",
				onChange: (e) => {
					this.handleChange(e, "programName")
				},
				label: "Program",
				name: "program-name",
				value: this.state.programName,
				options: [{
					label: "All",
					value: "all"
				}, {
					label: "Lending programs",
					value: "lending-programs"
				}, {
					label: "7a",
					value: "p-7a"
				}, {
					label: "504/CDC",
					value: "p-504-cdc"
				}, {
					label: "Microloans",
					value: "microloans"
				}, {
					label: "SBIC",
					value: "sbic"
				}, {
					label: "Surety Bonds",
					value: "surety-bonds"
				}, {
					label: "Disaster Assistance",
					value: "disaster-assistance"
				}]
			}, {
				id: "document-activity-select",
				onChange: (e) => {
					this.handleChange(e, "documentActivity")
				},
				label: "Document Activity",
				name: "document-activity-select",
				value: this.state.documentActivity,
				options: [{
					label: "All",
					value: "all"
				}, {
					label: "Lending",
					value: "lending"
				}, {
					label: "Authorization",
					value: "authorization"
				}, {
					label: "Servicing",
					value: "servicing"
				}, {
					label: "Closing",
					value: "closing"
				}, {
					label: "Liquidation",
					value: "liquidation"
				}, {
					label: "Litigation",
					value: "litigation"
				}, {
					label: "Guaranty purchase",
					value: "guaranty-purchase"
				}, {
					label: "Licensing and organizational",
					value: "licensing-organizational"
				}, {
					label: "Credit and risk",
					value: "credit-risk"
				}, {
					label: "Investment and transactions",
					value: "investment-transactions"
				}, {
					label: "Leverage commitments and draws",
					value: "leverage-commitments-draws"
				}, {
					label: "Periodic reporting",
					value: "periodic-reporting"
				}, {
					label: "General",
					value: "general"
				}]
			}, {
				id: "sort-by-select",
				onChange: (e) => {
					this.handleChange(e, "sortByValue")
				},
				label: "Sort by",
				name: "sort-by-lookup",
				value: this.state.sortByValue,
				options: [{
					label: "Last Updated",
					value: "sort-by-last-updated"
				}, {
					label: "Name",
					value: "sort-by-name"
				}, {
					label: "Number",
					value: "sort-by-number"
				}]
			}]

		return specificMultiSelectProps.map((multiSelectProps, index) => {
			return (
				<div className={s.multiSelect} key={index}>
					<MultiSelect
						{...multiSelectProps}
						onBlur={() => {return null}}
						onFocus={() => {return null}}
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
		return this.state.contacts.map((contact, index) => {
			return (
				<tr key={index}>
					<td className={s.nameAndAddressCol}>
						<div className={s.mobileHeader}>Investor name & address</div>
						<NameAndAddress title={contact.title} streetAddress={contact.streetAddress} city={contact.city} state={contact.state} zipCode={contact.zipCode}/>
					</td>
					<td className={s.industryCol}>
						<div className={s.mobileHeader}>Industry</div>
						{contact.industry === "ImpactDiversified" ? "Impact Diversified" : contact.industry}
					</td>
					<td className={s.activeSinceCol}>
						<div className={s.mobileHeader}>Active since</div>
						{contact.activeSince}
					</td>
					<td className={s.investingStatusCol}>
						<div className={s.mobileHeader}>Investing status</div>
						{contact.investingStatus === "investing" ? "Likely still investing" : "Not likely investing"}
					</td>
					<td className={s.contactInfoCol}>
						<div className={s.mobileHeader}>Contact info</div>
						<ContactInfo name={contact.contactFirstName + " " + contact.contactLastName} phoneNumber={contact.phoneNumber}/>
					</td>
				</tr>
			)
		})
	}

	handleKeyUp(e) {
		
		if (e.keyCode === 13) {
			console.log('A', 'validate', e.target.value)
		}

	}

	applyFilters() {

		const { documentType, programName, documentActivity, sortByValue } = this.state

		const filters = {
			documentType,
			programName,
			documentActivity,
			sortByValue
		}

		console.log('B', 'apply filters', filters)

	}

	render() {
		return (
			<div>
				<div className={s.banner}>
					<h2 className={s.header}>{this.props.title}</h2>
					<div className={s.searchBox}>
						<TextInput
							placeholder="Title or number"
							id="document-lookup"
							errorText={"Please enter the correct thing."}
							label="Search"
							validationState={""}
							onKeyUp={(e) => this.handleKeyUp(e)}
						/>
						<div className={s.searchIcon}>
							<SearchIcon aria-hidden="true" />
						</div>
					</div>
					{this.renderMultiSelects()}
					<SmallInverseSecondaryButton
						onClick={() => this.applyFilters()}
						extraClassName={s.applyFiltersBtn}
						text="Apply Filters"
					/>
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


export default DocumentLookup;