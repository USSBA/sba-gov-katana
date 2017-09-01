import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Waypoint from "react-waypoint";
import * as ContentActions from "../../../actions/content.js";
import _ from "lodash";
import {
    TenStepsSection,
    TenStepsNav,
    CallToAction
} from "molecules";
import {BusinessGuideTileCollection} from "organisms";
import {findPageLineage, findSubSection, findSection} from "../../../services/menu.js";
import styles from "../../templates/ten-steps-page/ten-steps-landing-page.scss";


class TenStepsLandingPage extends React.Component {
    constructor(){
        super();
        this.state = {
            section: null,
            navType: "top"
        }
    }
    componentWillMount() {
        this.props.actions.fetchContentIfNeeded("menu", "menu");
        this.props.actions.fetchContentIfNeeded("counsellorCta", "counsellorCta");
    }

    handleSectionEnter(index){
        this.setState({section: index}, this.toggleNavType)
    }

    handleSectionLeave(index){
    }

    handleTitleSectionEnter(){
        this.setState({section: "titleSection"} , this.toggleNavType)
    }

    handleTitleSectionLeave(){
        this.setState({section: 0, navType: "center"})
    }

    handleCalloutEnter(){
        this.setState({section: null, navType: null})
    }

    handleCalloutLeave(){
        this.setState({section: 9, navType: "center"})
    }

    toggleNavType(){
        if(this.state.section >= 1) {
            this.setState({navType: "center"})
        } else if(this.state.section == "titleSection") {
            this.setState({navType: "top"})
        }
    }



    render() {
        let titleBoxDataArray = [
            {
                sectionNum: 1,
                title: "Conduct market research.",
                leftAlignBox: true,
                solidBox: false,
                image: "/assets/images/tensteps/research.png",
                imageAlt: "Do market research.",
                link: "/business-guide/plan/market-research-competitive-analysis",
                text: "Market research will tell you if there’s an opportunity to turn your idea into a successful business. It’s a way to gather information about potential customers and businesses already operating in your area. Use that information to find a competitive advantage for your business."
            },
            {
                sectionNum: 2,
                title: "Write your business plan.",
                leftAlignBox: false,
                solidBox: true,
                image: "/assets/images/tensteps/plan.jpg",
                imageAlt: "Write your business plan.",
                link: "/business-guide/plan/write-your-business-plan-template",
                text: "Your business plan is the foundation of your business. It’s a roadmap for how to structure, run, and grow your new business. You’ll use it to convince people that working with you — or investing in your company — is a smart choice."
            },
            {
                sectionNum: 3,
                title: "Fund your business.",
                leftAlignBox: true,
                solidBox: false,
                image: "/assets/images/tensteps/fund.jpg",
                imageAlt: "Fund your business.",
                link: "/business-guide/plan/fund-your-business",
                text: "Your business plan will help you figure out how much money you’ll need to start your business. If you don’t have that amount on hand, you’ll need to either raise or borrow the capital. Fortunately, there are more ways than ever to find the capital you need."
            },
            {
                sectionNum: 4,
                title: "Pick your business location.",
                leftAlignBox: false,
                solidBox: true,
                image: "/assets/images/tensteps/location.jpg",
                imageAlt: "Fund your business.",
                link: "/business-guide/launch/pick-your-business-location-zoning-laws",
                text: "Your business location is one of the most important decisions you’ll make. Whether you’re setting up a brick-and-mortar business or launching an online store, the choices you make could affect your taxes, legal requirements, and revenue."
            },
            {
                sectionNum: 5,
                title: "Choose a business structure.",
                leftAlignBox: true,
                solidBox: false,
                image: "/assets/images/tensteps/business-structure-scrabble.png",
                imageAlt: "Fund your business.",
                link: "/business-guide/launch/choose-business-structure-types-chart",
                text: "The legal structure you choose for your business will impact your business registration requirements, how much you pay in taxes, and your personal liability."
            },
            {
                sectionNum: 6,
                title: "Choose your business name.",
                leftAlignBox: true,
                solidBox: true,
                image: "/assets/images/tensteps/name.jpg",
                imageAlt: "Choose your business name.",
                link: "/business-guide/launch/choose-your-business-name-register",
                text: "It’s not easy to pick the perfect name. You’ll want one that reflects your brand and captures your spirit. You’ll also want to make sure your business name isn’t already being used by someone else."
            },
            {
                sectionNum: 7,
                title: "Register your business.",
                leftAlignBox: false,
                solidBox: true,
                image: "/assets/images/tensteps/register.jpg",
                imageAlt: "Choose your business name.",
                link: "/business-guide/launch/register-your-business-federal-state-agency",
                text: "Once you’ve picked the perfect business name, it’s time to make it legal and protect your brand. If you’re doing business under a name different than your own, you’ll need to register with the federal government, and maybe your state government, too."
            },
            {
                sectionNum: 8,
                title: "Get federal and state tax IDs.",
                leftAlignBox: true,
                solidBox: false,
                image: "/assets/images/tensteps/tax-ids.png",
                imageAlt: "Choose your business name.",
                link: "/business-guide/launch/get-federal-state-tax-id-number-ein",
                text: "You’ll use your employer identification number (EIN) for important steps to start and grow your business, like opening a bank account and paying taxes. It’s like a social security number for your business. Some — but not all — states require you to get a tax ID as well."
            },
            {
                sectionNum: 9,
                title: "Apply for licenses and permits.",
                leftAlignBox: false,
                solidBox: true,
                image: "/assets/images/tensteps/license.jpg",
                imageAlt: "Choose your business name.",
                link: "/business-guide/launch/apply-for-licenses-permits-federal-state",
                text: "Keep your business running smoothly by staying legally compliant. The licenses and permits you need for your business will vary by industry, state, location, and other factors."
            },
            {
                sectionNum: 10,
                title: "Open a business bank account.",
                leftAlignBox: true,
                solidBox: false,
                image: "/assets/images/tensteps/bank.png",
                imageAlt: "Choose your business name.",
                link: "/business-guide/launch/open-business-bank-account-fees-benefits",
                text: "A small business checking account can help you handle legal, tax, and day-to-day issues. The good news is it’s easy to set one up if you have the right registrations and paperwork ready."
            }
        ];      const tenstepSectionItems = titleBoxDataArray.map((item, index)=>{
            return(<TenStepsSection index={index} key={index} sectionItem={item} sectionEnter={() => {this.handleSectionEnter(index)}} sectionLeave={() => {this.handleSectionLeave(index)}}/>);
        });

        let sectionData = findSection(this.props.menu, "guide") || findSection(this.props.menu, "business-guide");
        let counsellorCta = this.props.counsellorCta;

        return (
            <div className={styles.tenStepsLandingPage}>
                { this.state.navType === 'center' ? <TenStepsNav navType='center' section={this.state.section}/> : null}

                    <div className={styles.titleSection}>
                        { this.state.navType === 'top' ? <TenStepsNav navType='top'/> : null}
                        <div className={styles.titleSectionText}>
                                <h1>10 steps to start your business.</h1>
                        <Waypoint onEnter={() => {this.handleTitleSectionEnter()}} onLeave={() => {this.handleTitleSectionLeave()}}>
                            <p>Starting a business involves planning, making key financial decisions, and completing a series of legal activities. Scroll down to learn about each step.</p>
                        </Waypoint>
                        </div>
                        <a className={styles.scrollButton} aria-hidden="true" href="#step-1"><i className={" fa fa-angle-down"}></i></a>
                        <a className={styles.backLink} href="/business-guide">Back to all topics</a>
                    </div>

                <span id="step-1" className={styles.anchor}></span>
                <div id="tensteps-landing-page-id" className={styles.tenStepsLandingPage}>
                    {tenstepSectionItems}
                </div>
                <div className={styles.lastSection}>
                    <div className={styles.lastSectionText}>
                        <h1>Open shop.</h1>
                        <Waypoint onEnter={() => {this.handleCalloutEnter()}}>
                        <p>Congratulations! It's time to cut the big ribbon. Your business is officially open. Now, focus on managing and growing your business.</p>
                        </Waypoint>
                    </div>
                </div>
                {sectionData ? <div className={styles.bizguideContainer}>
                    <h1>Explore more topics.</h1>
                    <BusinessGuideTileCollection sectionData={sectionData}/></div> : <div></div>
                }
                {
                    counsellorCta ? <div className={styles.counsellorCtaContainer}>
                        <CallToAction
                                      size={counsellorCta.size}
                                      headline={counsellorCta.headline}
                                      blurb={counsellorCta.blurb}
                                      image={counsellorCta.image}
                                      imageAlt={counsellorCta.imageAlt}
                                      btnTitle={counsellorCta.btnTitle}
                                      btnUrl={counsellorCta.btnUrl}
                                      title={counsellorCta.title} />
                    </div> : <div></div>
                }
            </div>
        );
    }
}

function mapReduxStateToProps(reduxState, ownProps) {
    return {
        menu: _.get(reduxState, "contentReducer.menu"),
        counsellorCta: _.get(reduxState, "contentReducer.counsellorCta")
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ContentActions, dispatch)
    }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(TenStepsLandingPage);
