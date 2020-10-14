import Async from 'react-code-splitting'
import React from 'react'

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

const LenderLookupPage = props => (
  <Async componentProps={props} load={import('./pages/lender-lookup-page/lender-lookup-page.jsx')} />
)

const BreakEvenCalculatorPage = props => (
  <Async
    componentProps={props}
    load={import('./pages/break-even-calc-landing-page/break-even-calc-landing-page.jsx')}
  />
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

const EventPage = props => (
  <Async componentProps={props} load={import('./pages/event-page/event-page.jsx')} />
)

import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router'

const mainRouteProperties = [
  {
    component: HomepageContainer
  },
  {
    component: HomepageContainer,
    path: '/espanol'
  },
  {
    component: DocumentLookupPage,
    path: '/document'
  },
  {
    component: ArticleLookupPage,
    path: '/article'
  },
  {
    component: SizeStandardsToolPage,
    path: '/size-standards'
  },
  {
    component: ResourceCenterProfilePage,
    path: '/resource-partner-survey'
  },
  {
    component: SearchPage,
    path: '/search'
  },
  {
    component: LearningCenterLookupPage,
    path: '/course'
  },
  {
    component: CourseTemplate,
    path: '/course/:first'
  },
  {
    component: PersonLookupPage,
    path: '/person'
  },
  {
    component: PersonPage,
    path: '/person/:first'
  },
  {
    component: OfficeLookupPage,
    path: '/local-assistance/find'
  },
  {
    component: OfficeLookupPage,
    path: '/asistencia-local/find'
  },
  {
    component: EventLookupPage,
    path: '/events/find'
  },
  {
    component: BlogsLandingPage,
    path: '/blogs'
  },
  {
    component: BlogCategoryPage,
    path: '/blogs/:category'
  },
  {
    component: BlogCategoryPage,
    path: '/blogs/:category/:officeId'
  },
  {
    component: DistrictOfficePage,
    path: '/offices/district/:officeId'
  },
  {
    component: LenderLookupPage,
    path: '/paycheckprotection/find'
  },
  {
    component: DistrictOfficeSubPageTemplate,
    path: '/offices/district/:officeId/:pageConnectorId'
  },
  {
    component: DistrictOfficeSubPageTemplate,
    path: '/offices/district/:officeId/:pageConnectorId/:subPageId'
  },
  {
    component: SiteMapPage,
    path: '/sitemap'
  },
  {
    component: EventPage,
    path: '/events/:locationTitlePath/:eventId'
  },
  {
    component: EventPage,
    path: '/events/:eventId'
  },
  {
    // TODO: Remove this redirect after switching to updated events backend
    from: '/event/:eventId',
    to: '/events/:eventId'
  },
  {
    component: TenStepsLandingPage,
    path: '/business-guide/10-steps-start-your-business'
  },
  {
    component: TenStepsLandingPage,
    onEnter: (nextState, replace) => {
      const {
        location: { pathname, query }
      } = nextState

      // react-router's query does not have hasOwnProperty()
      if (!Object.prototype.hasOwnProperty.call(query, 'lang')) {
        replace({ pathname, query: { ...query, lang: 'es' } })
      }
    },
    path: '/guia-de-negocios/10-pasos-para-iniciar-su-empresa'
  },
  {
    component: BreakEvenCalculatorPage,
    path: '/breakevenpointcalculator'
  },
  {
    from: '/breakevenpointcalculator',
    to: '/breakevenpointcalculator/'
  },
  {
    component: RootPage,
    path: '/:first'
  },
  {
    component: RootPage,
    path: '/:first/:second'
  },
  {
    component: RootPage,
    path: '/:first/:second/:third'
  },
  {
    component: RootPage,
    path: '/:first/:second/:third/:fourth'
  },
  {
    component: RootPage,
    path: '/:first/:second/:third/:fourth/:fifth'
  }
]

const mainRoutes = mainRouteProperties.map((item, index) => {
  const props = Object.assign(
    {
      key: index
    },
    item
  )

  let component

  if (index === 0) {
    component = <IndexRoute {...props} />
  } else if (item.from) {
    component = <Redirect {...props} />
  } else {
    component = <Route {...props} />
  }

  return component
})

const routes = [
  <Route key={2} path="/styleguide" component={StyleGuide} />,
  <Route key={3} path="/devtest" component={DeveloperTester} />,
  <Route key={1} path="/" component={Main}>
    {mainRoutes}
  </Route>
]

export default routes
