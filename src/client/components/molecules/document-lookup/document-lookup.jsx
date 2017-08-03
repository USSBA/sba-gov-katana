import React from "react";
import {pick} from "lodash";
import _ from "lodash";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as ContentActions from "../../../actions/content.js";
import s from "./document-lookup.scss";
import SmallInverseSecondaryButton from "../../atoms/small-inverse-secondary-button/small-inverse-secondary-button.jsx";
import {Multiselect, TextInput, SearchIcon} from "../../atoms";
import DocumentCardCollection from "../../organisms/document-card-collection/document-card-collection.jsx"

const createSlug = (str) => {
  return str.toLowerCase().replace(/[^\w\s-]/g, ""). // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
  replace(/[\s_-]+/g, "-"). // swap any length of whitespace, underscore, hyphen characters with a single -
  replace(/^-+|-+$/g, "");
};

const createCamelCase = (str) => {
  const sliceIndex = 1;
  const _str = str[0].toLowerCase() + str.slice(sliceIndex);
  return _str.replace(" ", "");
};

class DocumentLookup extends React.Component {

		constructor(ownProps) {
			console.log("ownProps", ownProps)
			super();
			this.state = {
				documents: ownProps.items,
				documentType: "all",
				program: "all",
				documentActivity: "all",
				sortBy: "last-updated",
				taxonomies: []
			};
		}

		componentWillMount() {

			// fetch taxonomies from server
			// prop:string, type:string, queryArgs:object

			this.props.actions.fetchContentIfNeeded(
				"taxonomies", 
				"taxonomyVocabulary", {
				"names": "documentType,program,documentActivity"
			});

		}

		componentWillReceiveProps(nextProps, ownProps) {

			// set the taxomonies object when
			// nextProps.items array is populated, AND state.taxonomies array is NOT populated

			if (nextProps.items.length > 0 && this.state.taxonomies.length === 0) {

				const taxonomies = nextProps.items;

				// add an "All" filter option to dynamic taxonomies
				for (let index = 0; index < taxonomies.length; index++) {
					taxonomies[index].terms.unshift("All");
				}

				// add a "Sort By" taxonomy object to append a "Sort By" multiselect component
				taxonomies.push({
					"name": "Sort By",
					"terms": ["Last Updated", "Name","Number"]
				});
				
				this.setState({
					taxonomies: nextProps.items
				}, () => {
					this.sortAndFilterDocuments();
				});
			}

		}

		handleChange(event, selectStateKey) {

			const obj = {};
			obj[selectStateKey] = event.value;

			this.setState(obj, () => {
				this.sortAndFilterDocuments();
					if(this.props.afterChange) {
						this.props.afterChange(
							"document-lookup",
							"Filter Status : " + JSON.stringify(pick(this.state,
								[
									"documentType",
									"programName",
									"documentActivity",
									"sortBy"
								])
							),
						null
					);
				}
			});
		}

		sortAndFilterDocuments() {
			
			const documents = this.props.items;
			const sortedDocuments = this.sortDocuments(documents);
			const filteredDocuments = this.filterDocuments(sortedDocuments);
			
			this.setState({
				documents: filteredDocuments
			});

		}

		sortDocuments(contacts) {
			
			let direction; // asc|desc
			let titleOrActiveSince; // title|activeSince

			if (this.state.sortBy === "Investor Name") {
	
				direction = "asc";
				titleOrActiveSince = "title";

			} else if (this.state.sortBy === "Active Since") {

				direction = "desc";
				titleOrActiveSince = "activeSince";

			}

			const orders = [direction];
			const iteratees = [titleOrActiveSince];

			return _.orderBy(contacts, iteratees, orders);

		}

		//TODO remove outer array brackets [contact.industry] when industry field becomes an actual array. keep intersection though.
		//this filtering was intended to match multiple user selections to multiple industry types.
		filterDocuments(contacts) {
			let filteredContacts = contacts
			if (this.state.industryValue !== "All") {
				filteredContacts = _.filter(contacts, (contact) => {
					return !_.isEmpty(_.intersection(_.castArray(contact.industry), _.castArray(this.state.industryValue)))
				});
			}
			if (this.state.investingStatusValue !== "All") {
				filteredContacts = _.filter(filteredContacts, (contact) => {
					return contact.investingStatus === this.state.investingStatusValue
				});
			}
			return filteredContacts;
		}

	renderMultiSelects() {

		const _multiselects = this.state.taxonomies.map((taxonomy) => {
		
			const {name} = taxonomy;
			const id = `${createSlug(name)}-select`;
			const stateName = createCamelCase(name);
			const options = taxonomy.terms.map((entry) => {

				return {
					"label": entry,
					"value": createSlug(entry, "-")
				};

			});

			const _ms = {
				"id": id,
				onChange: (event) => {
					this.handleChange(event, stateName);
				},
				name: id,
				"label": _.startCase(name),
				value: this.state[stateName],
				"options": options
			};

			return _ms;
		});

		return _multiselects.map((multiSelectProps, index) => {
			return (
				<div className={s.multiSelect} key={index}>
					<Multiselect
						{...multiSelectProps}
						onBlur={() => {return null}}
						onFocus={() => {return null}}
						validationState=""
						errorText=""
						autoFocus={false}
						multi={false}
					>
					</Multiselect>
				</div>
			)
		})
	}

	renderDocuments() {
		return <DocumentCardCollection documents={this.state.documents}/>;
	}

	handleKeyUp(event) {

		const returnKeyCode = 13
		
		if (event.keyCode === returnKeyCode) {
			console.log('A', 'validate', event.target.value)
		}

	}

	applyFilters() {

		const { documentType, programName, documentActivity, sortBy } = this.state

		const filters = {
			documentType,
			programName,
			documentActivity,
			sortBy
		};

		console.log('B', 'apply filters', filters)

	}

	render() {

		const { taxonomies } = this.state;

		return (
			<div>
				<div className={s.banner}>
					<h2 className={s.header}>{this.props.title}</h2>
					{taxonomies.length > 0 &&
					<div>
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
					</div>}
				</div>
				{this.state.documents && this.renderDocuments()}
			</div>
		);
	}
	
}

function mapReduxStateToProps(reduxState, ownProps) {
  return {
    items: reduxState.contentReducer["taxonomies"]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(DocumentLookup);
