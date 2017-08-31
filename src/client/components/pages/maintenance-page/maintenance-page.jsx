import React from 'react'
import s from './maintenance-page.scss'

class MaintenancePage extends React.Component {

  render() {
     return (
     	<div className={s.container}>
     		<h1 className={s.title}>We'll be back soon!</h1>
     		<h3 className={s.blurb}>Sorry for the inconvenience but we're performing some maintenance at the moment. We'll be back online shortly.</h3>
     	</div>
     );
	}
}

export default MaintenancePage 