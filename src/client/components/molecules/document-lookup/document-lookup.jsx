import React from "react";
import {pick} from "lodash";
import _ from "lodash";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import querystring from 'querystring';

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
		super();
        let queryParams = {};
        if(window.location.search && window.location.search !== ""){
            queryParams = querystring.decode(window.location.search.replace("?",""));
        }
		this.state = {
			documents: ownProps.items,
			searchTerm: queryParams.search || "",
			documentType: queryParams.type || "All",
			program: queryParams.program || "All",
			documentActivity: queryParams.activity || "All",
			sortBy: "Last Updated",
			taxonomies: []
		};
	}

    hasQueryParams(){
        return window.location.search && window.location.search !== "";
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

    componentDidMount(){
        if(this.hasQueryParams()){
            this.submit();
        }
    }

	componentWillReceiveProps(nextProps, ownProps) {

		const updatedProps = {};

		// set the taxomonies object when
		// nextProps.items array is populated, AND state.taxonomies array is NOT populated

		if (nextProps.taxonomies && nextProps.taxonomies.length > 0 && this.state.taxonomies.length === 0) {

			const taxonomies = nextProps.taxonomies;

			// add an "All" filter option to dynamic taxonomies
			for (let index = 0; index < taxonomies.length; index++) {
				taxonomies[index].terms.unshift("All");
			}

			// add a "Sort By" taxonomy object to append a "Sort By" multiselect component
			taxonomies.push({
				"name": "Sort By",
				"terms": ["Last Updated","Title","Number"]
			});

			updatedProps.taxonomies = nextProps.taxonomies;
		}

		if (nextProps.documents !== undefined) {
			updatedProps.documents = nextProps.documents;
		}


		this.setState(updatedProps);

	}

	handleChange(event, selectStateKey) {

		const obj = {};
		obj[selectStateKey] = event.value;

		this.setState(obj);
	}

	renderMultiSelects() {
		const _multiselects = this.state.taxonomies.map((taxonomy) => {

			const {name} = taxonomy;
			const id = `${createSlug(name)}-select`;
			const stateName = createCamelCase(name);
			const options = taxonomy.terms.map((entry) => {

				return {
					"label": entry,
					"value": entry
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
			);
		});
	}

	renderDocuments() {
		return <DocumentCardCollection documents={this.state.documents}/>;
	}

	handleKeyUp(event) {

		const returnKeyCode = 13;

		if (event.keyCode === returnKeyCode) {

			this.submit();

		}

	}

	updateSearchTerm(event) {

		this.setState({
			"searchTerm": event.target.value
		});

	}

	submit() {

		const {
			searchTerm:search,
			documentType:type,
			program,
			documentActivity:activity,
			sortBy
		} = this.state;

		const setAllToEmptyString = (str) => {
			return str === "All" ? "all" : str;
		};

		const data = {
			search,
			type: setAllToEmptyString(type),
			program: setAllToEmptyString(program),
			activity: setAllToEmptyString(activity),
			sortBy,
			start: 1,
			end: 10
		};

		// fetch documents from server
		// prop:string, type:string, queryArgs:object

		this.props.actions.fetchContentIfNeeded(
			"documents",
			"documents",
			data);

		this.props.afterChange(
				"document-lookup",
				"Filter Status : " + JSON.stringify(pick(this.state,
					[
						"documentType",
						"program",
						"documentActivity",
						"sortBy"
					])
				),
			null
		);
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
								placeholder="Search by title or number"
								id="document-lookup"
								errorText={"Please enter the correct thing."}
								label="Search"
								validationState={""}
								onKeyUp={(e) => this.handleKeyUp(e)}
								onChange={(e) => this.updateSearchTerm(e)}
							/>
							<div className={s.searchIcon}>
								<SearchIcon aria-hidden="true" />
							</div>
						</div>
						{this.renderMultiSelects()}
						<SmallInverseSecondaryButton
							onClick={() => this.submit()}
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
    taxonomies: reduxState.contentReducer["taxonomies"],
    documents: reduxState.contentReducer["documents"]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(DocumentLookup);
