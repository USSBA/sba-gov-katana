import React from 'react';
import s from './main-loader.scss';
import * as LoadingActions from '../../../actions/loading.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Loader } from '../../atoms/index.js';
import { browserHistory } from 'react-router';

class MainLoader extends React.Component {

	componentDidMount() {
		browserHistory.listen(location => {
			this.props.loadingActions.showLoader()
		});
	}

	shouldLoaderDisplay() {
		const allowedPages = ['', 'business-guide'];
		const currentPagePath = window.location.pathname.split('/')[1];
		return this.props.displayLoader !== false && allowedPages.includes(currentPagePath);
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
	console.log(reduxState);
	return {
		displayLoader: reduxState.loading.displayLoader,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadingActions: bindActionCreators(LoadingActions, dispatch),
	};
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(MainLoader);
