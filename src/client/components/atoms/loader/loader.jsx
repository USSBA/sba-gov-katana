import React from 'react'
import s from './loader.scss'
import { MainLogo } from "../../atoms/index.js"

const Loader = (props) => {
	return(
		<div className={s.container}>
			<MainLogo className={s.logo}/>
			<div className={s.loader}></div>
		</div>

	)
}

export default Loader 