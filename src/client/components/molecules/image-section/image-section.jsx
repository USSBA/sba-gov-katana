import React from 'react';
import styles from './image-section.scss'

class ImageSection extends React.Component {

	render(){
		return(
			<div>
				<img id={"image-header-" + this.props.index}
						 className={styles.imageSection}
						 src={this.props.imageObj.url}
				/>
				<p className={styles.captionText}>{this.props.captionText}</p>
				
			</div>

			)
	}
}

// SectionHeader.propTypes = {
// 	text: React.PropTypes.string
// }

export default ImageSection