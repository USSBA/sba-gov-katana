import React from 'react'
import styles from "./section-page.scss";
import path from 'path';

class SectionPage extends React.Component {

  render() {
    console.log(this.props.sectionData);

    if (this.props.sectionData) {
      let sectionData = this.props.sectionData;
      return (
        <div className={styles.container}>
          <div>{this.props.sectionData.title}</div>
          <ol>
            {this.props.sectionData.children
              ? this.props.sectionData.children.map(function(item, index) {
                return (
                  <li key={index}>
                    <a href={item.url+"/"}>{item.title}</a>
                    <ul>
                      {item.children
                        ? item.children.map((inner, jndex) => {
                          return (
                            <li key={jndex}>
                              <a href={item.url + "/" + inner.url + "/"}>{inner.title}</a>
                            </li>
                          );
                        })
                        : <div/>}
                    </ul>
                  </li>
                );
              })
              : <div/>}
          </ol>
        </div>
      );
    }
    return (
      <div>Loading....</div>
    );
  }
}

SectionPage.defaultProps = {
  sectionData: []
}

export default SectionPage;
