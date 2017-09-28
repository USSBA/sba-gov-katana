import React from "react";
import _ from "lodash"
import {LargePrimaryButton} from "atoms";
import styles from "./button-cta.scss";

const ButtonCta = (props) => {
	let eventConfig = {
		category: "General-CTA-Button",
		action: _.camelCase(props.title) + ": " + props.url
	}
	return(
		<div className={styles.buttonCTA}>
			<LargePrimaryButton text={props.title} url={props.url} eventConfig={eventConfig}/>
		</div>
	)
}

export default ButtonCta
