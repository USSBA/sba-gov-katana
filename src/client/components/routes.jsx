import Async from 'react-code-splitting'

import React from 'react'

let Main = props => <Async componentProps={props} load={import('./templates/main.jsx')} />

let StyleGuide = props => (
  <Async componentProps={props} load={import('./templates/style-guide/style-guide.jsx')} />
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

let SearchPage = props => (
  <Async componentProps={props} load={import('./pages/search-page/search-page.jsx')} />
)

let CourseTemplate = props => (
  <Async componentProps={props} load={import('./templates/course/course.jsx')} />
)

let LearningCenterLookupPage = props => (
  <Async
    componentProps={props}
    load={import('./pages/learning-center-lookup-page/learning-center-lookup-page.jsx')}
  />
)

let OfficeLookupPage = props => (
  <Async componentProps={props} load={import('./pages/office-lookup-page/office-lookup-page.jsx')} />
)

import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router'
import constants from '../services/constants.js'
import clientConfig from '../services/client-config.js'
import MaintenancePage from './pages/maintenance-page/maintenance-page.jsx'

const mainRoutes = [
  <IndexRoute key={1} component={HomepageContainer} />,
  <Route key={4} path="/document" component={DocumentLookupPage} />,
  <Route key={14} path="/document/" component={DocumentLookupPage} />,
  <Route key={40} path="/article" component={ArticleLookupPage} />,
  <Route key={45} path="/article/" component={ArticleLookupPage} />,
  <Route key={46} path="/size-standards/" component={SizeStandardsToolPage} />,
  <Redirect key={47} from="/size-standards" to="/size-standards/" />,
  <Route key={50} path="/search/" component={SearchPage} />,
  <Redirect key={51} from="/search" to="/search/" />,
  <Route key={52} path="/course/:first/" component={CourseTemplate} />,
  <Redirect key={53} from="/course/:first" to="/course/:first/" />,
  <Route key={54} path="/course/" component={LearningCenterLookupPage} />,
  <Redirect key={55} from="/course" to="/course/" />,
  <Route key={48} path="/resource-partner-survey/" component={ResourceCenterProfilePage} />,
  <Redirect key={49} from="/resource-partner-survey" to="/resource-partner-survey/" />,
  <Route key={56} path="/office/" component={OfficeLookupPage} />,
  <Redirect key={57} from="/office" to="/office/" />,
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
