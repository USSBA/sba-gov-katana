import React from 'react';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class Navigation extends React.Component {
  render() {
    return (
        <div className="text-center">
          <Button onClick={event => alert("you are not ready")}> Am I Ready?</Button>
          <Button id="landing-page-button-find-lenders" onClick={event => browserHistory.push('/form')}> Find Lenders</Button>
        </div>
    );
  };
}

export default Navigation;
