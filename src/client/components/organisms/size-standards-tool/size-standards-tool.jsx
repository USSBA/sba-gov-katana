import React, {PureComponent} from "react";
import {
	LargePrimaryButton,
	SearchIcon,
	SmallPrimaryButton,
	SmallInversePrimaryButton,
	TextInput
} from "atoms";
import sizeStandardsGraphic from "../../../../../public/assets/images/tools/size-standards-tool/Size_standards_graphic.png";
import styles from "./size-standards-tool.scss";


class SizeStandardsTool extends PureComponent {

	constructor() {
		
		super();

		this.state = {
			"section": "NAICS",
			"subSection": "ADD_NAICS",
			"isNaicsCodeInputEnabled": false,
			"naicsCodesList": []
		};

		this.origState = Object.assign({}, this.state);
	}

	gotoSection(data) {

		let _data = data;

		if (_data.section === "START") {
			_data = Object.assign({}, this.origState);
		}

		this.setState(_data, () => {

			window.scrollTo(0, 0);

		});
	}

	onInputChange(data) {

		const {section, value} = data;

		switch(section) {

			case "NAICS":

				const isNaicsCodeInputEnabled = (value.length === 6);

				this.setState({isNaicsCodeInputEnabled});

			break;

			default:

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


		this.setState({
			naicsCodesList,
			subSection: "NAICS_LIST"
		});

	}

	renderNaicsList() {

		const {naicsCodesList} = this.state;
		
		const html = naicsCodesList.map((object, index) => {

			const {code, description} = object;

			return (

				<li key={index}>
					<div><span>{code}</span>{description}</div>
				</li>

			);

		});

		return html;

	}
	
	render() {

		const {
			section,
			subSection,
			isNaicsCodeInputEnabled,
			naicsCodesList
		} = this.state;

		return (

			<div className={styles.sizeStandardsTool}>
				
				{section === "START" && <div className={styles.start}>
					
					<h2>Size Standards Tool</h2>

					<img src={sizeStandardsGraphic} />

					<p>Do you qualify as a small business?</p>

					<LargePrimaryButton
						className={styles.button}
						text="Start"
						onClick={() => {
							
							const data = {
								"section": "NAICS",
								"subSection": "ADD_NAICS"
							};

							this.gotoSection(data);
						}}
					/>

				</div>}

				{section === "NAICS" && <div>
					
					<h2>What's your industry?</h2>
					
					{subSection === "ADD_NAICS" && <div>
						<div className={styles.naicsCodeInput}>
							
							<TextInput
								id="naics-code"
								errorText={"Please enter a correct NAICS Code."}
								label="Your 6-digit NAICS code"
								validationState={""}
								onChange={() => {
									
									const data = {
										section: section,
										value: document.getElementById("naics-code").value
									};

									this.onInputChange(data);
									
								}}
							/>

							<SmallPrimaryButton
								onClick={() => {

									const naicsCode = document.getElementById("naics-code").value;
									this.addNaicsCode(naicsCode);

								}}
								disabled={!isNaicsCodeInputEnabled}
								text="Add"
							/>

						</div>

						<p>The North American Industry Classification System or NAICS <br />classifies  businesses according to type of economic activity.</p>
						<p><a href="https://www.census.gov/eos/www/naics/" target="_blank"><SearchIcon aria-hidden="true" />Find your NAICS code</a></p>

					</div>}

					{subSection === "NAICS_LIST" && <div> 

					{this.renderNaicsList()}

					<p><a onClick={() => {
						
						this.gotoSection({
							"section": "NAICS",
							"subSection":"ADD_NAICS"
						});

					}}><SearchIcon aria-hidden="true" />Add another industry</a></p>

					</div>}

					{naicsCodesList.length > 0 && <div>
						
						<LargePrimaryButton
							className={styles.button}
							text="Next"
							onClick={() => {
								this.gotoSection({
									"section": "EMPLOYEES"
								});
							}}
						/>

					</div>}

					<div className={styles.appBar}>

						<SmallInversePrimaryButton
							text="BACK"
							onClick={() => {
								this.gotoSection({
									"section": "START"
								});
							}}
						/>

					</div>

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
						/>

					</div>

					<p>This caption will help a small business understand <br />what information we're looking for.</p>

					<LargePrimaryButton
						className={styles.button}
						text="Next"
						onClick={() => {
							this.gotoSection({
								"section": "RESULTS"
							});
						}}
					/>

					<div className={styles.appBar}>

						<SmallInversePrimaryButton
							text="BACK"
							onClick={() => {
								this.gotoSection({
									"section": "NAICS"
								});
							}}
						/>

					</div>

				</div>}

				{section === "EMPLOYEES" && <div>

					<h2>How many employees?</h2>

					<div className={styles.revenueInput}>
						
						<TextInput
							id="totalEmployees"
							errorText={"Please enter a correct number."}
							label="Number of employees"
							type="number"
							validationState={""}
						/>

					</div>

					<p>This should be the average number of full-time or part-time <br />employees over the last 12 months.</p>

					<LargePrimaryButton
						className={styles.button}
						text="Next"
						onClick={() => {
							this.gotoSection({
								"section": "RESULTS"
							});
						}}
					/>

					<div className={styles.appBar}>

						<SmallInversePrimaryButton
							text="BACK"
							onClick={() => {
								this.gotoSection({
									"section": "NAICS"
								});
							}}
						/>

					</div>

				</div>}

				{section === "RESULTS" && <div>

					<h2>Are you a small business?</h2>

					<div className={styles.appBar}>

						<SmallInversePrimaryButton
							text="START OVER"
							onClick={() => {
								this.gotoSection({
									"section": "START"
								});
							}}
						/>

					</div>

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
        "revenueLimit": 0.75,
        "employeeCount": null,
        "footnote": null,
        "parent": null
    }]
};

export default SizeStandardsTool;
