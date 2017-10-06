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
			"section": "START"
		};

	}

	gotoSection(section) {

		this.setState({section}, () => {

			window.scrollTo(0, 0);

		});
	}
	
	render() {

		const {section} = this.state;
		
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
							this.gotoSection("NAICS");
						}}
					/>

				</div>}

				{section === "NAICS" && <div>
					
					<h2>What's your industry?</h2>
					
					<div className={styles.naicsCodeInput}>
						
						<TextInput
							id="naics-code"
							errorText={"Please enter a correct NAICS Code."}
							label="Your 6-digit NAICS code"
							validationState={""}
						/>

						<SmallPrimaryButton text="Add" />

					</div>

					<p>The North American Industry Classification System or NAICS <br />classifies  businesses according to type of economic activity.</p>
					<p><a href="#"><SearchIcon aria-hidden="true" />Find your NAICS code</a></p>

					<LargePrimaryButton
						className={styles.button}
						text="Next"
						onClick={() => {
							this.gotoSection("EMPLOYEES");
						}}
					/>

					<div className={styles.appBar}>

						<SmallInversePrimaryButton
							text="BACK"
							onClick={() => {
								this.gotoSection("START");
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
							this.gotoSection("RESULTS");
						}}
					/>

					<div className={styles.appBar}>

						<SmallInversePrimaryButton
							text="BACK"
							onClick={() => {
								this.gotoSection("NAICS");
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
							this.gotoSection("RESULTS");
						}}
					/>

					<div className={styles.appBar}>

						<SmallInversePrimaryButton
							text="BACK"
							onClick={() => {
								this.gotoSection("NAICS");
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
								this.gotoSection("START");
							}}
						/>

					</div>

				</div>}

			</div>

		);

	}

}

export default SizeStandardsTool;
