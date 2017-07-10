import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LocationChangeActions from "../../../../actions/navigation.js";
import styles from './preparation-checklist.scss';
import planIcon from '../../../../../../public/assets/images/lender-match/business-plan.png';
import fundsIcon from '../../../../../../public/assets/images/lender-match/use-of-funds.png';
import creditIcon from '../../../../../../public/assets/images/lender-match/credit-history.png';
import projectionsIcon from '../../../../../../public/assets/images/lender-match/financial-projections.png';
import collateralIcon from '../../../../../../public/assets/images/lender-match/collateral.png';
import industryIcon from '../../../../../../public/assets/images/lender-match/industry-experience.png';
import SmallSecondaryButton from "../../../atoms/small-secondary-button/small-secondary-button.jsx";
import SmallPrimaryButton from "../../../atoms/small-primary-button/small-primary-button.jsx";


class PreparationChecklist extends React.Component{
    handleLenderMatchBtnClick() {
        this.props.actions.locationChange('/lendermatch/form/contact', {
            label: "Find Lenders #3"
        });
    }
    render(){
       return(
           <div id={this.props.tellMeHowAnchor} className={ styles.section }>
               <h2>Get ready.</h2>
               <h5>Before you start talking to lenders, have a look at the abbreviated checklist to see if you're ready.</h5>
               <div className={ styles.checklist }>
                   <ToDo icon={ planIcon } title="Business plan" caption="Most lenders expect a business plan when you apply for startup funding. If you need to create one, follow our free business plan guide."
                   />
                   <ToDo icon={ fundsIcon } title="Amount & use of funds" caption="Know how much capital you need and how it will help your business. You can’t use an SBA-approved loan to flip a house."
                   />
                   <ToDo icon={ creditIcon } title="Credit history" caption="Lenders use credit scores to determine credit risk and interest rates. The SBA helps guarantee some loans that otherwise may not qualify."
                   />
                   <ToDo icon={ projectionsIcon } title="Financial projections" caption="Show you understand your business' finances, how the funds will be used, and how you'll pay back the loan."
                   />
                   <ToDo icon={ collateralIcon } title="Collateral" caption="Many lenders require you to use another asset to guarantee your loan. This can be a home, car, inventory, or other property you own."
                   />
                   <ToDo icon={ industryIcon } title="Industry experience" caption="Industry experience isn't required, but it's helpful. Firsthand knowledge about your industry can make your lender feel confident about your loan request."
                   />
               </div>
               <div className={ styles.CallToAction }>
                   <p>Have questions or need help getting prepared? Take advantage of free, local counseling.</p>
                   <div className={ styles.ButtonGroup }>
                       <SmallSecondaryButton url="/tools/local-assistance" text="EXPERT HELP"/>
                       <SmallPrimaryButton text="FIND LENDERS" onClick={this.handleLenderMatchBtnClick.bind(this)}/>
                   </div>
               </div>
           </div>
       );
    }
}

const ToDo = (props) => <div className={ styles.card }>
                          <img src={ props.icon } alt="" />
                          <h3>{ props.title }</h3>
                          <hr />
                          <p>
                            { props.caption }
                          </p>
                        </div>;

function mapReduxStateToProps(reduxState) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(LocationChangeActions, dispatch)
    };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(PreparationChecklist);
