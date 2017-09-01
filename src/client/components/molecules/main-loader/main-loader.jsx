import React from 'react';
import s from './main-loader.scss';
import * as LoadingActions from '../../../actions/loading.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Loader } from '../../atoms/index.js';
import { browserHistory } from 'react-router';

class MainLoader extends React.Component {
	constructor() {
		super();
		this.state = {
			browserHistory: null,
		};
	}

	componentDidMount(){
		browserHistory.listen(location => {
			console.log("removeLoaderOnLocationChange", location)
			this.setState({ browserHistory: location });
		});
	}

	shouldLoaderDisplay() {
		const allowedPages = ['', 'business-guide'];
		const currentPagePath = window.location.pathname.split('/')[1];
		return this.props.displayLoader && allowedPages.includes(currentPagePath);
	}

	render() {
		return (
			<div>
				{this.shouldLoaderDisplay()
					? <div className={s.loaderContainer}>
							<Loader className={s.loader} />
						</div>
					: null}
			</div>
		);
	}
}

function mapReduxStateToProps(reduxState) {
	return {
		displayLoader: reduxState.loading.displayLoader,
	};
}

export default connect(mapReduxStateToProps)(MainLoader);
