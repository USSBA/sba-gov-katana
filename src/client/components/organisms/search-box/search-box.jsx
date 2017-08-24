import React from "react";
import _ from "lodash";
import styles from "./search-box.scss";
import SearchBar from "./search-box.scss";
import {
	Multiselect,
	TextInput,
	SearchIcon,
	LargeInversePrimaryButton
} from "../../atoms";

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

class SearchBox extends React.Component {

	constructor() {
		super();

		this.state = {
			searchTerm: "",
			"selectedDocumentActivity": "All"
		};
	}

	renderMultiSelect() {

		const documentActivity = this.props.documentActivity.slice();
		
		const name = "documentActivity";
		const id = `${createSlug(name)}-select`;
		const stateName = createCamelCase(name);

		// add an "All" filter option to list
		documentActivity.unshift("All");

		const options = documentActivity.map((entry) => {

			// customize the "All" entry label
			const result = {
				"label": entry === "All" ? this.props.multiSelectDefaultLabel : entry,
				"value": entry
			};

			return result;

		});

		const multiSelectProps = {
			"id": id,
			onChange: (event) => {
				this.handleChange(event);
			},
			name: id,
			value: this.state.selectedDocumentActivity,
			options
		};

		const returnNull = () => {
			return null;
		};

		return (

			<div className={styles.multiSelect}>
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
	}

	handleChange(event) {

		this.setState({
			selectedDocumentActivity: event.value
		});

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

		// ? html encode each term on this page and then decode on target page ?

		let queryString = `search=${this.state.searchTerm}`;
		queryString += `&type=${this.props.documentType}`;
		queryString += `&program=${this.props.documentProgram}`;
		queryString += `&activity=${this.state.selectedDocumentActivity}`;

		document.location = `/document/?${queryString}`;

	}

	render() {

		return (

			<div className={styles.container}>
				<div className={styles.greyParagraph}>
					<h2>{this.props.sectionHeaderText}</h2>
					<p>Quickly find the {this.props.documentType}s you regularly use as a {this.props.documentProgram} lender. </p>
					<div className={styles.searchBox}>
						<TextInput
							placeholder="Search by title or number"
							id="document-lookup"
							errorText={"Please enter the correct thing."}
							validationState={""}
							onKeyUp={(e) => this.handleKeyUp(e)}
							onChange={(e) => this.updateSearchTerm(e)}
						/>
						<div className={styles.searchIcon}>
							<SearchIcon aria-hidden="true" />
						</div>
					</div>
					{this.renderMultiSelect()}
					<div className={styles.clear} />
					<LargeInversePrimaryButton
						onClick={() => {
							this.submit();
						}}
						className={styles.submitButton}
						text="Search"
					/>
				</div>
			</div>

		);

	}
}

SearchBox.defaultProps = {
	"multiSelectDefaultLabel": "All document activity",
	"documentActivity": ["test 1", "test two"],
	"documentProgram": ["8(a)"],
	"documentType": ["SBA form"],
	"sectionHeaderText": "Forms"
};

export default SearchBox;

