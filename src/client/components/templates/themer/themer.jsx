import React from 'react';

const themes = {
      "sba-blue": [""],
      "byzantine": [],
      "money-green": ["linc"],
      "cobalt-blue": []
    }

class Themer extends React.Component {
                         
    generateTheme(){
      let theme;
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
    return (
      <div className={this.generateTheme()}>
        {this.props.children}
      </div>
      );
  }
}

export default Themer;