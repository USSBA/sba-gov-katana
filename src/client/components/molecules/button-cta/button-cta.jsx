import React from 'react'
import LargePrimaryButton from '../../atoms/large-primary-button/large-primary-button.jsx'

const ButtonCta = (props) => {
	return(
		<div>
			<LargePrimaryButton text={props.title} url={props.url}/>
		</div>
	)
}

export default ButtonCta 