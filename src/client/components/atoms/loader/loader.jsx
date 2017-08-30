import React from 'react'
import s from './loader.scss'
import logo from "../../../../../public/assets/images/logo-no-text.png"

const Loader = (props) => {
	return(
		<div className={s.container + " " + props.className}>
			<img className={s.logo} src={logo}/>	
			<div className={s.loader}></div>
		</div>

	)
}

export default Loader 