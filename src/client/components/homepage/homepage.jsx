import React from 'react';
import Header from '../common/header.jsx';
import Footer from '../common/footer.jsx';
import PrimaryLanding from './primary-landing.jsx';

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <PrimaryLanding/>
        <Footer />
      </div>
    )
  }
}

export default Homepage;
