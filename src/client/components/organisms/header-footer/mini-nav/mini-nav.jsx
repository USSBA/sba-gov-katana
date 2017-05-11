import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ModalActions from "../../../../actions/show-modal.js";
import * as ContentActions from "../../../../actions/content.js";
import clientConfig from "../../../../services/client-config.js";
import SearchBar from "../../../molecules/search-bar/search-bar.jsx";
import GoogleTranslate from "../../../molecules/google-translate/google-translate.jsx"
import UtilityLink from "../../../atoms/utility-link/utility-link.jsx"

import styles from './mini-nav.scss';
import cookie from 'react-cookie';

export class MiniNav extends React.Component {
  timerId = null;

  constructor(props) {
    super();
    this.state = {
      translateIsExpanded: false,
      userId: "",
      userEmail:"",
      userLoggedOn: false
    };
  }




  componentWillMount() {
    this.setState({
      userId: cookie.load('DRUPAL_UID'),
      userLoggedOn: clientConfig.isUserLoggedIn
    });
  }

  componentDidMount() {
    this.props.actions.fetchContentIfNeeded("userRoles", this.state.userId, {});
    if(this.state.userLoggedOn){
        //check whether email is already provided
        this.props.actions.fetchContentIfNeeded("userEmail", "useremail", {
            userId: this.state.userId
        });
    }
    if(!this.state.userEmail){
        this.timerId = setTimeout(()=>{
            this.props.modalActions.showSbaNewsletter(this.state.userEmail);
        }, 5000);
    }
  }


  componentWillUnmount(){
    if(this.timerId != null){
      clearTimeout(timerId);
    }
  }

  makeUserAccountSpecificLinks(){
      let links = [];
      if(this.state.userLoggedOn){
          if (this.props.userRoles && this.props.userRoles.length > 0) {
              links.push((<UtilityLink key={11} url="/admintool" text="Admin Tool"/>));
          }
          links.push((<UtilityLink key={12} url={ "/user/" + this.state.userId + "/edit" } text="My Account"/>))
          links.push((<UtilityLink key={13} url="/user/logout" text="Log Out"/>));
      }else{
          links.push((<UtilityLink key={14} url="/user/register" text="Register"/>));
          links.push((<UtilityLink key={15} url="/user/login" text="Log In"/>));
      }
      return links;
  }


  render() {
    return (
      <div className={ styles.miniNav }>
      <ul aria-label="mini-navigation">
        <GoogleTranslate/>
        <UtilityLink key={1} url="https://es.sba.gov/" text="SBA en español"/>
        <UtilityLink key={2} url="/for-lenders" text="For Lenders"/>
        <UtilityLink key={3} url="/about-sba/sba-newsroom" text="Newsroom"/>
        <UtilityLink key={4} url="/about-sba/what-we-do/contact-sba" text="Contact Us"/>
        { this.makeUserAccountSpecificLinks() }
        <SearchBar />
      </ul>
      </div>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    userRoles: reduxState.contentReducer["userRoles"],
    userEmail: reduxState.contentReducer["userEmail"]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch),
    modalActions: bindActionCreators(ModalActions, dispatch)
  };
}
export default connect(mapReduxStateToProps, mapDispatchToProps)(MiniNav);
