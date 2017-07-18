import React from "react"
import s from "./sbic-lookup.scss";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ContentActions from "../../../actions/content.js"
import {filter} from "lodash"

import MultiSelect from "../../atoms/multiselect/multiselect.jsx";

class SbicLookup extends React.Component {
	constructor() {
		super();
		this.state = {
			contacts: null,
			sortByValue: "Investor Name",
			industryValue: "Diversified",
			investingStatusValue: "All"
		}
	}

	componentWillMount() {
		this.props.actions.fetchContentIfNeeded("contacts", this.props.type);
	}

	componentWillReceiveProps(nextProps, ownProps){
    this.setState({contacts: nextProps.items}, this.sortAndFilterContacts);
  }

	handleChange(e, selectStateKey) {
		let stateCopy = this.state
		stateCopy[selectStateKey] = e.value
		this.setState({...stateCopy}, this.sortAndFilterContacts)
	}

	handleBlur(e) {
		// console.log("blur")
	}

	handleFocus(e) {
		// console.log("focus")
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

	//TODO remove outer array brackets when industry field becomes an actual array. keep intersection though.
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
		return this.state.contacts.map((contact, index) => {
			return (
				<tr key={index}> 
					<td><NameAndAddress title={contact.title} streetAddress={contact.streetAddress}/></td>
					<td>{contact.industry}</td>
					<td>{contact.activeSince}</td>
					<td>{contact.investingStatus === "investing" ? "Likely still investing" : "Not likely still investing"}</td>
					<td><ContactInfo name={contact.contactFirstName + " " + contact.contactLastName}/></td>
				</tr>
			)
		})
	}

	render() {
		return ( 
			<div>
				<div className={s.banner}>
					<h2 className={s.title}>{this.props.title}</h2>
					{this.renderMultiSelects()}
				</div>
				<table>
					<thead className={s.thead}>
						<tr>
							<th>Investor name & address</th>
							<th>Industry</th>
							<th>Active since</th>
							<th>Investing status</th>
							<th>Contact info</th>
						</tr>
					</thead>
						{
							this.state.contacts ? <tbody className={s.tbody}>{this.renderContacts()}</tbody> : <tbody>loading</tbody>
						}
				</table>
			</div>
		);
	}
}

const NameAndAddress = (props) => {
	return (
	<div>
		{props.title}
	</div>
	)
}

const ContactInfo = (props) => {
	return (
		<div>
			{props.name}
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
