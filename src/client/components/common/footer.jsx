import React from 'react';
import styles from '../../styles/footer.scss';

import facebookThumbnail from "../../../../public/assets/images/footer/facebook.png"
import twitterThumbnail from "../../../../public/assets/images/footer/twitter.png"
import googlePlusThumbnail from "../../../../public/assets/images/footer/googleplus.png"
import youtubeThumbnail from "../../../../public/assets/images/footer/youtube-play.png"
import rssThumbnail from "../../../../public/assets/images/footer/rss.png"


class Footer extends React.Component{
    render(){
      return (
      <footer className={styles.footer}>
          <div className={styles.linkSectionContainer  + " container-fluid"}>
              <div className = {styles.linkSubject+ " col-xl-2 col-md-2 col-md-offset-0 col-sm-4 col-sm-offset-4"}>
                  <h4>Customer Service</h4>
                  <ul>
                      <li><a href="https://www.sba.gov/about-sba">About SBA</a></li>
                      <li><a href="https://www.sba.gov/about-sba/what-we-do/contact-sba">Contact SBA</a></li>
                      <li><a href="https://es.sba.gov/">En Español</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-newsroom">Media and Press Relations</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-locations">SBA Locations</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-team">SBA Team</a></li>
                  </ul>
              </div>
              <div className = {styles.linkSubject + " col-xl-2 col-md-2 col-md-offset-0 col-sm-4 col-sm-offset-4"}>
                  <h4>About SBA.gov</h4>
                  <ul>
                      <li><a href="https://www.sba.gov/sitemap">Site Map</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-performance/open-government/about-sbagov-website/privacy-policy">Privacy Policy</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-performance/open-government/about-sbagov-website/linking-policy">Linking Policy</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-performance/open-government/about-sbagov-website/accessibility">Accessibility</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-performance/open-government/about-sbagov-website/disclaimer">Disclaimers</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-performance/open-government/about-sbagov-website/social-media">Social Media</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-performance/open-government/digital-sba/open-data">Data Store</a></li>
                      <li><a href="https://www.sba.gov/blogs">Blog</a></li>
                  </ul>

              </div>
              <div className = {styles.linkSubject + " col-xl-2 col-md-2 col-md-offset-0 col-sm-4 col-sm-offset-4"}>
                  <h4>SBA Information</h4>
                  <ul>
                      <li><a href="https://www.sba.gov/about-sba/sba-performance/open-government/foia">Freedom of Information Act</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-performance/open-government/about-sbagov-website/no-fear-act">No Fear Act</a></li>
                      <li><a href="https://www.sba.gov/category/navigation-structure/contracting/contracting-officials/report-fraud-waste-abuse">Report Fraud, Waste and Abuse</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-initiatives">Initiatives</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-performance/open-government/other-plans-reports/plain-language-page">Plain Language</a></li>
                  </ul>
              </div>
              <div className = {styles.linkSubject + " col-xl-2 col-md-2 col-md-offset-0 col-sm-4 col-sm-offset-4"}>
                  <h4>SBA Performance</h4>
                  <ul>
                      <li><a href="https://www.sba.gov/about-sba/sba-performance/strategic-planning">Strategic Planning</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-performance/performance-budget-finances">Performance, Budget & Financing</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-performance/open-government">Open Government</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-performance/policy-regulations">Policy and Regulations</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-performance/policy-regulations/eliminating-fraud-waste-abuse">Eliminating Fraud, Waste, and Abuse </a></li>
                  </ul>
              </div>
              <div className = {styles.linkSubject + " col-xl-2 col-md-2 col-md-offset-0 col-sm-4 col-sm-offset-4"}>
                  <h4>Oversight</h4>
                  <ul>
                      <li><a href="https://www.sba.gov/office-of-inspector-general">Inspector General</a></li>
                      <li><a href="https://www.sba.gov/advocacy">Advocacy</a></li>
                      <li><a href="https://www.sba.gov/oha">Hearings and Appeals</a></li>
                      <li><a href="https://www.sba.gov/ombudsman">Ombudsman</a></li>
                      <li><a href="https://www.whitehouse.gov">WhiteHouse.gov</a></li>
                      <li><a href="https://www.usa.gov">USA.gov</a></li>
                      <li><a href="https://www.regulations.gov">Regulations.gov</a></li>

                  </ul>
              </div>
              <div className = {styles.linkSubjectLast + " col-xl-2 col-md-2 col-md-offset-0 col-sm-4 col-sm-offset-4"}>
                  <h4>Tools and Features</h4>
                  <ul>
                      <li><a href="https://www.sba.gov/tools/sba-learning-center/search/training">Online Training</a></li>
                      <li><a href="https://www.sba.gov/tools/business-plan">Create a Business Plan</a></li>
                      <li><a href="https://www.sba.gov/tools/events">Find Events</a></li>
                      <li><a href="https://www.sba.gov/tools/size-standards-tool">Qualify for Government Contracts</a></li>
                      <li><a href="https://www.sba.gov/videos">SBA Videos</a></li>
                  </ul>
              </div>
          </div>
          <div className={ styles.bottom + " container-fluid"}>
              <div className={styles.social + " col-md-6 container col-sm-12"}>
                  <div className = " col-md-1 col-md-offset-0 col-sm-2 col-sm-offset-2">
                      <a href="https://www.facebook.com/SBAgov">
                        <img src={ facebookThumbnail } alt="SBA Facebook page"/>
                      </a>
                  </div>
                  <div className = " col-md-1 col-sm-2">
                      <a href="https://www.twitter.com/sbagov">
                          <img src={ twitterThumbnail } alt="SBA Twitter page"/>
                      </a>
                  </div>
                  <div className = " col-md-1 col-sm-2">
                      <a href="https://plus.google.com/+sbagov">
                          <img src={ googlePlusThumbnail } alt="SBA Google Plus page"/>
                      </a>
                  </div>
                  <div className = " col-md-1 col-sm-2">
                      <a href="https://www.youtube.com/sba">
                          <img src={ youtubeThumbnail } alt="SBA Youtube page"/>
                      </a>
                  </div>
              </div>
              <div className={ styles.address + " col-md-6 container col-sm-12"}>
                  <div className = " col-md-12 text-right">U.S. Small Business Administration   |   409 3rd St, SW. Washington DC 20416</div>
              </div>
          </div>
      </footer>
      );
    };
}
export default Footer;