import React from 'react';
import { CaretIcon } from 'atoms';
import s from './arrow-anchor-button.scss';

class ArrowAnchorButton extends React.Component {
	render() {
		return (
			<div>
				<a href="#paragraph-1">
					<div className={s.container}>
						<i className={`fa fa-angle-down ${s.arrow}`} aria-hidden="true"></i>
					</div>
				</a>
			</div>
		);
	}
}

export default ArrowAnchorButton;
