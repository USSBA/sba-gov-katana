import React from "react";
import s from "./apply-button.scss";
import SmallInverseSecondaryButton from "../small-inverse-secondary-button/small-inverse-secondary-button.jsx";

class ApplyButton extends React.Component {

	render() {

		return (

			<div>
				
				<SmallInverseSecondaryButton
					onClick={() => {
						this.props.submit();
					}}
					className="testClass"
					extraClassName={s.applyFiltersBtn}
					text="Apply"
				/>

			</div>

		);

	}

}

export default ApplyButton;
