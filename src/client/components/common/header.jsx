import React from 'react';
import { Grid, Navbar, Nav, NavItem, NavDropdown, MenuItem, Row, Col, Image, Button, Glyphicon, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import styles from '../../styles/header/header.scss';
import sbaLogo from '../../../../public/assets/svg/sba-logo.svg';


class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    }
  }

  toggleNav() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  toggleSearch() {
    this.setState({
      search: !this.state.search
    })
  }

  render() {
    return (
      <Row>
        <Col xs={ 12 }>
        <Navbar fluid={ true } className={ styles.navbar } expanded={ this.state.expanded }>
          <Navbar.Header className={ styles.navbarHeader }>
            <Image className={ styles.logo } src={ sbaLogo } />
            <NavToggle onClick={ this.toggleNav.bind(this) } expanded={ this.state.expanded } />
          </Navbar.Header>
          <Navbar.Collapse>
            <MiniNav/>
            <MobileNav/>
            <Nav className={ styles.mainNav + " pull-right hidden-xs-down" } id="mainNavbar">
              <NavDropdown className={ styles.navDropdown } eventKey={ 3 } title="Starting & Managing" id="basic-nav-dropdown">
                <Col sm={ 10 } smOffset={ 1 }>
                <Row>
                  <Col sm={ 3 }>
                  <h3 className={ styles.dropdownHeader }>Starting a Business</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.1 }>How to Start a Business</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.2 }>Write Your Business Plan</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.3 }>Choose Your Business Structure</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.4 }>Choose & Register Your Business</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.5 }>Choose Your Business Location and Equipment</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.6 }>Business Licenses & Permits</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.7 }>Learn About Business Laws</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.8 }>Business Financials</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.9 }>Filing and Paying Taxes</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.10 }>Hire and Retain Employees</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.11 }>Something else here</MenuItem>
                  </Col>
                  <Col sm={ 3 } smOffset={ 1 }>
                  <h3 className={ styles.dropdownHeader }>Managing a Business</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 2.1 }>Running a Business</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 2.2 }>Leading Your Business</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 2.3 }>Growing Your Business</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 2.4 }>Business Law and Regulations</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 2.5 }>Business Guides by Industry</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 2.6 }>Small Business Health Care</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 2.7 }>Exporting</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 2.8 }>Closing Down Your Business</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 2.9 }>Cybersecurity</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 2.10 }>Forms</MenuItem>
                  </Col>
                </Row>
                </Col>
              </NavDropdown>
              <NavDropdown className={ styles.navDropdown } eventKey={ 3 } title="Loans & Grants" id="basic-nav-dropdown">
                <Col sm={ 10 } smOffset={ 1 }>
                <Row>
                  <Col sm={ 3 }>
                  <h3 className={ styles.dropdownHeader }>See What SBA Offers</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.1 }>SBA Loan Programs</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.2 }>SBIC Investments</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.3 }>Surety Bonds</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.4 }>What SBA Doesn't Offer</MenuItem>
                  </Col>
                  <Col sm={ 3 } smOffset={ 1 }>
                  <h3 className={ styles.dropdownHeader }>Get Ready To Apply</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.1 }>Check Your Credit</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.2 }>Determine Your Financial Needs</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.3 }>Gather The Info You'll Need</MenuItem>
                  </Col>
                </Row>
                <Row>
                  <Col sm={ 3 }>
                  <h3 className={ styles.dropdownHeader }>Connect With SBA Approved Lenders</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 4.1 }>SBA LINC Tool</MenuItem>
                  </Col>
                  <Col sm={ 3 } smOffset={ 1 }>
                  <h3 className={ styles.dropdownHeader }>Find Other Sources for Financing</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 6.1 }>Venture Capital</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 6.2 }>Access Financing Tool</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 6.3 }>Research Grants for Small Business</MenuItem>
                  </Col>
                </Row>
                </Col>
              </NavDropdown>
              <NavDropdown className={ styles.navDropdown } eventKey={ 3 } title="Contracting" id="basic-nav-dropdown">
                <Col sm={ 10 } smOffset={ 1 }>
                <Row>
                  <Col sm={ 3 }>
                  <h3 className={ styles.dropdownHeader }>What is Government Contracting?</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.1 }>Overview</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.2 }>SBA's Role in Contracting</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.3 }>Your Responsibilities as a Contractor</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.4 }>Contracting Regulations</MenuItem>
                  </Col>
                  <Col sm={ 3 } smOffset={ 1 }>
                  <h3 className={ styles.dropdownHeader }>Getting Started as a Contractor</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.1 }>Qualifying as a Small Business</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.2 }>Determine Your Financial Needs</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.3 }>Gather The Info You'll Need</MenuItem>
                  </Col>
                  <Col sm={ 3 } smOffset={ 1 }>
                  <h3 className={ styles.dropdownHeader }>Finding Government Customers</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.1 }>Resources for Finding Customers</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.2 }>Subcontracting</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.3 }>See Agency Small Business Scorecards</MenuItem>
                  </Col>
                </Row>
                <Row>
                  <Col sm={ 3 }>
                  <h3 className={ styles.dropdownHeader }>Resources for Small Businesses</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.1 }>Government Contracting Classroom</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.2 }>Commercial Market Representatives</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.3 }>Procurement Center Representatives</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.4 }>Report Fraud</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.4 }>Size Protest</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.4 }>Certificates of Competency</MenuItem>
                  </Col>
                  <Col sm={ 3 } smOffset={ 1 }>
                  <h3 className={ styles.dropdownHeader }>Government Contracting Programs</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.1 }>What is a Small Business Set Aside?</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.2 }>8(a) Business Development Program</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.3 }>Small Disadvantaged Businesses</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.3 }>Women-Owned Small Businesses</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.3 }>HUBzone Program</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.3 }>All Small Mentor Protege Program</MenuItem>
                  </Col>
                  <Col sm={ 3 } smOffset={ 1 }>
                  <h3 className={ styles.dropdownHeader }>For Contracting Officials</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.1 }>Resources for Finding Customers</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.2 }>Subcontracting</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.3 }>See Agency Small Business Scorecards</MenuItem>
                  </Col>
                </Row>
                </Col>
              </NavDropdown>
              <NavItem className={ styles.navDropdown }>
                Learning Center
              </NavItem>
              <NavDropdown className={ styles.navDropdown } eventKey={ 3 } title="Local Assistance" id="basic-nav-dropdown">
                <Col sm={ 10 } smOffset={ 1 }>
                <Row>
                  <Col sm={ 3 }>
                  <h3 className={ styles.dropdownHeader }>SBA Offices and Resource Partners</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.1 }>SBA Distrcit Offices</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.2 }>SBA Regional Offices</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.3 }>Disaster Field Offices</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.4 }>SCORE Business Mentors</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.5 }>Small Business Development Centers</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.6 }>Women's Business Centers</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.7 }>U.S. Export Assitance Centers</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.8 }>Veteran's Business Outreach Centers</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.9 }>Certified Development Companies</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 1.10 }>Procurement Technical Assistance Centers</MenuItem>
                  </Col>
                </Row>
                </Col>
              </NavDropdown>
              <NavDropdown className={ styles.navDropdown } eventKey={ 3 } title="About" id="basic-nav-dropdown">
                <Col sm={ 10 } smOffset={ 1 }>
                <Row>
                  <Col sm={ 3 }>
                  <h3 className={ styles.dropdownHeader }>What We Do</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.1 }>Mission</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.2 }>History</MenuItem>
                  </Col>
                  <Col sm={ 3 } smOffset={ 1 }>
                  <h3 className={ styles.dropdownHeader }>SBA Team</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.1 }>The SBA Administrator</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.2 }>Jobs at SBA</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.3 }>SBA Leadership</MenuItem>
                  </Col>
                  <Col sm={ 3 } smOffset={ 1 }>
                  <h3 className={ styles.dropdownHeader }>SBA Locations</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.1 }>Policy & Regulations</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.2 }>Strategic Planning</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.3 }>Performance & Budget</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.3 }>Open Government</MenuItem>
                  </Col>
                </Row>
                <Row>
                  <Col sm={ 3 }>
                  <h3 className={ styles.dropdownHeader }>SBA Performance</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.1 }>Policy & Regulations</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.2 }>Strategic Planning</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.3 }>Performance & Budget</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 3.4 }>Open Government</MenuItem>
                  </Col>
                  <Col sm={ 3 } smOffset={ 1 }>
                  <h3 className={ styles.dropdownHeader }>Oversight & Advocacy</h3>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.1 }>Advocacy</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.2 }>Ombudsman</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.3 }>Inspector General</MenuItem>
                  <MenuItem className={ styles.dropdownItem } eventKey={ 5.3 }>Hearings & Appeals</MenuItem>
                  </Col>
                  <Col sm={ 3 } smOffset={ 1 }>
                  <h3 className={ styles.dropdownHeader }>SBA Newsroom</h3>
                  <h3 className={ styles.dropdownHeader }>SBA Initiatives</h3>
                  </Col>
                </Row>
                </Col>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </Col>
      </Row>
      );

  }
}

const MiniNav = (props) => <Col xsHidden={ true }>
                           <Nav className="pull-right">
                             <NavItem className={ styles.miniNavItem } eventKey={ 1 } href="#">Translate</NavItem>
                             <NavItem className={ styles.miniNavItem } eventKey={ 1 } href="#">SBA En Espanol</NavItem>
                             <NavItem className={ styles.miniNavItem } eventKey={ 1 } href="#">For Lenders</NavItem>
                             <NavItem className={ styles.miniNavItem } eventKey={ 1 } href="#">Newsroom</NavItem>
                             <NavItem className={ styles.miniNavItem } eventKey={ 1 } href="#">Contact Us</NavItem>
                             <NavItem className={ styles.miniNavItem } eventKey={ 1 } href="#">Register</NavItem>
                             <NavItem className={ styles.miniNavItem } eventKey={ 1 } href="#">Log In</NavItem>
                             <Search/>
                           </Nav>
                           </Col>;

const MobileNav = (props) => <Nav className={ styles.mobileNav }>
                               <Col>
                               </Col>
                               <NavItem className={ styles.mobileNavDropdown } eventKey={ 1 } href="#">Starting & Managing</NavItem>
                               <hr className={ styles.sectionDivider } />
                               <NavItem className={ styles.mobileNavDropdown } eventKey={ 1 } href="#">Loans & Grants</NavItem>
                               <hr className={ styles.sectionDivider } />
                               <NavItem className={ styles.mobileNavDropdown } eventKey={ 1 } href="#">Contracting</NavItem>
                               <hr className={ styles.sectionDivider } />
                               <NavItem className={ styles.mobileNavDropdown } eventKey={ 1 } href="#">Learning Center</NavItem>
                               <hr className={ styles.sectionDivider } />
                               <NavItem className={ styles.mobileNavDropdown } eventKey={ 1 } href="#">Local Assistance</NavItem>
                               <hr className={ styles.sectionDivider } />
                               <NavItem className={ styles.mobileNavDropdown } eventKey={ 1 } href="#">About Us</NavItem>
                               <hr className={ styles.sectionDivider } />
                               <NavItem className={ styles.mobileNavDropdownSub } eventKey={ 1 } href="#">
                                 <p>
                                   <Glyphicon style={ { marginRight: "10px" } } glyph="map-marker" /> SBA Near You</p>
                               </NavItem>
                               <hr className={ styles.sectionDivider } />
                               <NavItem className={ styles.mobileNavDropdownSub } eventKey={ 1 } href="#">
                                 <p>
                                   <Glyphicon style={ { marginRight: "10px" } } glyph="calendar" /> Small Business Events</p>
                               </NavItem>
                             </Nav>;


export class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: false,
      value: ""
    }
  }

  toggleSearch() {
    this.setState({
      search: !this.state.search
    })
  }

  search(e) {
    e.preventDefault();
    let uri = encodeURI("https://www.sba.gov/tools/search-result-page?search=" + this.state.value);
    document.location = uri
  }

  handleChange(e) {
    console.log(this.state.value)
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return (
      <NavItem className={ !!this.state.search ? styles.searchNavItem : styles.miniNavItem } eventKey={ 1 } href="#">
        { !!this.state.search ? (
          <form onSubmit={ (e) => this.search(e) }>
            <FormGroup className={ styles.searchBar }>
              <InputGroup className={ styles.searchBar }>
                <InputGroup.Addon className={ styles.searchAddon }>
                  <Glyphicon className={ styles.searchBarIcon } glyph="search" />
                </InputGroup.Addon>
                <FormControl onChange={ (e) => this.handleChange(e) } className={ styles.searchBar } type="text" placeholder="Search" />
              </InputGroup>
            </FormGroup>
          </form>
          ) : (
          <Glyphicon className={ styles.searchIcon } onClick={ this.toggleSearch.bind(this) } glyph="search" />
          ) }
      </NavItem>
    )
  }
}


const NavToggle = ({expanded, onClick, ...props}) => {
  if (expanded == false) {
    return <button className={ styles.menuBtn + " pull-right" } onClick={ onClick } {...props}>
             <span className={ styles.menuBtnTxt }>MENU</span>
             <Glyphicon className={ styles.hamburgerIcon } glyph="menu-hamburger" />
           </button>;
  } else {
    return <button className={ styles.menuBtn + " pull-right" } onClick={ onClick } {...props}>
             <span className={ styles.menuBtnTxt }>CLOSE</span>
             <Glyphicon className={ styles.hamburgerIcon } glyph="remove" />
           </button>;
  }
};













export default Header;


