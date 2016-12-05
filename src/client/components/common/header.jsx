import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div style={{ background: "#c4d8f2"}} className="text-center col-xs-12">
        <div style={{marginTop: "30px", marginBottom: "30px"}}>
          <h3 className="text-center"> Welcome to LINC, an SBA Tool </h3>
        </div>
      </div>
    );
  }
}
export default Header;
