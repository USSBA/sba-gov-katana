import Async from 'react-code-splitting'

import React from 'react'
import { isEmpty } from 'lodash'

const Main = props => <Async componentProps={props} load={import('./templates/main.jsx')} />

const StyleGuide = props => (
  <Async componentProps={props} load={import('./templates/style-guide/style-guide.jsx')} />
)

const DeveloperTester = props => (
  <Async componentProps={props} load={import('./organisms/developer-tester/developer-tester.jsx')} />
)
const TenStepsLandingPage = props => (
  <Async componentProps={props} load={import('./templates/ten-steps-page/ten-steps-landing-page.jsx')} />
)
const HomepageContainer = props => (
  <Async componentProps={props} load={import('./templates/homepage/homepage-container.jsx')} />
)
const RootPage = props => <Async componentProps={props} load={import('./pages/root-page.jsx')} />
const DocumentLookupPage = props => (
  <Async componentProps={props} load={import('./pages/document-lookup-page/document-lookup-page.jsx')} />
)
const ArticleLookupPage = props => (
  <Async componentProps={props} load={import('./pages/article-lookup-page/article-lookup-page.jsx')} />
)
const SizeStandardsToolPage = props => (
  <Async
    componentProps={props}
    load={import('./pages/size-standards-tool-page/size-standards-tool-page.jsx')}
  />
)
const ResourceCenterProfilePage = props => (
  <Async
    componentProps={props}
    load={import('./pages/resource-center-profile-page/resource-center-profile-page.jsx')}
  />
)

const SearchPage = props => (
  <Async componentProps={props} load={import('./pages/search-page/search-page.jsx')} />
)

const CourseTemplate = props => (
  <Async componentProps={props} load={import('./templates/course/course.jsx')} />
)

const PersonPage = props => (
  <Async componentProps={props} load={import('./pages/person-page/person-page.jsx')} />
)

const PersonLookupPage = props => (
  <Async componentProps={props} load={import('./pages/person-lookup-page/person-lookup-page.jsx')} />
)

const LearningCenterLookupPage = props => (
  <Async
    componentProps={props}
    load={import('./pages/learning-center-lookup-page/learning-center-lookup-page.jsx')}
  />
)

const OfficeLookupPage = props => (
  <Async componentProps={props} load={import('./pages/office-lookup-page/office-lookup-page.jsx')} />
)

const EventLookupPage = props => (
  <Async componentProps={props} load={import('./pages/event-lookup-page/event-lookup-page.jsx')} />
)

const BlogsLandingPage = props => (
  <Async componentProps={props} load={import('./pages/blogs-landing/blogs-landing.jsx')} />
)

const BlogCategoryPage = props => (
  <Async componentProps={props} load={import('./pages/blog-category/blog-category-page.jsx')} />
)

const DistrictOfficePage = props => (
  <Async componentProps={props} load={import('./pages/district-office-page/district-office-page.jsx')} />
)

const DistrictOfficeSubPageTemplate = props => (
  <Async
    componentProps={props}
    load={import('./templates/district-office-subpage/district-office-subpage.jsx')}
  />
)

const SiteMapPage = props => (
  <Async componentProps={props} load={import('./pages/sitemap-page/sitemap-page.jsx')} />
)

import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router'
import constants from '../services/constants.js'
import clientConfig from '../services/client-config.js'
import MaintenancePage from './pages/maintenance-page/maintenance-page.jsx'

const mainRoutes = [
  <IndexRoute key={1} component={HomepageContainer} />,
  <Route key={5} path="/espanol" component={HomepageContainer} />,
  <Route key={4} path="/document" component={DocumentLookupPage} />,
  <Route key={14} path="/document/" component={DocumentLookupPage} />,
  <Route key={40} path="/article" component={ArticleLookupPage} />,
  <Route key={45} path="/article/" component={ArticleLookupPage} />,
  <Route key={46} path="/size-standards/" component={SizeStandardsToolPage} />,
  <Redirect key={47} from="/size-standards" to="/size-standards/" />,
  <Route key={48} path="/resource-partner-survey/" component={ResourceCenterProfilePage} />,
  <Redirect key={49} from="/resource-partner-survey" to="/resource-partner-survey/" />,
  <Route key={50} path="/search/" component={SearchPage} />,
  <Redirect key={51} from="/search" to="/search/" />,
  <Route key={52} path="/course/:first/" component={CourseTemplate} />,
  <Redirect key={53} from="/course/:first" to="/course/:first/" />,
  <Route key={54} path="/course/" component={LearningCenterLookupPage} />,
  <Redirect key={55} from="/course" to="/course/" />,
  <Route key={56} path="/person/:first/" component={PersonPage} />,
  <Redirect key={57} path="/person/:first" to="/person/:first/" />,
  <Route key={58} path="/local-assistance/find/" component={OfficeLookupPage} />,
  <Redirect key={59} from="/local-assistance/find" to="/local-assistance/find/" />,
  <Route key={60} path="/events/find/" component={EventLookupPage} />,
  <Redirect key={61} from="/events/find" to="/events/find/" />,
  <Route key={62} path="/person/" component={PersonLookupPage} />,
  <Redirect key={63} from="/person" to="/person/" />,
  <Route key={64} path="/blogs/" component={BlogsLandingPage} />,
  <Redirect key={65} from="/blogs" to="/blogs/" />,
  <Route key={66} path="/blogs/:category/" component={BlogCategoryPage} />,
  <Redirect key={67} from="/blogs/:category" to="/blogs/:category/" />,
  <Route key={68} path="/blogs/:category/:officeId/" component={BlogCategoryPage} />,
  <Redirect key={69} from="/blogs/:category/:officeId" to="/blogs/:category/:officeId/" />,
  <Route key={70} path="/offices/district/:officeId/" component={DistrictOfficePage} />,
  <Redirect key={71} from="/offices/district/:officeId" to="/offices/district/:officeId/" />,
  <Route
    key={72}
    path="/offices/district/:officeId/:pageConnectorId/"
    component={DistrictOfficeSubPageTemplate}
  />,
  <Redirect
    key={73}
    from="/offices/district/:officeId/:pageConnectorId"
    to="/offices/district/:officeId/:pageConnectorId/"
  />,
  <Route
    key={74}
    path="/offices/district/:officeId/:pageConnectorId/:subPageId"
    component={DistrictOfficeSubPageTemplate}
  />,
  <Redirect
    key={75}
    from="/offices/district/:officeId/:pageConnectorId:/:subPageId"
    to="/offices/district/:officeId/:pageConnectorId/:subPageId/"
  />,
  <Route key={76} path="/sitemap" component={SiteMapPage} />,
  <Redirect key={77} from="/sitemap/" to="/sitemap" />,
  <Route key={12} path="/business-guide/10-steps-start-your-business/" component={TenStepsLandingPage} />,
  <Route
    key={13}
    path="/business-guide/10-steps-start-your-business"
    to="/business-guide/10-steps-start-your-business/"
  />,
  <Route
    component={TenStepsLandingPage}
    key={112}
    onEnter={(nextState, replace) => {
      const {
        location: { pathname, query }
      } = nextState

      // react-router's query does not have hasOwnProperty()
      if (!Object.prototype.hasOwnProperty.call(query, 'lang')) {
        replace({ pathname, query: { ...query, lang: 'es' } })
      }
    }}
    path="/guia-de-negocios/10-pasos-para-iniciar-su-empresa/"
  />,
  <Redirect
    key={113}
    from="/guia-de-negocios/10-pasos-para-iniciar-su-empresa"
    to="/guia-de-negocios/10-pasos-para-iniciar-su-empresa/"
  />,
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
