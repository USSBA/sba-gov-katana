import React from 'react'
import s from "./searchbox.scss"
import TextInput from '../../atoms/text-input/text-input.jsx'
import SearchIcon from "../../atmos/icons/search.jsx"

class SearchBox extends React.Component {

	render() {
		
		return (

			<div className={s.searchBox}>
				<TextInput
					placeholder="Title or number"
					id="lender-match-zero"
					errorText={"Please enter the correct thing."}
					label="Search"
					validationState={""}
				/>
				<div className={s.searchIcon}>
					<SearchIcon aria-hidden="true" />
				</div>
			</div>

		)
	}
}