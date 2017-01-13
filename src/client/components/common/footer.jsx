import React from 'react';
import styles from '../../styles/footer.scss';

import facebookThumbnail from "../../../../public/assets/images/footer/facebook.png"
import twitterThumbnail from "../../../../public/assets/images/footer/twitter.png"
import googlePlusThumbnail from "../../../../public/assets/images/footer/googleplus.png"
import youtubeThumbnail from "../../../../public/assets/images/footer/youtube-play.png"
import linkedInThumbnail from "../../../../public/assets/images/footer/linkedin.png"

import * as ModalActions from '../../actions/show-modal.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Footer extends React.Component {
  handleSocialMediaClick(e) {
    e.preventDefault();
    let targetUrl = e.target.dataset.target;
    this.props.actions.leaveSba(targetUrl);

  }

  render() {
    const SocialMediaLink = ({imageSrc, altText, targetUrl, ...props}) => {
      return (
        <a href={ targetUrl } onClick={ this.handleSocialMediaClick.bind(this) }>
          <img src={ imageSrc } alt={ altText } data-target={ targetUrl } />
        </a>
        );
    };

    return (
      <footer className={ styles.footer }>
        <div className={ styles.linkSectionContainer + " hidden-xs container-fluid" }>
          <div className={ styles.linkSubject + " col-xl-2 col-sm-2 col-sm-offset-0" }>
            <h4>Customer Service</h4>
            <ul>
              <li><a href="/about-sba">About SBA</a></li>
              <li><a href="/about-sba/what-we-do/contact-sba">Contact SBA</a></li>
              <li><a href="https://es.sba.gov/">En Español</a></li>
              <li><a href="/about-sba/sba-newsroom">Media and Press Relations</a></li>
              <li><a href="/about-sba/sba-locations">SBA Locations</a></li>
              <li><a href="/about-sba/sba-team">SBA Team</a></li>
            </ul>
          </div>
          <div className={ styles.linkSubject + " col-xl-2 col-sm-2 col-sm-offset-0" }>
            <h4>About SBA.gov</h4>
            <ul>
              <li><a href="/sitemap">Site Map</a></li>
              <li><a href="/about-sba/sba-performance/open-government/about-sbagov-website/privacy-policy">Privacy Policy</a></li>
              <li><a href="/about-sba/sba-performance/open-government/about-sbagov-website/linking-policy">Linking Policy</a></li>
              <li><a href="/about-sba/sba-performance/open-government/about-sbagov-website/accessibility">Accessibility</a></li>
              <li><a href="/about-sba/sba-performance/open-government/about-sbagov-website/disclaimer">Disclaimers</a></li>
              <li><a href="/about-sba/sba-performance/open-government/about-sbagov-website/social-media">Social Media</a></li>
              <li><a href="/about-sba/sba-performance/open-government/digital-sba/open-data">Data Store</a></li>
              <li><a href="/blogs">Blog</a></li>
            </ul>
          </div>
          <div className={ styles.linkSubject + " col-xl-2 col-sm-2 col-sm-offset-0" }>
            <h4>SBA Information</h4>
            <ul>
              <li><a href="/about-sba/sba-performance/open-government/foia">Freedom of Information Act</a></li>
              <li><a href="/about-sba/sba-performance/open-government/about-sbagov-website/no-fear-act">No Fear Act</a></li>
              <li><a href="/category/navigation-structure/contracting/contracting-officials/report-fraud-waste-abuse">Report Fraud, Waste and Abuse</a></li>
              <li><a href="/about-sba/sba-initiatives">Initiatives</a></li>
              <li><a href="/about-sba/sba-performance/open-government/other-plans-reports/plain-language-page">Plain Language</a></li>
            </ul>
          </div>
          <div className={ styles.linkSubject + " col-xl-2 col-sm-2 col-sm-offset-0" }>
            <h4>SBA Performance</h4>
            <ul>
              <li><a href="/about-sba/sba-performance/strategic-planning">Strategic Planning</a></li>
              <li><a href="/about-sba/sba-performance/performance-budget-finances">Performance, Budget & Financing</a></li>
              <li><a href="/about-sba/sba-performance/open-government">Open Government</a></li>
              <li><a href="/about-sba/sba-performance/policy-regulations">Policy and Regulations</a></li>
              <li><a href="/about-sba/sba-performance/policy-regulations/eliminating-fraud-waste-abuse">Eliminating Fraud, Waste, and Abuse </a></li>
            </ul>
          </div>
          <div className={ styles.linkSubject + " col-xl-2 col-sm-2 col-sm-offset-0" }>
            <h4>Oversight</h4>
            <ul>
              <li><a href="/office-of-inspector-general">Inspector General</a></li>
              <li><a href="/advocacy">Advocacy</a></li>
              <li><a href="/oha">Hearings and Appeals</a></li>
              <li><a href="/ombudsman">Ombudsman</a></li>
              <li><a href="https://www.whitehouse.gov">WhiteHouse.gov</a></li>
              <li><a href="https://www.usa.gov">USA.gov</a></li>
              <li><a href="https://www.regulations.gov">Regulations.gov</a></li>
            </ul>
          </div>
          <div className={ styles.linkSubjectLast + " col-xl-2 col-sm-2 col-sm-offset-0" }>
            <h4>Tools and Features</h4>
            <ul>
              <li><a href="/tools/sba-learning-center/search/training">Online Training</a></li>
              <li><a href="/tools/business-plan">Create a Business Plan</a></li>
              <li><a href="/tools/events">Find Events</a></li>
              <li><a href="/tools/size-standards-tool">Qualify for Government Contracts</a></li>
              <li><a href="/videos">SBA Videos</a></li>
            </ul>
          </div>
        </div>
        <div className={ styles.bottom + " container-fluid hidden-xs" }>
          <div className={ styles.social + " col-sm-3 container " }>
            <div className=" col-sm-1 col-sm-offset-0">
              <SocialMediaLink imageSrc={ facebookThumbnail } altText="SBA Facebook page" targetUrl="https://www.facebook.com/SBAgov" />
            </div>
            <div className=" col-sm-1 col-sm-offset-0">
              <SocialMediaLink imageSrc={ twitterThumbnail } altText="SBA Twitter page" targetUrl="https://www.twitter.com/sbagov" />
            </div>
            <div className=" col-sm-1 col-sm-offset-0">
              <SocialMediaLink imageSrc={ googlePlusThumbnail } altText="SBA Google Plus page" targetUrl="https://plus.google.com/+sbagov" />
            </div>
            <div className=" col-sm-1 col-sm-offset-0">
              <SocialMediaLink imageSrc={ youtubeThumbnail } altText="SBA Youtube page" targetUrl="https://www.youtube.com/user/sba" />
            </div>
            <div className=" col-sm-1 col-sm-offset-0">
              <SocialMediaLink imageSrc={ linkedInThumbnail } altText="SBA LinkedIn page" targetUrl="https://www.linkedin.com/company/us-small-business-administration" />
            </div>
          </div>
          <div className={ styles.address + " col-sm-9 container" }>
            <div className=" col-sm-12 text-right">U.S. Small Business Administration | 409 3rd St, SW. Washington DC 20416</div>
          </div>
        </div>
        <div className={ styles.smallLinks + " hidden-xl hidden-lg hidden-md hidden-sm container" } aria-hidden="true">
          <a className=" col-xs-5 col-xs-offset-1" href="/about-sba/what-we-do">What we do</a>
          <a className=" col-xs-6 col-xs-offset-0" href="/about-sba/sba-team">SBA Team</a>
          <a className=" col-xs-5 col-xs-offset-1" href="/about-sba/sba-newsroom">SBA News Room</a>
          <a className=" col-xs-6 col-xs-offset-0" href="/about-sba/sba-performance">SBA Performance</a>
          <a className=" col-xs-5 col-xs-offset-1" href="/about-sba/sba-performance/open-government/foia">FOIA</a>
          <a className=" col-xs-6 col-xs-offset-0" href="/about-sba/oversight-advocacy">Oversight & Advocacy</a>
          <a className=" col-xs-5 col-xs-offset-1" href="/about-sba/what-we-do/contact-sba">Contact SBA</a>
          <a className=" col-xs-6 col-xs-offset-0" href="/about-sba/sba-performance/open-government/about-sbagov-website/privacy-policy">Privacy Policy</a>
          <a className=" col-xs-5 col-xs-offset-1" href="https://es.sba.gov/">SBA En Español</a>
          <a className=" col-xs-6 col-xs-offset-0" href="/blogs">Blog</a>
        </div>
        <div className=" hidden-xl hidden-lg hidden-md hidden-sm container-fluid no-padding" aria-hidden="true">
          <div className={ styles.socialSmall }>
            <div className=" ">
              <SocialMediaLink imageSrc={ facebookThumbnail } altText="SBA Facebook page" targetUrl="https://www.facebook.com/SBAgov" />
            </div>
            <div className=" ">
              <SocialMediaLink imageSrc={ twitterThumbnail } altText="SBA Twitter page" targetUrl="https://www.twitter.com/sbagov" />
            </div>
            <div className="">
              <SocialMediaLink imageSrc={ googlePlusThumbnail } altText="SBA Google Plus page" targetUrl="https://plus.google.com/+sbagov" />
            </div>
            <div className="">
              <SocialMediaLink imageSrc={ youtubeThumbnail } altText="SBA Youtube page" targetUrl="https://www.youtube.com/user/sba" />
            </div>
            <div className="">
              <SocialMediaLink imageSrc={ linkedInThumbnail } altText="SBA LinkedIn page" targetUrl="https://www.linkedin.com/company/us-small-business-administration" />
            </div>
          </div>
          <div className={ styles.smallBottomBorder + " col-xs-12 col-xs-offset-0" }></div>
          <div className={ styles.addressSmall + " col-xs-12 container" }>
            <div className=" text-center"> U.S. Small Business Administration</div>
            <div className=" text-center"> 409 3rd St, SW. Washington DC 20416</div>
          </div>
        </div>
      </footer>
      );
  }
  ;
}

function mapReduxStateToProps(reduxState) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ModalActions, dispatch)
  }
}
export default connect(
  mapReduxStateToProps,
  mapDispatchToProps
)(Footer);
