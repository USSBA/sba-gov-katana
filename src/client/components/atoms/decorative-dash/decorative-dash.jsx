import React from 'react'
import styles from './decorative-dash.scss'

class DecorativeDash extends React.Component {
	
	render() {
	
		return <hr className={styles.decorativeDash + " " + this.props.className} />
	
	}

}

export default DecorativeDash
