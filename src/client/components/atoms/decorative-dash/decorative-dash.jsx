import React from 'react'
import styles from './decorative-dash.scss'

class DecorativeDash extends React.Component {
	
	render() {

		const { decorativeDashStyles } = this.props

		let tag;

		if (decorativeDashStyles !== undefined && decorativeDashStyles.length > 0)
			tag = <hr className={styles.decorativeDash + " " + decorativeDashStyles} />
		else
			tag =  <hr className={styles.decorativeDash} />
	
		return tag
	
	}

}

export default DecorativeDash
