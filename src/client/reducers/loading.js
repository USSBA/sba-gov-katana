const loadingReducer = (state = {}, action) => {
	if (action.type === 'REMOVE_LOADER') {
		return {
			displayLoader: false,
		};
	} else if (action.type === 'SHOW_LOADER') {
		return {
			displayLoader: true,
		};
	}
	return state;
};

export default loadingReducer;
