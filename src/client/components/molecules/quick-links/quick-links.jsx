import React from "react";
import s from "./quick-links.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ContentActions from "../../../actions/content.js";
import { DecorativeDash } from "../../atoms/index.js";
import * as NavigationActions from "../../../actions/navigation.js";
import queryString from "querystring";
import moment from "moment";

class QuickLinks extends React.Component {
	componentWillMount() {
		this.props.actions.fetchContentIfNeeded("documents", "documents", {
			sortBy: "Last Updated",
			start: 0,
			end: 3
		});
	}

	renderQuickLinks() {
		let gridClass = this.generateGrid(this.props.data.typeOfLinks.length);
		console.log(gridClass);
		return this.props.data.typeOfLinks.map((quickLink, index) => {
			if (quickLink.type === "documentLookup") {
				return (
					<LatestDocumentsCard
						key={index}
						classname={s.card + " " + gridClass}
						documents={this.props.documents}
						{...quickLink}
						locationChange={this.props.navigation.locationChange}
					/>
				);
			} else if (quickLink.type === "ratesCard") {
				return <RatesCard key={index} {...quickLink} classname={s.card + " " + gridClass} />;
			}
		});
	}

	generateGrid(length) {
		let gridClass = { 1: s.oneCard, 2: s.twoCards };
		return length > 2 ? s.manyCards : gridClass[length];
	}

	render() {
		console.log(this.props);
		return (
			<div className={s.collection}>
				{this.props.documents ? this.renderQuickLinks() : <div>loading</div>}
			</div>
		);
	}
}

const LatestDocumentsCard = props => {
	return (
		<div className={props.classname}>
			<div className={s.titleContainer}>
				<h3 className={s.title}>
					{props.sectionHeaderText}
				</h3>
				<a
					className={s.seeAll}
					onClick={() => {
						props.locationChange("/document");
					}}>
					See all
				</a>
			</div>
			<DecorativeDash className={s.dash} />
			<div>
				{props.documents.map((doc, index) => {
					return (
						<div key={index}>
							<a
								onClick={() => {
									props.locationChange("/" + doc.url);
								}}>
								{doc.title}
							</a>
							<div className={s.date}>
								{moment.unix(doc.updated).format("MMM D, YYYY")}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const RatesCard = props => {
	console.log(props);
	return (
		<div className={props.classname}>
			<h3 className={s.title}>Rates</h3>
			<DecorativeDash className={s.dash} />
			<div className={s.rateContainer}>
				SBA LIBOR Base Rate
				<div className={s.rate}>{props.liborRate}</div>
			</div>
			<div className={s.rateContainer}>
				SBA Peg Rate
				<div className={s.rate}>{props.liborRate}</div>
			</div>
			<div className={s.rateContainer}>
				SBA FIXED Base Rate
				<div className={s.rate}>{props.liborRate}</div>
			</div>
		</div>
	);
};

QuickLinks.defaultProps = {
	data: {
		type: "quickLinks",
		typeOfLinks: [
			{
				type: "documentLookup",
				documentActivity: {},
				documentProgram: ["CDC/504"],
				documentType: ["SOP"],
				sectionHeaderText: "SOPs"
			},
			{
				type: "documentLookup",
				documentActivity: {},
				documentProgram: ["7(a)"],
				documentType: ["Information notice", "Policy notice"],
				sectionHeaderText: "Policy guidance"
			},
			{
				type: "ratesCard",
				liborRate: "4.08%",
				pegRate: "6.08%",
				fixedRate: "2.625%"
			}
		]
	}
};

function mapReduxStateToProps(reduxState) {
	return {
		documents: reduxState.contentReducer["documents"]
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ContentActions, dispatch),
		navigation: bindActionCreators(NavigationActions, dispatch)
	};
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(QuickLinks);
