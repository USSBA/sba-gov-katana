import React from 'react';
import themes from "./themes.js"

class Themer extends React.Component {

    generateTheme(){
      let theme = 'sba-blue';
      Object.keys(themes).map((key) => {
        let path = window.location.pathname.split("/")[1]
        themes[key].forEach((themePath) => {
          if(path == themePath){
            theme = key
          }
        })
      });
      return theme
    }

  render() {
    let theme = this.generateTheme();
    if(document.body.className && document.body.className.indexOf(theme) === -1){
        document.body.className = document.body.className + " " + theme;
    }
    return (
      <div className={theme}>
        {this.props.children}
      </div>
      );
  }
}

export default Themer;
