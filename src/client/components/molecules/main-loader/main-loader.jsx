import React from 'react';
import s from './main-loader.scss';
import * as LoadingActions from '../../../actions/loading.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Loader } from '../../atoms/index.js';

class MainLoader extends React.Component {
	shouldLoaderDisplay() {
		const allowedPages = ['', 'business-guide'];
		const currentPagePath = window.location.pathname.split('/')[1];
		return !this.props.loaded && allowedPages.includes(currentPagePath);
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
		loaded: reduxState.loading.loaded,
	};
}

export default connect(mapReduxStateToProps)(MainLoader);
