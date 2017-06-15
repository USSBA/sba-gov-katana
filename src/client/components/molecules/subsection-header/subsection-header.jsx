import React from 'react';
import styles from './subsection-header.scss';

class SubsectionHeader extends React.Component {

	render(){
		return(
				<h3 className={styles.subsectionHeader}>{this.props.text}</h3>
			);
	}
}

SubsectionHeader.propTypes = {
	text: React.PropTypes.string
};

export default SubsectionHeader