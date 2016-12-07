import React from 'react';
import ReactDOM from 'react-dom';
import { Provider }
from 'react-redux';
import { applyMiddleware, createStore }
from 'redux';
import thunk from "redux-thunk";
import rootReducer from '../reducers/index.js'

import { Router, Route, browserHistory, IndexRoute, IndexRedirect }
from 'react-router';
import { syncHistoryWithStore }
from 'react-router-redux';

import LincMain from './linc-main.jsx';
import LandingPage from './landing-page/landing-page.jsx';
import LoanForm from './loan-form/loan-form.jsx';
import SuccessPage from './success-page/success-page.jsx';
import ContactInfo from './loan-form/contact-info.jsx';
import LoanInfo from './loan-form/loan-info.jsx';
import BusinessInfo from './loan-form/business-info.jsx';
import IndustryInfo from './loan-form/industry-info.jsx';
import AdditionalInfo from './loan-form/additional-info.jsx';
import ReviewSubmitInfo from './loan-form/review-submit-info.jsx';

const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);


import '../styles/common.css';
import '../styles/common.scss';

ReactDOM.render(
    (<Provider store={store}>
      <Router history={history}>
        <Route path="/" component={LincMain}>
          <IndexRoute component={LandingPage}/>
          <Route path="landing" component={LandingPage} />
          <Route path="form" component={LoanForm}>
            <IndexRedirect to='contact' />
            <Route path="contact" component={ContactInfo} />
            <Route path="business" component={BusinessInfo} />
            <Route path="industry" component={IndustryInfo} />
            <Route path="loan" component={LoanInfo} />
            <Route path="additional" component={AdditionalInfo} />
            <Route path="review" component={ReviewSubmitInfo} />
          </Route>
          <Route path="success" component={SuccessPage} />
        </Route>
      </Router>
    </Provider>),
    document.getElementById('root')
);
