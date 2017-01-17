import React from 'react';
import { Grid, Navbar, Nav, NavItem, NavDropdown, MenuItem, Row, Col, Image, Button, Glyphicon, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import styles from '../../styles/header/header.scss';
import sbaLogo from '../../../../public/assets/svg/sba-logo.svg';
import sbaLogoMobile from '../../../../public/assets/svg/sba-logo-mobile.svg';
import hamburgerClose from '../../../../public/assets/svg/close.svg';
import hamburger from '../../../../public/assets/svg/hamburger.svg';


class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      searchValue: ""
    }
  }

  toggleNav() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  handleSearchChange(e) {
    console.log(this.state.searchValue);
    this.setState({
      searchValue: e.target.value
    })
  }

  submitSearch(e) {
    e.preventDefault();
    let uri = encodeURI("/tools/search-result-page?search=" + this.state.searchValue);
    document.location = uri
  }


  render() {
    return (


      <Navbar fluid={ true } className={ styles.navbar } expanded={ this.state.expanded }>
        <Navbar.Header className={ styles.navbarHeader }>
          <Image className={ styles.logo + " hidden-xs" } src={ sbaLogo } alt="SBA logo" />
          <Image className={ styles.logo + " visible-xs-inline" } src={ sbaLogo } alt="SBA logo" />
          <NavToggle onClick={ this.toggleNav.bind(this) } expanded={ this.state.expanded } />
        </Navbar.Header>
        <Navbar.Collapse>
          <MiniNav submitSearch={ this.submitSearch.bind(this) } handleSearchChange={ this.handleSearchChange.bind(this) } />
          <MobileNav submitSearch={ this.submitSearch.bind(this) } handleSearchChange={ this.handleSearchChange.bind(this) } />
          <Nav className={ styles.mainNav + " pull-right hidden-xs-down" } id="mainNavbar">
            <NavDropdown className={ styles.navDropdown } eventKey={ 3 } title="Starting & Managing" id="basic-nav-dropdown" href="/starting-managing-business">
              <Col sm={ 10 } smOffset={ 1 }>
              <Row>
                <Col sm={ 3 }>
                <h3 className={ styles.dropdownHeader }><a href="/starting-business">Starting a Business</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/starting-business" eventKey={ 1.1 }>How to Start a Business</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/starting-business/write-your-business-plan" eventKey={ 1.2 }>Write Your Business Plan</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/starting-business/choose-your-business-structure" eventKey={ 1.3 }>Choose Your Business Structure</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/starting-business/choose-register-your-business" eventKey={ 1.4 }>Choose & Register Your Business</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/starting-business/choose-your-business-location-equipment" eventKey={ 1.5 }>Choose Your Business Location and Equipment</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/starting-business/business-licenses-permits" eventKey={ 1.6 }>Business Licenses & Permits</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/starting-business/learn-about-business-laws" eventKey={ 1.7 }>Learn About Business Laws</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/starting-business/business-financials" eventKey={ 1.8 }>Business Financials</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/starting-business/filing-paying-taxes" eventKey={ 1.9 }>Filing and Paying Taxes</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/starting-business/hire-retain-employees" eventKey={ 1.10 }>Hire and Retain Employees</MenuItem>
                </Col>
                <Col sm={ 3 } smOffset={ 1 }>
                <h3 className={ styles.dropdownHeader }><a href="/managing-business">Managing a Business</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/managing-business/running-business" eventKey={ 2.1 }>Running a Business</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/managing-business/leading-your-business" eventKey={ 2.2 }>Leading Your Business</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/managing-business/growing-your-business" eventKey={ 2.3 }>Growing Your Business</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/managing-business/business-law-regulations" eventKey={ 2.4 }>Business Law and Regulations</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/managing-business/business-guides-industry" eventKey={ 2.5 }>Business Guides by Industry</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/managing-business/small-business-health-care" eventKey={ 2.6 }>Small Business Health Care</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/managing-business/exporting" eventKey={ 2.7 }>Exporting</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/managing-business/closing-down-your-business" eventKey={ 2.8 }>Closing Down Your Business</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/managing-business/cybersecurity" eventKey={ 2.9 }>Cybersecurity</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/managing-business/forms" eventKey={ 2.10 }>Forms</MenuItem>
                </Col>
              </Row>
              </Col>
            </NavDropdown>
            <NavDropdown className={ styles.navDropdown } eventKey={ 3 } title="Loans & Grants" id="basic-nav-dropdown" href="/loans-grants">
              <Col sm={ 10 } smOffset={ 1 }>
              <Row>
                <Col sm={ 3 }>
                <h3 className={ styles.dropdownHeader }><a href="/loans-grants/see-what-sba-offers">See What SBA Offers</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/loans-grants/see-what-sba-offers/sba-loan-programs" eventKey={ 3.1 }>SBA Loan Programs</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/sbic" eventKey={ 3.2 }>SBIC Investments</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/surety-bonds" eventKey={ 3.3 }>Surety Bonds</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/loans-grants/see-what-sba-offers/what-sba-doesnt-offer" eventKey={ 3.4 }>What SBA Doesn't Offer</MenuItem>
                </Col>
                <Col sm={ 3 } smOffset={ 1 }>
                <h3 className={ styles.dropdownHeader }><a href="/loans-grants/get-ready-apply">Get Ready To Apply</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/loans-grants/get-ready-apply/check-your-credit" eventKey={ 5.1 }>Check Your Credit</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/loans-grants/get-ready-apply/determine-your-financial-needs" eventKey={ 5.2 }>Determine Your Financial Needs</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/loans-grants/get-ready-apply/gather-info-youll-need" eventKey={ 5.3 }>Gather The Info You'll Need</MenuItem>
                </Col>
              </Row>
              <Row>
                <Col sm={ 3 }>
                <h3 className={ styles.dropdownHeader }><a href="/loans-grants/get-ready-apply">Connect With SBA Approved Lenders</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/tools/linc" eventKey={ 4.1 }>SBA LINC Tool</MenuItem>
                </Col>
                <Col sm={ 3 } smOffset={ 1 }>
                <h3 className={ styles.dropdownHeader }><a href="/loans-grants/find-other-sources-financing">Find Other Sources for Financing</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/starting-business/finance-your-business/venture-capital/venture-capital" eventKey={ 6.1 }>Venture Capital</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/node/13710" eventKey={ 6.2 }>Access Financing Tool</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/loans-grants/find-other-sources-financing/research-grants-small-businesses" eventKey={ 6.3 }>Research Grants for Small Business</MenuItem>
                </Col>
              </Row>
              </Col>
            </NavDropdown>
            <NavDropdown className={ styles.navDropdown } eventKey={ 3 } title="Contracting" id="basic-nav-dropdown" href="/contracting">
              <Col sm={ 10 } smOffset={ 1 }>
              <Row>
                <Col sm={ 3 }>
                <h3 className={ styles.dropdownHeader }><a href="/contracting/what-government-contracting">What is Government Contracting?</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/contracting/what-government-contracting/overview" eventKey={ 3.1 }>Overview</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/contracting/what-government-contracting/sbas-role-government-contracting" eventKey={ 3.2 }>SBA's Role in Contracting</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/contracting/what-government-contracting/your-responsibilities-contractor" eventKey={ 3.3 }>Your Responsibilities as a Contractor</MenuItem>
                { /*<MenuItem className={ styles.dropdownItem } href="#" eventKey={ 3.4 }>Contracting Regulations</MenuItem>*/ }
                </Col>
                <Col sm={ 3 } smOffset={ 1 }>
                <h3 className={ styles.dropdownHeader }><a href="/contracting/getting-started-contractor">Getting Started as a Contractor</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/contracting/getting-started-contractor/qualifying-small-business" eventKey={ 5.1 }>Qualifying as a Small Business</MenuItem>
                { /*<MenuItem className={ styles.dropdownItem } href="" eventKey={ 5.2 }>Determine Your Financial Needs</MenuItem>*/ }
                { /*<MenuItem className={ styles.dropdownItem } href="" eventKey={ 5.3 }>Gather The Info You'll Need</MenuItem>*/ }
                </Col>
                <Col sm={ 3 } smOffset={ 1 }>
                <h3 className={ styles.dropdownHeader }><a href="/contracting/finding-government-customers">Finding Government Customers</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/contracting/finding-government-customers/contracting-resources-small-businesses" eventKey={ 5.1 }>Resources for Finding Customers</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/contracting/finding-government-customers/subcontracting" eventKey={ 5.2 }>Subcontracting</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/contracting/finding-government-customers/see-agency-small-business-scorecards" eventKey={ 5.3 }>See Agency Small Business Scorecards</MenuItem>
                </Col>
              </Row>
              <Row>
                <Col sm={ 3 }>
                <h3 className={ styles.dropdownHeader }><a href="/contracting/resources-small-businesses">Resources for Small Businesses</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/contracting/resources-small-businesses/government-contracting-classroom" eventKey={ 3.1 }>Government Contracting Classroom</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/contracting/resources-small-businesses/commercial-market-representatives" eventKey={ 3.2 }>Commercial Market Representatives</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/contracting/resources-small-businesses/procurement-center-representatives" eventKey={ 3.3 }>Procurement Center Representatives</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/contracting/resources-small-businesses/report-fraud-waste-abuse" eventKey={ 3.4 }>Report Fraud</MenuItem>
                { /*<MenuItem className={ styles.dropdownItem } href="" eventKey={ 3.4 }>Size Protest</MenuItem>*/ }
                <MenuItem className={ styles.dropdownItem } href="/contracting/resources-small-businesses/certificates-competency" eventKey={ 3.4 }>Certificates of Competency</MenuItem>
                </Col>
                <Col sm={ 3 } smOffset={ 1 }>
                <h3 className={ styles.dropdownHeader }><a href="/contracting/government-contracting-programs">Government Contracting Programs</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/contracting/government-contracting-programs/what-small-business-set-aside" eventKey={ 5.1 }>What is a Small Business Set Aside?</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/contracting/government-contracting-programs/8a-business-development-program" eventKey={ 5.2 }>8(a) Business Development Program</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/contracting/government-contracting-programs/small-disadvantaged-businesses" eventKey={ 5.3 }>Small Disadvantaged Businesses</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/contracting/government-contracting-programs/women-owned-small-businesses" eventKey={ 5.3 }>Women-Owned Small Businesses</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/contracting/government-contracting-programs/hubzone-program" eventKey={ 5.3 }>HUBzone Program</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/navigation-structure/all-small-mentor-protege-program" eventKey={ 5.3 }>All Small Mentor Protege Program</MenuItem>
                </Col>
                <Col sm={ 3 } smOffset={ 1 }>
                <h3 className={ styles.dropdownHeader }><a href="/contracting/contracting-officials">For Contracting Officials</a></h3>
                </Col>
              </Row>
              </Col>
            </NavDropdown>
            <NavItem className={ styles.navDropdown } href="/tools/sba-learning-center/search/training">
              Learning Center
            </NavItem>
            <NavDropdown className={ styles.navDropdown } eventKey={ 3 } title="Local Assistance" id="basic-nav-dropdown" href="/tools/local-assistance">
              <Col sm={ 10 } smOffset={ 1 }>
              <Row>
                <Col sm={ 3 }>
                <h3 className={ styles.dropdownHeader }><a href="/tools/local-assistance">SBA Offices and Resource Partners</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/tools/local-assistance/districtoffices" eventKey={ 1.1 }>SBA Distrcit Offices</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/tools/local-assistance/regionaloffices" eventKey={ 1.2 }>SBA Regional Offices</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/tools/local-assistance/disasteroffices" eventKey={ 1.3 }>Disaster Field Offices</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/tools/local-assistance/score" eventKey={ 1.4 }>SCORE Business Mentors</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/tools/local-assistance/sbdc" eventKey={ 1.5 }>Small Business Development Centers</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/tools/local-assistance/wbc" eventKey={ 1.6 }>Women's Business Centers</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/tools/local-assistance/eac" eventKey={ 1.7 }>U.S. Export Assitance Centers</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/tools/local-assistance/vboc" eventKey={ 1.8 }>Veteran's Business Outreach Centers</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/tools/local-assistance/cdc" eventKey={ 1.9 }>Certified Development Companies</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/tools/local-assistance/ptac" eventKey={ 1.10 }>Procurement Technical Assistance Centers</MenuItem>
                </Col>
              </Row>
              </Col>
            </NavDropdown>
            <NavDropdown className={ styles.navDropdown } eventKey={ 3 } title="About Us" id="basic-nav-dropdown" href="/about-sba">
              <Col sm={ 10 } smOffset={ 1 }>
              <Row>
                <Col sm={ 3 }>
                <h3 className={ styles.dropdownHeader }><a href="/about-sba/what-we-do">What We Do</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/about-sba/what-we-do/mission" eventKey={ 3.1 }>Mission</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/about-sba/what-we-do/history" eventKey={ 3.2 }>History</MenuItem>
                </Col>
                <Col sm={ 3 } smOffset={ 1 }>
                <h3 className={ styles.dropdownHeader }><a href="/about-sba/sba-team">SBA Team</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/administrator" eventKey={ 5.1 }>The SBA Administrator</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/about-sba/sba-team/jobs-sba" eventKey={ 5.2 }>Jobs at SBA</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/about-sba/sba-team/sba-leadership" eventKey={ 5.3 }>SBA Leadership</MenuItem>
                </Col>
                <Col sm={ 3 } smOffset={ 1 }>
                <h3 className={ styles.dropdownHeader }><a href="/about-sba/sba-locations">SBA Locations</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/about-sba/sba-performance/policy-regulations" eventKey={ 5.1 }>Policy & Regulations</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/about-sba/sba-performance/strategic-planning" eventKey={ 5.2 }>Strategic Planning</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/about-sba/sba-performance/performance-budget-finances" eventKey={ 5.3 }>Performance & Budget</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/about-sba/sba-performance/open-government" eventKey={ 5.3 }>Open Government</MenuItem>
                </Col>
              </Row>
              <Row>
                <Col sm={ 3 }>
                <h3 className={ styles.dropdownHeader }><a href="/about-sba/sba-performance">SBA Performance</a></h3>
                <MenuItem className={ styles.dropdownItem } href="" eventKey={ 3.1 }>Policy & Regulations</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="" eventKey={ 3.2 }>Strategic Planning</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="" eventKey={ 3.3 }>Performance & Budget</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="" eventKey={ 3.4 }>Open Government</MenuItem>
                </Col>
                <Col sm={ 3 } smOffset={ 1 }>
                <h3 className={ styles.dropdownHeader }><a href="/about-sba/oversight-advocacy">Oversight & Advocacy</a></h3>
                <MenuItem className={ styles.dropdownItem } href="/advocacy" eventKey={ 5.1 }>Advocacy</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/ombudsman" eventKey={ 5.2 }>Ombudsman</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/office-of-inspector-general" eventKey={ 5.3 }>Inspector General</MenuItem>
                <MenuItem className={ styles.dropdownItem } href="/oha" eventKey={ 5.3 }>Hearings & Appeals</MenuItem>
                </Col>
                <Col sm={ 3 } smOffset={ 1 }>
                <h3 className={ styles.dropdownHeader }><a href="/about-sba/sba-newsroom">SBA Newsroom</a></h3>
                <h3 className={ styles.dropdownHeader }><a href="/about-sba/sba-initiatives">SBA Initiatives</a></h3>
                </Col>
              </Row>
              </Col>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


      );

  }
}

const MiniNav = (props) => <Col xsHidden={ true }>
                           <Nav className={ styles.miniNav + " pull-right" }>
                             <Translate/>
                             <NavItem className={ styles.miniNavItem } eventKey={ 1 } href="https://es.sba.gov/">SBA En Espanol</NavItem>
                             <NavItem className={ styles.miniNavItem } eventKey={ 1 } href="/for-lenders">For Lenders</NavItem>
                             <NavItem className={ styles.miniNavItem } eventKey={ 1 } href="/about-sba/sba-newsroom">Newsroom</NavItem>
                             <NavItem className={ styles.miniNavItem } eventKey={ 1 } href="/about-sba/what-we-do/contact-sba">Contact Us</NavItem>
                             <NavItem className={ styles.miniNavItem } eventKey={ 1 } href="/user/register">Register</NavItem>
                             <NavItem className={ styles.miniNavItem } eventKey={ 1 } href="/user/login?destination=about-sba">Log In</NavItem>
                             <Search submitSearch={ props.submitSearch } handleSearchChange={ props.handleSearchChange } />
                           </Nav>
                           </Col>;

const MobileNav = (props) => <Nav className={ styles.mobileNav }>
                               <MobileSearch submitSearch={ props.submitSearch } handleSearchChange={ props.handleSearchChange } />
                               <hr className={ styles.sectionDivider } />
                               <NavItem className={ styles.mobileNavDropdown } eventKey={ 1 } href="/starting-managing-business">Starting & Managing</NavItem>
                               <hr className={ styles.sectionDivider } />
                               <NavItem className={ styles.mobileNavDropdown } eventKey={ 1 } href="/loans-grants">Loans & Grants</NavItem>
                               <hr className={ styles.sectionDivider } />
                               <NavItem className={ styles.mobileNavDropdown } eventKey={ 1 } href="/contracting">Contracting</NavItem>
                               <hr className={ styles.sectionDivider } />
                               <NavItem className={ styles.mobileNavDropdown } eventKey={ 1 } href="/tools/sba-learning-center/search/training">Learning Center</NavItem>
                               <hr className={ styles.sectionDivider } />
                               <NavItem className={ styles.mobileNavDropdown } eventKey={ 1 } href="/tools/local-assistance">Local Assistance</NavItem>
                               <hr className={ styles.sectionDivider } />
                               <NavItem className={ styles.mobileNavDropdown } eventKey={ 1 } href="/about-sba">About Us</NavItem>
                               <hr className={ styles.sectionDivider } />
                               <NavItem className={ styles.mobileNavDropdownSub } eventKey={ 1 } href="/tools/local-assistance#locations-page">
                                 <p style={ { margin: "0px" } }>
                                   <Glyphicon style={ { marginRight: "10px" } } glyph="map-marker" /> SBA Near You</p>
                               </NavItem>
                               <hr className={ styles.sectionDivider } />
                               <NavItem className={ styles.mobileNavDropdownSub } eventKey={ 1 } href="/tools/events#events-page">
                                 <p>
                                   <Glyphicon style={ { marginRight: "10px" } } glyph="calendar" /> Small Business Events</p>
                               </NavItem>
                             </Nav>;


export class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: false
    }
  }

  toggleSearch() {
    this.setState({
      search: !this.state.search
    })
  }


  render() {
    return (
      <NavItem className={ !!this.state.search ? styles.searchNavItem : styles.miniNavItem } eventKey={ 1 } href="#">
        { !!this.state.search ? (
          <form className={ styles.searchBarContainer } onSubmit={ (e) => this.props.submitSearch(e) }>
            <FormControl onChange={ (e) => this.props.handleSearchChange(e) } className={ styles.searchBar } type="text" placeholder="Search SBA.gov" autoFocus={ true } onBlur={ this.toggleSearch.bind(this) }
            />
            <Glyphicon className={ styles.searchSubmitBtn + " pull-right" } onMouseDown={ (e) => this.props.submitSearch(e) } glyph="search" />
          </form>
          ) : (
          <Glyphicon className={ styles.searchIcon } onClick={ this.toggleSearch.bind(this) } glyph="search" />
          ) }
      </NavItem>
    )
  }
}

const MobileSearch = (props) => <NavItem className={ styles.searchNavItem } eventKey={ 1 } href="#">
                                  <form onSubmit={ (e) => props.submitSearch(e) }>
                                    <FormGroup className={ styles.searchBar }>
                                      <InputGroup className={ styles.searchBar }>
                                        <InputGroup.Addon className={ styles.searchAddon }>
                                          <Glyphicon className={ styles.searchBarIcon } glyph="search" />
                                        </InputGroup.Addon>
                                        <FormControl onChange={ (e) => props.handleSearchChange(e) } className={ styles.searchBar } type="text" placeholder="Search SBA.gov" />
                                      </InputGroup>
                                    </FormGroup>
                                  </form>
                                </NavItem>;


export class Translate extends React.Component {
  constructor() {
    super();
    this.state = {
      translate: false
    }
  }

  toggleTranslate() {
    this.setState({
      translate: !this.state.translate
    })
  }


  render() {
    return (
      <NavItem className={ !!this.state.translate ? styles.googleTranslateContainer : styles.miniNavItem } eventKey={ 1 } href="#">
        <div className={ !!this.state.translate ? styles.googleTranslate : styles.hidden } id="google_translate_element"></div>
        <div className={ !!this.state.translate ? styles.hidden : "" } onClick={ this.toggleTranslate.bind(this) }>Translate</div>
      </NavItem>
    )
  }
}



const NavToggle = ({expanded, onClick, ...props}) => {
  if (expanded == false) {
    return <div className={ styles.menuBtn + " pull-right" } onClick={ onClick } {...props}>
             <span className={ styles.menuBtnTxt }>MENU</span>
             <img className={ styles.hamburgerIcon } src={ hamburger } />
           </div>;
  } else {
    return <div className={ styles.menuBtnClose + " pull-right" } onClick={ onClick } {...props}>
             <span className={ styles.menuBtnTxt }>CLOSE</span>
             <img className={ styles.hamburgerIcon } src={ hamburgerClose } />
           </div>;
  }
};



export default Header;
