import Async from 'react-code-splitting'

import React from 'react';

let Main = (props) => <Async componentProps={props} load={import("./templates/main.jsx")} />
let LenderMatchMain = (props) => <Async componentProps={props} load={import("./templates/lender-match/lender-match-main.jsx")} />

let StyleGuide = (props) => <Async componentProps={props} load={import("./templates/style-guide/style-guide.jsx")} />

let LandingPage = (props) => <Async componentProps={props} load={import("./templates/lender-match/landing-page.jsx")} />
let SuccessPage = (props) => <Async componentProps={props} load={import("./templates/lender-match/success-page.jsx")} />
let EmailConfirmedPage = (props) => <Async componentProps={props} load={import("./organisms/lender-match/success-page/email-confirmed-page.jsx")} />
let EmailConfirmationInvalid = (props) => <Async componentProps={props} load={import("./organisms/lender-match/success-page/email-confirmation-invalid.jsx")} />

let LoanForm = (props) => <Async componentProps={props} load={import("./templates/lender-match/loan-form.jsx")} />
let ContactInfo = (props) => <Async componentProps={props} load={import("./organisms/lender-match/form/contact-info.jsx")} />
let LoanInfo = (props) => <Async componentProps={props} load={import("./organisms/lender-match/form/loan-info.jsx")} />
let BusinessInfo = (props) => <Async componentProps={props} load={import("./organisms/lender-match/form/business-info.jsx")} />
let IndustryInfo = (props) => <Async componentProps={props} load={import("./organisms/lender-match/form/industry-info.jsx")} />
let AdditionalInfo = (props) => <Async componentProps={props} load={import("./organisms/lender-match/form/additional-info.jsx")} />
let ReviewSubmitInfo = (props) => <Async componentProps={props} load={import("./organisms/lender-match/form/review-submit-info.jsx")} />
let DeveloperTester = (props) => <Async componentProps={props} load={import("./organisms/developer-tester/developer-tester.jsx")} />
let TenStepsLandingPage = (props) => <Async componentProps={props} load={import("./templates/ten-steps-page/ten-steps-landing-page.jsx")} />
let HomepageContainer = (props) => <Async componentProps={props} load={import("./templates/homepage/homepage-container.jsx")} />
let SamplePage = (props) => <Async componentProps={props} load={import("./pages/sample.jsx")} />
let RootPage = (props) => <Async componentProps={props} load={import("./pages/root-page.jsx")} />
let DocumentLookupPage = (props) => <Async componentProps={props} load={import("./pages/document-lookup-page/document-lookup-page.jsx")} />

import {Route, IndexRoute, IndexRedirect} from 'react-router';
import constants from "../services/constants.js"
import MaintenancePage from "./pages/maintenance-page/maintenance-page.jsx"


const LenderMatchRoutes = [
      (<IndexRoute key={999} component={LandingPage}/>),
      (<Route key={1} path="landing" component={LandingPage}/>),
      (<Route key={2} path="form" component={LoanForm}>
            (<IndexRedirect to='contact'/>)
            (<Route key={1}path="contact" component={ContactInfo}/>)
            (<Route key={2}path="business" component={BusinessInfo}/>)
            (<Route key={3}path="industry" component={IndustryInfo}/>)
            (<Route key={4}path="loan" component={LoanInfo}/>)
            (<Route key={5}path="additional" component={AdditionalInfo}/>)
            (<Route key={6}path="review" component={ReviewSubmitInfo}/>)
      </Route>),
      (<Route key={3} path="success" component={SuccessPage}/>),
      (<Route key={4} path="emailconfirmed" component={EmailConfirmedPage}/>),
      (<Route key={5} path="emailinvalid" component={EmailConfirmationInvalid}/>)
];

const mainRoutes = [
  (<IndexRoute key={1} component={HomepageContainer}/>),
  (<Route key={2} path="/lendermatch">{LenderMatchRoutes}</Route>),
  (<Route key={3} path="/samples/:id" component={SamplePage}/>),
  (<Route key={4} path="/samples/:id/" component={SamplePage}/>),
  (<Route key={5} path="/document" component={DocumentLookupPage}/>),
  (<Route key={6} path="/document/" component={DocumentLookupPage}/>),
  (<Route key={7} path={constants.routes.tenSteps} component={TenStepsLandingPage}/>),
  (<Route key={8} path="/:first" component={RootPage}/>),
  (<Route key={9} path="/:first/" component={RootPage}/>),
  (<Route key={10} path="/:first/:second" component={RootPage}/>),
  (<Route key={11} path="/:first/:second/" component={RootPage}/>),
  (<Route key={12} path="/:first/:second/:third" component={RootPage}/>),
  (<Route key={13} path="/:first/:second/:third/" component={RootPage}/>),
  (<Route key={14} path="/:first/:second/:third/:fourth" component={RootPage}/>),
  (<Route key={15} path="/:first/:second/:third/:fourth/" component={RootPage}/>),
  (<Route key={20} path="/:first/:second/:third/:fourth/:fifth" component={RootPage}/>),
  (<Route key={21} path="/:first/:second/:third/:fourth/:fifth/" component={RootPage}/>)
];

const routes = [(<Route key={2} path="/styleguide" component={StyleGuide}/>),
 (<Route key={3} path="/devtest" component={DeveloperTester}/>),(
    <Route key={1} path="/" component={Main}>
      {mainRoutes}
    </Route>
  )];

export default routes;
