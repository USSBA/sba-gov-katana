import React from 'react';
import { Button } from 'react-bootstrap'

class AnchorButton extends React.Component {

  scroll() {
    let element = document.getElementById(this.props.anchor);
    element.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  }

  render() {
    return (
      <Button block className={ this.props.className } onClick={ this.scroll.bind(this) }>
        {this.props.text}
      </Button>
    )
  }
}

export default AnchorButton;
