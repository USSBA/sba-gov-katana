import React from 'react';
import styles from '../../styles/footer.scss';
import {Row, Col} from 'react-bootstrap';

class Footer extends React.Component{
    render(){
      return (
      <footer className={styles.body}>
          <Row>
              <Col md={2} mdOffset={0} xs={4} xsOffset={4}>
                  <h4>Customer Service</h4>
                  <ul>
                      <li><a href="https://www.sba.gov/about-sba">About SBA</a></li>
                      <li><a href="https://www.sba.gov/about-sba/what-we-do/contact-sba">Contact SBA</a></li>
                      <li><a href="https://es.sba.gov/">En Español</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-newsroom">Media and Press Relations</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-locations">SBA Locations</a></li>
                      <li><a href="https://www.sba.gov/about-sba/sba-team">SBA Team</a></li>
                  </ul>
              </Col>
              <Col md={2} mdOffset={0} xs={4} xsOffset={4}>
                  <h4>About SBA.gov</h4>
                  <ul>
                      <li><a href="">Site Map</a></li>
                      <li><a href="">Privacy Policy</a></li>
                      <li><a href="">Linking Policy</a></li>
                      <li><a href="">Accessibility</a></li>
                      <li><a href="">Disclaimers</a></li>
                      <li><a href="">Social Media</a></li>
                      <li><a href="">Data Store</a></li>
                  </ul>

              </Col>
              <Col md={2} mdOffset={0} xs={4} xsOffset={4}>
                  <h4>SBA Information</h4>
                  <ul>
                      <li><a href="">Freedom of Information Act</a></li>
                      <li><a href="">No Fear Act</a></li>
                      <li><a href="">Report Fraud, Waste and Abuse</a></li>
                      <li><a href="">Initiatives</a></li>
                      <li><a href="">Plain Language</a></li>
                  </ul>
              </Col>
              <Col md={2} mdOffset={0} xs={4} xsOffset={4}>
                  <h4>SBA Performance</h4>
                  <ul>
                      <li><a href="">Strategic Planning</a></li>
                      <li><a href="">Performance, Budget & Financing</a></li>
                      <li><a href="">Open Government</a></li>
                      <li><a href="">Policy and Regulations</a></li>
                      <li><a href="">Eliminating Fraud, Waste, and Abuse </a></li>
                  </ul>
              </Col>
              <Col md={2} mdOffset={0} xs={4} xsOffset={4}>
                  <h4>Oversight</h4>
                  <ul>
                      <li><a href="">Inspector General</a></li>
                      <li><a href="">Advocacy</a></li>
                      <li><a href="">Hearings and Appeals</a></li>
                      <li><a href="">Ombudsman</a></li>
                      <li><a href="">WhiteHouse.gov</a></li>
                      <li><a href="">USA.gov</a></li>
                      <li><a href="">Regulations.gov</a></li>

                  </ul>
              </Col>
              <Col md={2} mdOffset={0} xs={4} xsOffset={4}>
                  <h4>Tools and Features</h4>
                  <ul>
                      <li><a href="">Online Training</a></li>
                      <li><a href="">Create a Business Plan</a></li>
                      <li><a href="">Find Events</a></li>
                      <li><a href="">Qualify for Government Contracts</a></li>
                      <li><a href="">SBA Videos</a></li>
                  </ul>
              </Col>
          </Row>
      </footer>
      );
    };
}
export default Footer;