import React from 'react';
// import '../../styles/common.css';
// import '../../styles/common.scss';
// import styles from 'style-loader!./styles.scss';


class Footer extends React.Component{
    render(){
      return (
      <div style={{background: "#c4d8f2"}} className="text-center col-xs-12">
          <div style={{marginTop: "30px", marginBottom: "30px"}}>
              <h4 className="footer"> U.S. Small Business Administration, 409 3rd St, SW. Washington DC 2046 </h4>
          </div>
      </div>
      );
    };
}
export default Footer;