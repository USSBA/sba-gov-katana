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


export default ({routes}) => {
  return [
    (<Route path="/" component={ Homepage } />)(<Route path="/linc" component={ LincMain }>
                                                  (
                                                  <IndexRoute component={ LandingPage } />) (
                                                  <Route path="landing" component={ LandingPage } />) (
                                                  <Route path="form" component={ LoanForm }>
                                                    (
                                                    <IndexRedirect to='contact' />) (
                                                    <Route path="contact" component={ ContactInfo } />) (
                                                    <Route path="business" component={ BusinessInfo } />) (
                                                    <Route path="industry" component={ IndustryInfo } />) (
                                                    <Route path="loan" component={ LoanInfo } />) (
                                                    <Route path="additional" component={ AdditionalInfo } />) (
                                                    <Route path="review" component={ ReviewSubmitInfo } />)
                                                  </Route>) (
                                                  <Route path="success" component={ SuccessPage } />) (
                                                  <Route path="emailconfirmed" component={ EmailConfirmedPage } />) (
                                                  <Route path="emailinvalid" component={ EmailConfirmationInvalid } />)
                                                </Route>
    )
  ];
};
