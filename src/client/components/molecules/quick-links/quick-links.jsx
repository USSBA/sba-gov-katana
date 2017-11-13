import React, {PureComponent} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import queryString from "querystring";
import moment from "moment";
import Promise from "bluebird";
import {
	DecorativeDash,
	BasicLink
} from "atoms";
import * as ContentActions from "../../../actions/content.js";
import * as NavigationActions from "../../../actions/navigation.js";
import s from "./quick-links.scss";

function getCurrentFile(files) {
	
	let found = null;
	
	if (files) {
		found = _.chain(files)
			.filter(item => moment(item.effectiveDate).isSameOrBefore(moment()))
			.sortBy("effectiveDate")
			.last()
			.value();
	}

	return found;
}

function formatDate(date) {

	return moment(date).format('MMM D, YYYY');

}

class QuickLinks extends PureComponent {

	componentWillMount() {
		this.fetchDocuments();
		this.fetchArticles();
	}

	fetchDocuments() {
		this.props.data.typeOfLinks.map((quickLink, index) => {
			if (quickLink.type === "documentLookup") {
				this.props.actions.fetchContentIfNeeded("documents-" + index, "documents", {
					sortBy: "Last Updated",
					type: _.isEmpty(quickLink.documentType[0]) ? "all" :  quickLink.documentType[0],
					program: _.isEmpty(quickLink.documentProgram[0]) ? "all" : quickLink.documentProgram[0],
					activity: _.isEmpty(quickLink.documentActivity[0]) ? "all" : quickLink.documentActivity[0],
					start: 0,
					end: 3
				})
			}
		})
	}

	fetchArticles() {
		this.props.data.typeOfLinks.map((quickLink, index) => {
			if (quickLink.type === "articleLookup") {
				this.props.actions.fetchContentIfNeeded("articles-" + index, "articles", {
					sortBy: "Created",
					type: "all",
					start: 0,
					end: 3
				});
			}
		});
	}

	generateGrid(length) {
		let gridClass = { 1: s.oneCard, 2: s.twoCards };
		return length > 2 ? s.manyCards : gridClass[length];
	}

	renderQuickLinks() {
		let gridClass = this.generateGrid(this.props.data.typeOfLinks.length);
		return this.props.data.typeOfLinks.map((quickLink, index) => {

			if (quickLink.type === "documentLookup") {
				return (
					<LatestDocumentsCard
						key={index}
						classname={s.card + " " + gridClass}
						documents={this.props["documents-" + index]}
						{...quickLink}
						locationChange={this.props.navigation.locationChange}
					/>
				);
			} else if (quickLink.type === "ratesList") {
				return <RatesCard key={index} {...quickLink} classname={s.card + " " + gridClass} />;
			} else if (quickLink.type === "articleLookup") {
				
				return (

					<ArticlesCard
						key={index}
						classname={s.card + " " + gridClass}
						articles={this.props["articles-" + index]}
						{...quickLink}
					/>
				
				);

			}
		});
	}

	render() {
		return (
			<div className={s.collection}>
				{this.props.data ? this.renderQuickLinks() : <div>loading</div>}
			</div>
		);
	}
}

const LatestDocumentsCard = props => {
  const eventCategory = `${props.sectionHeaderText.toLowerCase()}-module`;

	return (
		<div className={props.classname}>
			<div className={s.titleContainer}>
				<h3 className={s.title}>
					{props.sectionHeaderText}
				</h3>
				<BasicLink url={`/document?${queryString.stringify({type: props.documentType, program: props.documentProgram})}`}
                   text={"See all"} myClassName={s.seeAll}
                   eventConfig={{category: eventCategory, action: "See All"}}/>
			</div>
			<DecorativeDash className={s.dash} />
			<div>
				{props.documents && props.documents.items.length
					? props.documents.items.map((doc, index) => {
						const currentFile = getCurrentFile(doc.files);
						let effectiveDate;
						if (currentFile !== undefined && currentFile.effectiveDate !== undefined) {
							effectiveDate = currentFile.effectiveDate; 						
						}
						
						// Add a prefix to SOPs with the format {DOC_TYPE} {DOC_NUMBER} ({DOC_VERSION}) - {DOC_TITLE}
						let titlePrefix = "";
						if ( doc.documentIdType === "SOP" && doc.documentIdNumber ) {
							titlePrefix = doc.documentIdType + " " + doc.documentIdNumber + " ";
							if (currentFile && currentFile.version) {
								titlePrefix += "(" + currentFile.version + ") ";
							}
							titlePrefix += titlePrefix ? "- " : "";
						}
						const linkTitle = titlePrefix + (doc.title.length > 80 ? doc.title.slice(0, 90) + "..." : doc.title);
						return (
							<div key={index}>
								<BasicLink url={`/document/${doc.url}`}
											text={linkTitle}
											eventConfig={{category: eventCategory, action: `DocumentLink: ${linkTitle}`}}
								/>
								
								{effectiveDate && <div className={s.date}>
									{formatDate(effectiveDate)}
								</div>}
							</div>
							);
						}) : <div>loading</div> }
			</div>
		</div>
	);
};

const RatesCard = props => {
	return (
		<div className={props.classname}>
			<h3 className={s.title}>Rates</h3>
			<DecorativeDash className={s.dash} />
			{
				props.rate.map((rate, index) => {
					return (
						<div key={index} className={s.rateContainer}>
							{rate.name}
							<div className={s.rate}>{rate.percent}%</div>
						</div>
					)
				})
			}
		</div>
	);
};

const ArticlesCard = (props) => {

	const eventCategory = `${props.sectionHeaderText.toLowerCase()}-module`;
	const {articles} = props;

	return (

		<div className={props.classname}>
			<div className={s.titleContainer}>
				<h3 className={s.title}>
					{props.sectionHeaderText}
				</h3>
				<BasicLink url={`/article?${queryString.stringify({program: props.articleProgram})}`}
					text={"See all"} myClassName={s.seeAll}
					eventConfig={{
						category: eventCategory,
						action: "See All"
					}}
				/>
			</div>
			<DecorativeDash className={s.dash} />
			<div>
				
				{articles && articles.items.length ? (<div>

					{
						articles.items.map((doc, index) => {

							const linkTitle = doc.title.length > 80 ? doc.title.slice(0, 90) + "..." : doc.title;
							
							return (
								<div key={index}>
									<BasicLink
										url={`/article/${doc.url}`}
										text={linkTitle}
										eventConfig={{
											category: eventCategory,
											action: `ArticleLink: ${linkTitle}`
										}}
									/>
									<div className={s.date}>
										{moment.unix(doc.updated).format("MMM D, YYYY")}
									</div>
								</div>
							);
						})

					}

					</div>) : <div>loading</div>}
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
				documentActivity: [],
				documentProgram: ["CDC/504"],
				documentType: ["SOP"],
				sectionHeaderText: "SOPs"
			},
			{
				type: "documentLookup",
				documentActivity: [],
				documentProgram: ["7(a)"],
				documentType: ["Information notice"],
				sectionHeaderText: "Policy guidance"
			},
			{
				type: "ratesList",
				rate: [
					{
						type: "rate",
						name: "SBA LIBOR Base Rate",
						percent: 4.08
					},
					{
						type: "rate",
						name: "SBA Peg Rate",
						percent: 6.08
					},
					{
						type: "rate",
						name: "SBA FIXED Base Rate",
						percent: 2.625
					}
				],
				sectionHeaderText: "Rates"
			}, {
				type: "articleLookup",
				articleProgram: null, 
				sectionHeaderText: "Articles"
			}
		]
	}
};

function mapReduxStateToProps(reduxState) {

	return {
		"documents-0": reduxState.contentReducer["documents-0"],
		"documents-1": reduxState.contentReducer["documents-1"],
		"articles-2": reduxState.contentReducer["articles-2"]
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(ContentActions, dispatch),
		navigation: bindActionCreators(NavigationActions, dispatch)
	};
}

export {QuickLinks};

export default connect(mapReduxStateToProps, mapDispatchToProps)(QuickLinks);
