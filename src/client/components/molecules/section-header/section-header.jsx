import React from 'react';

class SectionHeader extends React.Component {

	render(){
		return(
				<h2>{this.props.text}</h2>
			)
	}
}

SectionHeader.propTypes = {
	text: React.PropTypes.string
}

export default SectionHeader