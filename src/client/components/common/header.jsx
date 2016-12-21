import React from 'react';
import {Grid, Navbar, Nav, NavItem, NavDropdown, MenuItem, Row, Col, Image, Button } from 'react-bootstrap';
import styles from '../../styles/header/header.scss';
import sbaLogo from '../../../../public/assets/svg/sba-logo.svg';



class Header extends React.Component {

  render() {
      return (
          <Row>
              <Col xs={12}>

                  <Navbar fluid={true} className={styles.navbar}>

                      <Navbar.Header>
                          <Image className={styles.logo} src={sbaLogo}/>
                          <Navbar.Toggle className={styles.hamburger}/>
                      </Navbar.Header>



                      <Navbar.Collapse>

                          <MiniNav/>

                          <Nav className={styles.mainNav + " pull-right"} id="mainNavbar">

                              <NavDropdown className={styles.navDropdown} eventKey={3} title="Starting & Managing" id="basic-nav-dropdown">
                                  <Row>
                                      <Col xs={3} xsOffset={1}>
                                          <h3 className={styles.dropdownHeader}>Starting a Business</h3>
                                          <MenuItem className={styles.dropdownItem} eventKey={3.2}>How to Start a Business</MenuItem>
                                          <MenuItem className={styles.dropdownItem} eventKey={3.3}>Write Your Business Plan</MenuItem>
                                          <MenuItem className={styles.dropdownItem} eventKey={3.3}>Choose Your Business Structure</MenuItem>
                                          <MenuItem className={styles.dropdownItem} eventKey={3.2}>Choose & Register Your Business</MenuItem>
                                          <MenuItem className={styles.dropdownItem} eventKey={3.3}>Choose Your Business Location and Equipment</MenuItem>
                                          <MenuItem className={styles.dropdownItem} eventKey={3.3}>Business Licenses & Permits</MenuItem>
                                          <MenuItem className={styles.dropdownItem} eventKey={3.2}>Learn About Business Laws</MenuItem>
                                          <MenuItem className={styles.dropdownItem} eventKey={3.3}>Business Financials</MenuItem>
                                          <MenuItem className={styles.dropdownItem} eventKey={3.3}>Filing and Paying Taxes</MenuItem>
                                          <MenuItem className={styles.dropdownItem} eventKey={3.2}>Hire and Retain Employees</MenuItem>
                                          <MenuItem className={styles.dropdownItem} eventKey={3.3}>Something else here</MenuItem>
                                      </Col>
                                  </Row>
                              </NavDropdown>

                              <NavDropdown className={styles.navDropdown} eventKey={3} title="Loans & Grants" id="basic-nav-dropdown">
                                  <MenuItem eventKey={3.1}>Action</MenuItem>
                                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                  <MenuItem divider />
                                  <MenuItem eventKey={3.3}>Separated link</MenuItem>

                              </NavDropdown>

                              <NavDropdown className={styles.navDropdown} eventKey={3} title="Contracting" id="basic-nav-dropdown">
                                  <MenuItem eventKey={3.1}>Action</MenuItem>
                                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                  <MenuItem divider />
                                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                              </NavDropdown>

                              <NavDropdown className={styles.navDropdown} eventKey={3} title="Learning Center" id="basic-nav-dropdown">
                                  <MenuItem eventKey={3.1}>Action</MenuItem>
                                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                  <MenuItem divider />
                                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                              </NavDropdown>

                              <NavDropdown className={styles.navDropdown} eventKey={3} title="Local Assistance" id="basic-nav-dropdown">
                                  <MenuItem eventKey={3.1}>Action</MenuItem>
                                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                  <MenuItem divider />
                                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                              </NavDropdown>

                              <NavDropdown className={styles.navDropdown} eventKey={3} title="About Us" id="basic-nav-dropdown">
                                  <MenuItem eventKey={3.1}>Action</MenuItem>
                                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                  <MenuItem divider />
                                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                              </NavDropdown>

                          </Nav>

                      </Navbar.Collapse>
                  </Navbar>

              </Col>
          </Row>
      );

  }
}

const MiniNav = (props) =>
    <Col xsHidden={true}>
        <Nav className="pull-right">
            <NavItem className={styles.miniNavItem} eventKey={1} href="#">Translate</NavItem>
            <NavItem className={styles.miniNavItem} eventKey={1} href="#">SBA En Espanol</NavItem>
            <NavItem className={styles.miniNavItem} eventKey={1} href="#">For Lenders</NavItem>
            <NavItem className={styles.miniNavItem} eventKey={1} href="#">Newsroom</NavItem>
            <NavItem className={styles.miniNavItem} eventKey={1} href="#">Contact Us</NavItem>
            <NavItem className={styles.miniNavItem} eventKey={1} href="#">Register</NavItem>
            <NavItem className={styles.miniNavItem} eventKey={1} href="#">Log In</NavItem>
            <NavItem className={styles.miniNavItem} eventKey={1} href="#">Link</NavItem>
        </Nav>
    </Col>;








export default Header;


