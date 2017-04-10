import React from 'react';

import LincMain from './linc-main.jsx';

import StyleGuide from './templates/style-guide.jsx'

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

import Homepage from './templates/homepage.jsx';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

const routes = [
  (<Route key={ 1 } path="/" component={ Homepage } />),
  (<Route key={ 2 } path="/linc" component={ LincMain }>
     (
     <IndexRoute component={ LandingPage } />) (
     <Route key={ 1 } path="landing" component={ LandingPage } />) (
     <Route key={ 2 } path="form" component={ LoanForm }>
       (
       <IndexRedirect to='contact' />) (
       <Route path="contact" component={ ContactInfo } />) (
       <Route path="business" component={ BusinessInfo } />) (
       <Route path="industry" component={ IndustryInfo } />) (
       <Route path="loan" component={ LoanInfo } />) (
       <Route path="additional" component={ AdditionalInfo } />) (
       <Route path="review" component={ ReviewSubmitInfo } />)
     </Route>) (
     <Route key={ 3 } path="success" component={ SuccessPage } />) (
     <Route key={ 4 } path="emailconfirmed" component={ EmailConfirmedPage } />) (
     <Route key={ 5 } path="emailinvalid" component={ EmailConfirmationInvalid } />)
   </Route>
  ),
  (<Route key={ 3 } path="/styleguide" component={ StyleGuide } />)
];


export default routes;
