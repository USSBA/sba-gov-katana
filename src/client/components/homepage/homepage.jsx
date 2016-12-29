import React from 'react';
import Header from '../common/header.jsx';
import Footer from '../common/footer.jsx';

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p> Homepage</p>
        <Footer />
      </div>
    )
  }
}

export default Homepage;
