import _ from "lodash";
import React, {PureComponent} from "react";
import {
	LargePrimaryButton,
	SearchIcon,
	SmallPrimaryButton,
	SmallInversePrimaryButton,
	TextInput,
	BasicLink
} from "atoms";
import sizeStandardsGraphic from "../../../../../public/assets/images/tools/size-standards-tool/Size_standards_graphic.png";
import styles from "./size-standards-tool.scss";


class SizeStandardsTool extends PureComponent {

	constructor() {
		
		super();

		this.state = {
			"section": "START", // START | NAICS | REVENUE | EMPLOYEES | RESULTS
			"isNaicsInputEnabled": false,
			"shouldShowNaicsInput": true,
			"naicsCodesList": [], // 
			"shouldShowRevenueSection": false,
			"revenueTotal": null,
			"shouldShowEmployeesSection": false,
			"employeeTotal": null,
			"exceptionsList": []
		};

		this.origState = Object.assign({}, this.state);
	
	}

	gotoSection(section) {

		let data = {
			section
		};

		switch (section) {

			case "START":

				data = Object.assign({}, this.origState);

				break;

			case "NAICS":

				data.isNaicsInputEnabled = false;

				break;

			default:
				break;
		}

		this.setState(data, () => {

			window.scrollTo(0, 0);

		});

	}

	showNaicsInput(shouldShowNaicsInput) {

		const updatedState = {shouldShowNaicsInput};

		if (shouldShowNaicsInput === true) {
			updatedState.isNaicsInputEnabled = false;
		}

		this.setState(updatedState);

	} 

	onInputChange(data) {

		const {section, value} = data;

		switch (section) {

			case "NAICS":

				const validLength = 6;
				const isNaicsInputEnabled = (value.length === validLength);

				this.setState({isNaicsInputEnabled});

				break;

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

		const naicsCodesList = this.state.naicsCodesList.slice();
		const {naicsCodes} = this.props;

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

		if (selectedCode.employeeCount !== null) {
			updatedState.shouldShowEmployeesSection = true;
		}

		this.setState(updatedState);

	}

	removeNaicsCode(code) {

		let shouldShowRevenueSection, shouldShowEmployeesSection;

		const filteredList = this.state.naicsCodesList.filter((object) => {

			let result;

			if (object.code !== code) {

				shouldShowRevenueSection = object.revenueLimit !== null;
				shouldShowEmployeesSection = object.employeeCount !== null;
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
								<i className="fa fa-times" aria-hidden="true"></i></a>
							</p>
						
						</div>}


						{section === "RESULTS" && <div className={styles.results}>

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

								<div className={styles.no}>
									<p><i className="fa fa-times-circle" aria-hidden="true"></i>NO</p>
								</div>

							</div>

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
			isNaicsInputEnabled,
			naicsCodesList,
			employeeTotal,
			revenueTotal,
			shouldShowRevenueSection,
			shouldShowEmployeesSection,
			exceptionsList
		} = this.state;

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
					
					<h2>What's your industry?</h2>

					{naicsCodesList.length > 0 && <div> 

						{this.renderNaicsList(section)}

					</div>}

					{shouldShowNaicsInput ? (<div>

						<div className={styles.naicsCodeInput}>
							
							<TextInput
								id="naics-code"
								errorText={"Please enter a correct NAICS Code."}
								label="Your 6-digit NAICS code"
								validationState={""}
								onChange={() => {
									
									const data = {
										section,
										value: document.getElementById("naics-code").value
									};

									this.onInputChange(data);
									
								}}
							/>

							<SmallPrimaryButton
								onClick={() => {

									const naicsCode = document.getElementById("naics-code").value;
									this.addNaicsCode(naicsCode);
									this.showNaicsInput(false);

								}}
								disabled={!isNaicsInputEnabled}
								text="Add"
							/>

						</div>

						<p>The North American Industry Classification System or NAICS <br />classifies  businesses according to type of economic activity.</p>
						<p><a href="https://www.census.gov/eos/www/naics/" target="_blank"><SearchIcon aria-hidden="true" />Find your NAICS code</a></p>

					</div>) : (<div>

						<p><a onClick={() => {
							
							this.showNaicsInput(true);

						}}><i className="fa fa-plus" aria-hidden="true"></i>Add another industry</a></p>
					
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

					{this.renderAppBar({
						buttonText: "BACK",
						sectionTarget:"START"
					})}

				</div>}




				{section === "REVENUE" && <div>

					<h2>How much revenue?</h2>

					<div className={styles.revenueInput}>
						
						<TextInput
							id="revenue"
							errorText={"Please enter a correct number."}
							label="Annual Revenue"
							type="number"
							validationState={""}
							onChange={() => {

								const data = {
									section,
									value: Number(document.getElementById("revenue").value)
								};

								this.onInputChange(data);

							}}
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

					{this.renderAppBar({
						buttonText: "BACK",
						sectionTarget:"NAICS"
					})}

				</div>}




				{section === "EMPLOYEES" && <div>

					<h2>How many employees?</h2>

					<div className={styles.employeesInput}>
						
						<TextInput
							id="employees"
							errorText={"Please enter a correct number."}
							label="Number of employees"
							type="number"
							validationState={""}
							onChange={() => {

								const data = {
									section,
									value: Number(document.getElementById("employees").value)
								};

								this.onInputChange(data);

							}}
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

					{this.renderAppBar({
						buttonText: "BACK",
						sectionTarget: shouldShowRevenueSection ? "REVENUE" : "NAICS"
					})}

				</div>}




				{section === "RESULTS" && <div className={styles.resultsSection}>

					<h2>Are you a small business?</h2>

					{this.renderNaicsList(section)}

					<p>You may be eligible to participate in <BasicLink url="#">SBA contracting programs</BasicLink>.</p>

					{this.renderAppBar({
						buttonText: "START OVER",
						sectionTarget:"START"
					})}


					{exceptionsList.length > 0 && <div>

					</div>}

				</div>}




			</div>

		);

	}

}

SizeStandardsTool.defaultProps = {
	naicsCodes: [{
        "code": "111110",
        "description": "Soybean Farming",
        "sectorId": "11",
        "sectorDescription": "Agriculture, Forestry, Fishing and Hunting",
        "subsectorId": "111",
        "subsectorDescription": "Crop Production",
        "revenueLimit": 0.75,
        "employeeCount": null,
        "footnote": null,
        "parent": null
    },
    {
        "code": "111120",
        "description": "Oilseed (except Soybean) Farming",
        "sectorId": "11",
        "sectorDescription": "Agriculture, Forestry, Fishing and Hunting",
        "subsectorId": "111",
        "subsectorDescription": "Crop Production",
        "revenueLimit": 0.75,
        "employeeCount": null,
        "footnote": null,
        "parent": null
    },
    {
        "code": "111130",
        "description": "Dry Pea and Bean Farming",
        "sectorId": "11",
        "sectorDescription": "Agriculture, Forestry, Fishing and Hunting",
        "subsectorId": "111",
        "subsectorDescription": "Crop Production",
        "revenueLimit": null,
        "employeeCount": 100,
        "footnote": null,
        "parent": null
    }]
};

export default SizeStandardsTool;
