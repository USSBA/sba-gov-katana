import React from "react";
import {pick} from "lodash";
import _ from "lodash";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import querystring from "querystring";

import * as ContentActions from "../../../actions/content.js";
import styles from "./document-lookup.scss";

import {
	ApplyButton,
	Multiselect,
	TextInput,
	SearchIcon,
	SmallInverseSecondaryButton
} from "../../atoms";
import {Paginator} from "../../molecules/";
import DocumentCardCollection from "../../organisms/document-card-collection/document-card-collection.jsx";


const config = {
	pageSize: 5,
	originalState: {}
};

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

const findTaxonomy = (arr, name) => {
				
	let needle = {};

	for (let index = 0; index < arr.length; index++) {
		if (arr[index].name === name) {
			needle = arr[index];

			break;
		}
	}

	return needle;

};

export class DocumentLookup extends React.PureComponent {

	constructor(ownProps) {

		super();

        let queryParams = {};
        const {search} = window.location;
        if(search && search !== "") {
            queryParams = querystring.decode(search.replace("?",""));
        }

		this.state = {
			documents: undefined,
			documentsCount: 0,
			searchTerm: queryParams.search || "",
			documentType: queryParams.type || "All",
			program: queryParams.program || "All",
			documentActivity: queryParams.activity || "All",
			sortBy: "Last Updated",
			taxonomies: [],
			pageNumber: 1,
			isFetching: false
		};

		config.originalState = Object.assign({}, {
			documents:this.state.documents,
			documentsCount: this.state.documentsCount,
			searchTerm: "",
			documentType: "",
			program: "",
			documentActivity: "",
			sortBy: this.state.sortBy,
			pageNumber: this.state.pageNumber,
			isFetching: this.state.isFetching
		});
	}

    hasQueryParams() {

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

    componentDidMount() {

        if(this.hasQueryParams()) {
            this.submit();
        }

        this.submit();
    }

	componentWillReceiveProps(nextProps, ownProps) {

		const updatedProps = {};

		// set the taxomonies object when
		// nextProps.items array is populated, AND state.taxonomies array is NOT populated

		if (nextProps.taxonomies && nextProps.taxonomies.length > 0 && this.state.taxonomies.length === 0) {

			const taxonomies = nextProps.taxonomies.slice();

			// add an "All" filter option to dynamic taxonomies
			for (let index = 0; index < taxonomies.length; index++) {
				taxonomies[index].terms.unshift("All");
			}

			const rearrangedTaxonomyOrder = [
				findTaxonomy(taxonomies, "documentType"),
				findTaxonomy(taxonomies, "program"),
				findTaxonomy(taxonomies, "documentActivity")
			];

			// add a "Sort By" taxonomy object to append a "Sort By" multiselect component
			rearrangedTaxonomyOrder.push({
				"name": "Sort By",
				"terms": ["Last Updated","Title","Number"]
			});

			updatedProps.taxonomies = rearrangedTaxonomyOrder;
		}

		if (nextProps.documents !== undefined) {
			updatedProps.documents = nextProps.documents.items;
			updatedProps.documentsCount = nextProps.documents.count;
			updatedProps.isFetching = false;
		}


		this.setState(updatedProps);

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

			const returnNull = () => {
				return null;
			};

			return (
				<div className={styles.multiSelect} key={index}>
					<Multiselect
						{...multiSelectProps}
						onBlur={returnNull}
						onFocus={returnNull}
						validationState=""
						errorText=""
						autoFocus={false}
						multi={false}
					/>
				</div>
			);
		});
	}

	handleChange(event, selectStateKey) {

		const obj = {};
		obj[selectStateKey] = event.value;

		this.setState(obj);

	}

	handleKeyUp(event) {

		const returnKeyCode = 13;

		if (event.keyCode === returnKeyCode) {

			this.setState({documents: undefined}, () => {
				this.submit();
			});

		}

	}

	handleClick() {

		this.setState({documents: undefined}, () => {
			this.submit();
		});

	}

	submit() {

		this.setState({isFetching: true}, () => {

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

			const start = ((this.state.pageNumber - 1) * config.pageSize);
			const end = start + config.pageSize;

			const data = {
				search,
				type: setAllToEmptyString(type),
				program: setAllToEmptyString(program),
				activity: setAllToEmptyString(activity),
				sortBy,
				start,
				end
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

		});
	}

	updateSearchTerm(event) {

		this.setState({
			"searchTerm": event.target.value
		});

	}

	renderDocuments() {

		let result = "Loading...";
		const {documents, pageNumber, isFetching} = this.state;

		if (!_.isEmpty(documents)) {

			result = <DocumentCardCollection cards={documents} />;

		} else if (documents !== undefined && !isFetching) {

			result = (
				<div className={styles.emptyDocuments}>
					<p className={styles.emptyDocumentsMessage}>Sorry, we couldn't find any documents matching that query.</p>
					<p><a onClick={this.reset.bind(this)}>Clear all search filters</a></p>
				</div>
			);

		}

		return (

			<div className={styles.documentCardCollection}>
				{result}
			</div>
		);

	}

	reset() {

		this.setState(config.originalState, () => {
			this.submit();
		});

	}

	renderPaginator() {

		const {
			documents,
			documentsCount,
			pageNumber
		} = this.state;

		let result = <div />;

		if (!_.isEmpty(documents)) {
			
			result = (

				<div className={styles.paginator}>
					<Paginator
						pageNumber={pageNumber}
						pageSize={config.pageSize}
						total={documentsCount}
						onBack={this.handleBack.bind(this)}
						onForward={this.handleForward.bind(this)}
					/>
				</div>

			);

		}

		return result;
	}

	handleBack() {

		this.setState({
			pageNumber: Math.max(1, this.state.pageNumber - 1)
		}, () => {
			this.submit();
		});
	}

	handleForward() {
		
		const {
			documentsCount,
			pageNumber
		} = this.state;

		this.setState({
			pageNumber: Math.min(Math.max(1,Math.ceil(documentsCount / config.pageSize)), pageNumber + 1)
		}, () => {
			this.submit();
		});
	}

	render() {

		const { taxonomies, documents} = this.state;

		return (
			
			<div>
				
				<div className={styles.banner}>
					
					<h2 className={styles.header}>{this.props.title}</h2>
					
					{taxonomies.length > 0 &&
					<div>
						<div className={styles.searchBox}>
							<TextInput
								placeholder="Search by title or number"
								id="document-lookup"
								errorText={"Please enter the correct thing."}
								label="Search"
								validationState={""}
								onKeyUp={(e) => this.handleKeyUp(e)}
								onChange={(e) => this.updateSearchTerm(e)}
							/>
							<div className={styles.searchIcon}>
								<SearchIcon aria-hidden="true" />
							</div>
						</div>
						{this.renderMultiSelects()}
						<ApplyButton submit={() => {
							this.handleClick();
						}} />
					</div>}
				
				</div>
				
				<div>
					{this.renderPaginator()}
					{this.renderDocuments()}
					{this.renderPaginator()}
				</div>

			</div>

		);
	}

}

DocumentLookup.defaultProps = {
	documents: undefined,
	searchTerm: "",
	documentType: "All",
	program: "All",
	documentActivity: "All",
	sortBy: "Last Updated",
	taxonomies: []
};

function mapReduxStateToProps(reduxState, ownProps) {

	const {taxonomies, documents} = reduxState.contentReducer;

	return {
		taxonomies,
		documents
	};

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(DocumentLookup);