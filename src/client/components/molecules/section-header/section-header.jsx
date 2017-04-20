import React from 'react';
import styles from './section-header.scss'

class SectionHeader extends React.Component {

	render(){
		return(
				<h2 className={styles.sectionHeader}>{this.props.text}</h2>
			)
	}
}

SectionHeader.propTypes = {
	text: React.PropTypes.string
}

export default SectionHeader