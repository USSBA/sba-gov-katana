import React from 'react'
import {LargePrimaryButton} from '../../atoms';

const ButtonCta = (props) => {
	return(
		<div>
			<LargePrimaryButton text={props.title} url={props.url}/>
		</div>
	)
}

export default ButtonCta 