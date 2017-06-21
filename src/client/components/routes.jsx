import React from 'react';

import Main from "./templates/main.jsx";
import LincMain from './templates/lender-match/linc-main.jsx';

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
import {Route, IndexRoute, IndexRedirect} from 'react-router';

const mainRoutes = [
  (<IndexRoute key={1} component={Homepage}/>),
  (<Route key={2} path="/linc" component={LincMain}>
      (<IndexRoute component={LandingPage}/>),
      (<Route key={1} path="landing" component={LandingPage}/>)
      (<Route key={2} path="form" component={LoanForm}>
            (<IndexRedirect to='contact'/>)
            (<Route path="contact" component={ContactInfo}/>)
            (<Route path="business" component={BusinessInfo}/>)
            (<Route path="industry" component={IndustryInfo}/>)
            (<Route path="loan" component={LoanInfo}/>)
            (<Route path="additional" component={AdditionalInfo}/>)
            (<Route path="review" component={ReviewSubmitInfo}/>)
      </Route>)
      (<Route key={3} path="success" component={SuccessPage}/>)
      (<Route key={4} path="emailconfirmed" component={EmailConfirmedPage}/>)
      (<Route key={5} path="emailinvalid" component={EmailConfirmationInvalid}/>)
    </Route>),
  (<Route key={4} path="/samples/:id" component={SamplePage}/>),
  (<Route key={5} path="/samples/:id/" component={SamplePage}/>),
  (<Route key={12} path="/tensteps" component={TenStepsLandingPage}/>),
  (<Route key={6} path="/:section" component={RootPage}/>),
  (<Route key={7} path="/:section/" component={RootPage}/>),
  (<Route key={8} path="/:section/:subsection" component={RootPage}/>),
  (<Route key={9} path="/:section/:subsection/" component={RootPage}/>),
  (<Route key={10} path="/:section/:subsection/:page" component={RootPage}/>),
  (<Route key={11} path="/:section/:subsection/:page/" component={RootPage}/>)
];

const routes = [(<Route key={2} path="/styleguide" component={StyleGuide}/>), (<Route key={3} path="/devtest" component={DeveloperTester}/>),(
    <Route key={1} path="/" component={Main}>
      {mainRoutes}
    </Route>
  )];

export default routes;
