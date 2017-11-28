import Async from 'react-code-splitting'

import React from 'react'

let Main = props => <Async componentProps={props} load={import('./templates/main.jsx')} />
let LenderMatchMain = props => (
  <Async componentProps={props} load={import('./templates/lender-match/lender-match-main.jsx')} />
)

let StyleGuide = props => (
  <Async componentProps={props} load={import('./templates/style-guide/style-guide.jsx')} />
)

let LandingPage = props => (
  <Async componentProps={props} load={import('./templates/lender-match/landing-page.jsx')} />
)
let SuccessPage = props => (
  <Async componentProps={props} load={import('./templates/lender-match/success-page.jsx')} />
)
let EmailConfirmedPage = props => (
  <Async
    componentProps={props}
    load={import('./organisms/lender-match/success-page/email-confirmed-page.jsx')}
  />
)
let EmailConfirmationInvalid = props => (
  <Async
    componentProps={props}
    load={import('./organisms/lender-match/success-page/email-confirmation-invalid.jsx')}
  />
)

let LoanForm = props => (
  <Async componentProps={props} load={import('./templates/lender-match/loan-form.jsx')} />
)
let ContactInfo = props => (
  <Async componentProps={props} load={import('./organisms/lender-match/form/contact-info.jsx')} />
)
let LoanInfo = props => (
  <Async componentProps={props} load={import('./organisms/lender-match/form/loan-info.jsx')} />
)
let BusinessInfo = props => (
  <Async componentProps={props} load={import('./organisms/lender-match/form/business-info.jsx')} />
)
let IndustryInfo = props => (
  <Async componentProps={props} load={import('./organisms/lender-match/form/industry-info.jsx')} />
)
let AdditionalInfo = props => (
  <Async componentProps={props} load={import('./organisms/lender-match/form/additional-info.jsx')} />
)
let ReviewSubmitInfo = props => (
  <Async componentProps={props} load={import('./organisms/lender-match/form/review-submit-info.jsx')} />
)
let DeveloperTester = props => (
  <Async componentProps={props} load={import('./organisms/developer-tester/developer-tester.jsx')} />
)
let TenStepsLandingPage = props => (
  <Async componentProps={props} load={import('./templates/ten-steps-page/ten-steps-landing-page.jsx')} />
)
let HomepageContainer = props => (
  <Async componentProps={props} load={import('./templates/homepage/homepage-container.jsx')} />
)
let SamplePage = props => <Async componentProps={props} load={import('./pages/sample.jsx')} />
let RootPage = props => <Async componentProps={props} load={import('./pages/root-page.jsx')} />
let DocumentLookupPage = props => (
  <Async componentProps={props} load={import('./pages/document-lookup-page/document-lookup-page.jsx')} />
)
let ArticleLookupPage = props => (
  <Async componentProps={props} load={import('./pages/article-lookup-page/article-lookup-page.jsx')} />
)
let SizeStandardsToolPage = props => (
  <Async
    componentProps={props}
    load={import('./pages/size-standards-tool-page/size-standards-tool-page.jsx')}
  />
)
let ResourceCenterProfilePage = props => (
  <Async
    componentProps={props}
    load={import('./pages/resource-center-profile-page/resource-center-profile-page.jsx')}
  />
)

import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router'
import constants from '../services/constants.js'
import MaintenancePage from './pages/maintenance-page/maintenance-page.jsx'

const mainRoutes = [
  <IndexRoute key={1} component={HomepageContainer} />,
  <Redirect key={27} from="/funding-programs/loans/lendermatch" to="/lendermatch" />,
  <Route key={2} path="/lendermatch" component={LandingPage} />,
  <Route key={4} path="/samples/:id" component={SamplePage} />,
  <Route key={5} path="/samples/:id/" component={SamplePage} />,
  <Route key={4} path="/document" component={DocumentLookupPage} />,
  <Route key={14} path="/document/" component={DocumentLookupPage} />,
  <Route key={40} path="/article" component={ArticleLookupPage} />,
  <Route key={45} path="/article/" component={ArticleLookupPage} />,
  <Route key={46} path="/size-standards/" component={SizeStandardsToolPage} />,
  <Redirect key={47} from="/size-standards" to="/size-standards/" />,
  <Route key={48} path="/resource-center-profile/" component={ResourceCenterProfilePage} />,
  <Redirect key={49} from="/resource-center-profile" to="/resource-center-profile/" />,
  <Route key={12} path={constants.routes.tenSteps} component={TenStepsLandingPage} />,
  <Route key={6} path="/:first" component={RootPage} />,
  <Route key={7} path="/:first/" component={RootPage} />,
  <Route key={8} path="/:first/:second" component={RootPage} />,
  <Route key={9} path="/:first/:second/" component={RootPage} />,
  <Route key={10} path="/:first/:second/:third" component={RootPage} />,
  <Route key={11} path="/:first/:second/:third/" component={RootPage} />,
  <Route key={18} path="/:first/:second/:third/:fourth" component={RootPage} />,
  <Route key={19} path="/:first/:second/:third/:fourth/" component={RootPage} />,
  <Route key={20} path="/:first/:second/:third/:fourth/:fifth" component={RootPage} />,
  <Route key={21} path="/:first/:second/:third/:fourth/:fifth/" component={RootPage} />
]

const routes = [
  <Route key={2} path="/styleguide" component={StyleGuide} />,
  <Route key={3} path="/devtest" component={DeveloperTester} />,
  <Route key={1} path="/" component={Main}>
    {mainRoutes}
  </Route>
]

export default routes
