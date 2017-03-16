import React from 'react';
import LincMain from './linc-main.jsx';
import LandingPage from './landing-page/landing-page.jsx';
import LoanForm from './lender-match/loan-form.jsx';
import SuccessPage from './success-page/success-page.jsx';
import EmailConfirmedPage from './success-page/email-confirmed-page.jsx';
import EmailConfirmationInvalid from './success-page/email-confirmation-invalid.jsx';
import ContactInfo from './lender-match/contact-info.jsx';
import LoanInfo from './lender-match/loan-info.jsx';
import BusinessInfo from './lender-match/business-info.jsx';
import IndustryInfo from './lender-match/industry-info.jsx';
import AdditionalInfo from './lender-match/additional-info.jsx';
import ReviewSubmitInfo from './lender-match/review-submit-info.jsx';
import Homepage from './homepage/homepage.jsx';
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
  )
];


export default routes;
