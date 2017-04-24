import React from 'react';
import styles from './section-header.scss'

class SectionHeader extends React.Component {

	render(){
		console.log(this.props.index)
		return(
				<h2 id={"section-header-" + this.props.index} className={styles.sectionHeader}>{this.props.text}</h2>
			)
	}
}

SectionHeader.propTypes = {
	text: React.PropTypes.string
}

export default SectionHeader