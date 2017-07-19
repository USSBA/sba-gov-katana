import React from 'react'
import styles from './icons.scss'

class Home extends React.PureComponent {
	
	render() {
		
		const { iconStyles } = this.props

		let tag;

		if (iconStyles !== undefined && iconStyles.length > 0)
			tag = <i className={styles.home + " fa fa-home " + iconStyles} />
		else
			tag =  <i className={styles.home + " fa fa-home"} />
	
		return tag
	
	}

}

export default Home
