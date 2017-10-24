import _,{ reduce } from "lodash";
import React, {PureComponent} from "react";
import axios from "axios";
import { 
	LargePrimaryButton,
	SearchIcon,
	SmallPrimaryButton,
	SmallInversePrimaryButton,
	TextInput,
	FormattedNumberInput,
	BasicLink
} from "atoms";
import { NaicsLookup } from "molecules";
import sizeStandardsGraphic from "../../../../../public/assets/images/tools/size-standards-tool/Size_standards_graphic.png";
import styles from "./size-standards-tool.scss";

class SizeStandardsTool extends PureComponent {

	constructor() {
		
		super();

		this.state = {
			"section": "START", // START | NAICS | REVENUE | EMPLOYEES | RESULTS
			"shouldShowNaicsInput": true,
			"naicsCodes": [],
			"naicsCodesList": [], // 
			"shouldShowRevenueSection": false,
			"revenueTotal": null,
			"shouldShowEmployeesSection": false,
			"employeeTotal": null
		};

		this.origState = Object.assign({}, this.state);
	
	}

	componentDidMount() {

		axios.get("/naics").then((response) => {

			const naicsCodes = response.data.map((object) => {

				// create code property that matches id property
				const result = object;
				result.code = result.id;

				return result;

			});

			this.setState({naicsCodes});

		});

	}

	gotoSection(section) {

		let data = {
			section
		};

		const go = (d) => {

			this.setState(d, () => {

				window.scrollTo(0, 0);

			});

		};

		switch (section) {

			case "START":

				data = Object.assign({}, this.origState);

				// carry over already cached naics codes
				data.naicsCodes = this.state.naicsCodes.slice();

				go(data);

				break;

			case "RESULTS":

				const naicsCodesList = this.state.naicsCodesList.slice();

				const {
					revenueTotal,
					employeeTotal
				} = this.state;

				// push every exception related to each naicsCode in list to list
				
				const promises = naicsCodesList.map((object, index) => {

					const params = {
						
						id: object.id,
						revenue: revenueTotal,
						employeeCount: employeeTotal

					};

					return (
						
						axios.get("/isSmallBusiness", {
							params
						}).then((response) => {

							// map small business result to it's
							// corresponding naicsCodeList member

							naicsCodesList[index].isSmallBusiness = response.data;

						})
					);

				});

				Promise.all(promises).then((response) => {

					data.naicsCodesList = naicsCodesList;

					go(data);

				});

				break;

			default:

				go(data);

				break;
		}

	}

	renderNaicsAutoSuggest() {

		// Format the list of naics from the API into a structure suitable for React
		// Autosuggest, i.e. into a list of sections (naics categories/industries) that
		// contain entries (naics codes and descriptions).
		function formatNaics (naics) {
			
			const industriesMap = {};
			for (let index = 0; index < naics.length; index++) {
				
				const {
					code,
					description,
					sectorDescription: industryDescription,
					sectorId: industryCode
				} = naics[index];

				if (!industriesMap.hasOwnProperty(industryCode)) {
					industriesMap[industryCode] = {
						description: industryDescription,
						entries: []
					};

				}

				industriesMap[industryCode].entries.push({
					code,
					description,
					industryCode,
					industryDescription
				});

			}

			return reduce(industriesMap, (acc, val, key) => {
				
				acc.push({
					description: val.description,
					entries: val.entries
				});
				
				return acc;
				
				},
			[]);

		}

		// filter out exceptions and then format naics objects
		const naics = formatNaics(this.state.naicsCodes.filter((object) => {

			let result;
			const validLength = 6;

			if (object.code.length === validLength) {
				result = object;
			}

			return result;

		}));

		const inputProps = {
			id: "naics-lookup",
			name: "naics"
			// onBlur,
			// onFocus
		};

		return (
			<div className={styles.naicsLookup}>
				<NaicsLookup
					naics={naics}
					inputProps={inputProps}
					inputLengthToGetSuggestions={3}
					maxVisibleSuggestions={5}
					onSelect={(selection) => {
						
						// const {
						//   code,
						//   description,
						//   industryCode,
						//   industryDescription
						// } = selection;

						const naicsCode = selection.code;
						this.addNaicsCode(naicsCode);
						this.showNaicsInput(false);

					}}
				/>
			</div>
		);

	}

	showNaicsInput(shouldShowNaicsInput) {

		const updatedState = {shouldShowNaicsInput};

		this.setState(updatedState);

	} 

	onInputChange(data) {

		const {section, value} = data;

		switch (section) {

			case "REVENUE":

				this.setState({ revenueTotal: value });

				break;

			case "EMPLOYEES":

				this.setState({ employeeTotal: value });

				break;

			default:
				break;

		}

	}

	addNaicsCode(code){

		const {naicsCodes} = this.state;
		const naicsCodesList = this.state.naicsCodesList.slice();

		let isNaicsCodeInList;

		naicsCodesList.find((object) => {

			if (object.code === code) {
				isNaicsCodeInList = true;
			}

			return false;

		});

		if (!isNaicsCodeInList) {

			const selectedCode = naicsCodes.find((object) => {

				let result;

				if (object.code === code) {
					result = object;
				}

				return result;

			});

			if (selectedCode) {
				naicsCodesList.push(selectedCode);
			}

			const updatedState = {
				naicsCodesList
			};

			if (selectedCode.revenueLimit !== null) {
				updatedState.shouldShowRevenueSection = true;
			}

			if (selectedCode.employeeCountLimit !== null) {
				updatedState.shouldShowEmployeesSection = true;
			}

			this.setState(updatedState);

		}

	}

	removeNaicsCode(code) {

		let shouldShowRevenueSection, shouldShowEmployeesSection;

		const filteredList = this.state.naicsCodesList.filter((object) => {

			let result;

			if (object.code !== code) {

				shouldShowRevenueSection = object.revenueLimit !== null;
				shouldShowEmployeesSection = object.employeeCountLimit !== null;
				result = object;
			}

			return result;

		});

		this.setState({
			naicsCodesList: filteredList,
			shouldShowRevenueSection,
			shouldShowEmployeesSection
		});
		
	}

	renderNaicsList(section) {

		const {naicsCodesList} = this.state;
		
		const listItems = naicsCodesList.map((object, index) => {

			const {code, description} = object;

			console.log("A", object);

			return (

				<li key={index}>

					<div>
						
						{section === "NAICS" && <div>

							<p><span>{code} </span></p>
							<p>
								{description}
								<a
								className={styles.remove}
								onClick={() => {
									this.removeNaicsCode(code);
								}}>
								<i className="fa fa-times" aria-hidden="true" /></a>
							</p>
						
						</div>}


						{section === "RESULTS" && <div>
							
							<div className={styles.results}>

								<div className={styles.left}>
									
									<p><span>{code} </span></p>
									<div>
										<p>{description}</p>
									</div>

								</div>
								
								<div className={styles.middle}>
								
									<p><span>Small Business Size Standards </span></p>

									{object.revenueLimit !== null ? (<div>

										<p>$750 thousand annual revenue</p>
										
									</div>) : (<div>
										
										<p>500 employees</p>

									</div>)}

								</div>

								<div className={styles.right}>

									{object.isSmallBusiness ? (<div>
										
										<div className={styles.yes}>
											<p><i className="fa fa-check-circle" aria-hidden="true" />YES</p>
										</div>

									</div>) : (<div>
										
										<div className={styles.no}>
											<p><i className="fa fa-times-circle" aria-hidden="true" />NO</p>
										</div>

									</div>)}

								</div>

							</div>

							{this.renderNaicsExceptionsList(code)}

						</div>}

					</div>

				</li>

			);

		});

		return (

			<ul className={styles.naicsCodesList}>
				{listItems}
			</ul>

		);

	}

	renderNaicsExceptionsList(code) {

		const {naicsCodes} = this.state;

		let index = 0;

		const exceptions = naicsCodes.map((object) => {

			const {parent} = object;

			let result;

			// exceptions are naics codes with parents
			if (parent === code) {

				index++;

				result = (

					<li key={index}>
						<div className={styles.results}>

							<div className={styles.left}>
								
								<p><span>Exception #{index} </span></p>
								<div>
									<p>{object.description}</p>
								</div>

							</div>
							
							<div className={styles.middle}>
							
								<p><span>Small Business Size Standards </span></p>

								{object.revenueLimit !== null ? (<div>

									<p>$750 thousand annual revenue</p>
									
								</div>) : (<div>
									
									<p>500 employees</p>

								</div>)}

							</div>

							<div className={styles.right}>

								<div className={styles.no}>
									<p><i className="fa fa-times-circle" aria-hidden="true" />NO</p>
								</div>

							</div>

						</div>
					</li>

				);

			}

			return result;

		});

		return <ul className={styles.exceptionsList}>{exceptions}</ul>;
	}

	renderAppBar(data) {

		const {buttonText, sectionTarget} = data;

		return (

			<div className={styles.appBar}>

				<SmallInversePrimaryButton
					text={buttonText}
					onClick={() => {
						this.gotoSection(sectionTarget);
					}}
				/>

			</div>

		);

	}

	
	render() {

		const {
			section,
			shouldShowNaicsInput,
			naicsCodes,
			naicsCodesList,
			employeeTotal,
			revenueTotal,
			shouldShowRevenueSection,
			shouldShowEmployeesSection,
			exceptionsList
		} = this.state;


		let revenueInputValidationState = "";

		if (revenueTotal !== null) {
			revenueInputValidationState = revenueTotal > 0 ? "success" : "error";
		}

		let employeesInputValidationState = "";
		if (employeeTotal !== null) {
			employeesInputValidationState = employeeTotal > 0 ? "success" : "error";
		}

		return (

			<div className={styles.sizeStandardsTool}>
				


				{section === "START" && <div className={styles.startSection}>
					
					<h2>Size Standards Tool</h2>

					<img src={sizeStandardsGraphic} />

					<p>Do you qualify as a small business?</p>

					<LargePrimaryButton
						className={styles.button}
						text="Start"
						onClick={() => {
							this.gotoSection("NAICS");
						}}
					/>

				</div>}




				{section === "NAICS" && <div>

					<div className={styles.screen}>
					
						<h2>What's your industry?</h2>

						{naicsCodesList.length > 0 && <div> 

							{this.renderNaicsList(section)}

						</div>}

						{shouldShowNaicsInput ? (<div>

							<div className={styles.naicsCodeInput}>

								{!_.isEmpty(naicsCodes) ? (<div>

									<p>Select your 6-digit NAICS code</p>
									
									{this.renderNaicsAutoSuggest()}

									<p>The North American Industry Classification System or NAICS classifies  businesses according to type of economic activity.</p>

								</div>) : (<div className={styles.loading}>

									<p>...loading suggestions...</p>

								</div>)}

							</div>

						</div>) : (<div>

							<p><a onClick={() => {
								
								this.showNaicsInput(true);

							}}><i className="fa fa-plus" aria-hidden="true" />Add another industry</a></p>
						
						</div>)}

						{naicsCodesList.length > 0 && <div>
							
							<LargePrimaryButton
								className={styles.button}
								text="Next"
								onClick={() => {

									let sectionTarget = "NO_SECTION_SET";

									if (shouldShowRevenueSection === true) {
										sectionTarget = "REVENUE";
									} else if (shouldShowEmployeesSection === true) {
										sectionTarget = "EMPLOYEES";
									}

									this.gotoSection(sectionTarget);
								}}
							/>

						</div>}

					</div>

					{this.renderAppBar({
						buttonText: "BACK",
						sectionTarget:"START"
					})}

				</div>}




				{section === "REVENUE" && <div>

					<div className={styles.screen}>

						<h2>How much revenue?</h2>

						<div className={styles.revenueInput}>
							
							<FormattedNumberInput
								min="0"
								format="$0,0[.]00"
								id="revenue"
								errorText={"Please enter a correct number."}
								label="Annual Revenue"
								validationState={revenueInputValidationState}
								onChange={() => {

									const data = {
										section,
										value: Number(document.getElementById("revenue").value)
									};

									this.onInputChange(data);

								}}
								showSuccessIcon={false}
								showErrorIcon={false}
							/>

						</div>

						<p>This caption will help a small business understand <br />what information we're looking for.</p>

						<LargePrimaryButton
							className={styles.button}
							text={shouldShowEmployeesSection ? "NEXT" : "SEE RESULTS"}
							disabled={!(revenueTotal > 0)}
							onClick={() => {

								this.gotoSection(shouldShowEmployeesSection ? "EMPLOYEES" : "RESULTS");

							}}
						/>

					</div>

					{this.renderAppBar({
						buttonText: "BACK",
						sectionTarget:"NAICS"
					})}

				</div>}




				{section === "EMPLOYEES" && <div>

					<div className={styles.screen}>

						<h2>How many employees?</h2>

						<div className={styles.employeesInput}>
							
							<FormattedNumberInput
								min="0"
								format="0,0"
								id="employees"
								errorText={"Please enter a correct number."}
								label="Number of employees"
								validationState={employeesInputValidationState}
								onChange={() => {

									const data = {
										section,
										value: Number(document.getElementById("employees").value)
									};

									this.onInputChange(data);

								}}
								showSuccessIcon={false}
								showErrorIcon={false}
							/>

						</div>

						<p>This should be the average number of full-time or part-time <br />employees over the last 12 months.</p>

						<LargePrimaryButton
							className={styles.button}
							text="SEE RESULTS"
							disabled={!(employeeTotal > 0)}
							onClick={() => {
								this.gotoSection("RESULTS");
							}}
						/>

					</div>

					{this.renderAppBar({
						buttonText: "BACK",
						sectionTarget: shouldShowRevenueSection ? "REVENUE" : "NAICS"
					})}

				</div>}




				{section === "RESULTS" && <div className={styles.resultsSection}>

					<div className={styles.screen}>

						<h2>Are you a small business?</h2>

						{this.renderNaicsList(section)}

						<p>You may be eligible to participate in <a href="/contracting" target="_blank"><strong>SBA contracting programs</strong></a>.</p>

						<div className={styles.cards}>

							<div className={styles.card}>
								<p>Learn more about <a href="/contracting/getting-started-contractor/make-sure-you-meet-sba-size-standards" target="_blank">SBA small business size standards</a>.</p>
								<p><strong>SBA Office of Size Standards</strong></p>
								<ul>
									<li><i className="fa fa-map-marker" aria-hidden="true" /><p>409 3rd Street, SW<br />Washington, DC 2041</p></li>
									<li><i className="fa fa-phone" aria-hidden="true" /><p>202-205-6618</p></li>
									<li><i className="fa fa-envelope" aria-hidden="true" /><p><a href="mailto:sizestandards@sba.gov">sizestandards@sba.gov</a></p></li>
								</ul>
							</div>

							<div className={styles.card}>
								<p>Find out <a href="/contracting" target="_blank">how you can sell to the Federal Government</a>.</p>
								<p><strong>SBA Office of Contracting</strong></p>
								<ul>
									<li><i className="fa fa-map-marker" aria-hidden="true" /><p>409 3rd Street, SW<br />Washington, DC 2041</p></li>
									<li><i className="fa fa-phone" aria-hidden="true" /><p>202-205-6621</p></li>
									<li><i className="fa fa-envelope" aria-hidden="true" /><p><a href="mailto:contracting@sba.gov">contracting@sba.gov</a></p></li>
								</ul>
							</div>

						</div>

					</div>

					{this.renderAppBar({
						buttonText: "START OVER",
						sectionTarget:"START"
					})}

				</div>}




			</div>

		);

	}

}

// mock data

SizeStandardsTool.defaultProps = {
	naicsCodes: [{
        "id": "111130",
        "description": "Dry Pea and Bean Farming",
        "sectorId": "11",
        "sectorDescription": "Agriculture, Forestry, Fishing and Hunting",
        "subsectorId": "111",
        "subsectorDescription": "Crop Production",
        "revenueLimit": null,
        "employeeCountLimit": 100,
        "footnote": null,
        "parent": null
    },{
        "id": "541715_a_Except",
        "description": "Aircraft, Aircraft Engine and Engine Parts11",
        "sectorId": "54",
        "sectorDescription": "Professional, Scientific and Technical Services",
        "subsectorId": "541",
        "subsectorDescription": "Professional, Scientific and Technical Services",
        "revenueLimit": null,
        "employeeCountLimit": 1500,
        "footnote": "NAICS Codes 541713, 541714 and 541715",
        "parent": "111110"
    }]
};

export default SizeStandardsTool;
