import React from 'react';

import Main from "./templates/main.jsx";
import LenderMatchMain from './templates/lender-match/lender-match-main.jsx';

import StyleGuide from './templates/style-guide/style-guide.jsx'

import LandingPage from './templates/lender-match/landing-page.jsx';
import SuccessPage from './templates/lender-match/success-page.jsx';
import EmailConfirmedPage from './organisms/lender-match/success-page/email-confirmed-page.jsx';
import EmailConfirmationInvalid from './organisms/lender-match/success-page/email-confirmation-invalid.jsx';

import LoanForm from './templates/lender-match/loan-form.jsx';
import ContactInfo from './organisms/lender-match/form/contact-info.jsx';
import LoanInfo from './organisms/lender-match/form/loan-info.jsx';
import BusinessInfo from './organisms/lender-match/form/business-info.jsx';
import IndustryInfo from './organisms/lender-match/form/industry-info.jsx';
import AdditionalInfo from './organisms/lender-match/form/additional-info.jsx';
import ReviewSubmitInfo from './organisms/lender-match/form/review-submit-info.jsx';
import DeveloperTester from './organisms/developer-tester/developer-tester.jsx';
import TenStepsLandingPage from './templates/ten-steps-page/ten-steps-landing-page.jsx';
import Homepage from './templates/homepage/homepage.jsx';
import SamplePage from './pages/sample.jsx';
import RootPage from './pages/root-page.jsx';
import DocumentLookupPage from "./pages/document-lookup-page/document-lookup-page.jsx"
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import constants from "../services/constants.js"


const mainRoutes = [
  (<IndexRoute key={1} component={Homepage}/>),
  (<Route key={2} path="/lendermatch" component={LandingPage}/>),
  (<Route key={4} path="/samples/:id" component={SamplePage}/>),
  (<Route key={5} path="/samples/:id/" component={SamplePage}/>),
  (<Route key={4} path="/document" component={DocumentLookupPage}/>),
  (<Route key={14} path="/document/" component={DocumentLookupPage}/>),
  (<Route key={12} path={constants.routes.tenSteps} component={TenStepsLandingPage}/>),
  (<Route key={6} path="/:first" component={RootPage}/>),
  (<Route key={7} path="/:first/" component={RootPage}/>),
  (<Route key={8} path="/:first/:second" component={RootPage}/>),
  (<Route key={9} path="/:first/:second/" component={RootPage}/>),
  (<Route key={10} path="/:first/:second/:third" component={RootPage}/>),
  (<Route key={11} path="/:first/:second/:third/" component={RootPage}/>),
  (<Route key={18} path="/:first/:second/:third/:fourth" component={RootPage}/>),
  (<Route key={19} path="/:first/:second/:third/:fourth/" component={RootPage}/>),
  (<Route key={20} path="/:first/:second/:third/:fourth/:fifth" component={RootPage}/>),
  (<Route key={21} path="/:first/:second/:third/:fourth/:fifth/" component={RootPage}/>)
];

const routes = [(<Route key={2} path="/styleguide" component={StyleGuide}/>), (<Route key={3} path="/devtest" component={DeveloperTester}/>),(
    <Route key={1} path="/" component={Main}>
      {mainRoutes}
    </Route>
  )];

export default routes;
