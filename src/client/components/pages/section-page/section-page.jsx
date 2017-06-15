import React from 'react'
import styles from "./section-page.scss";
import path from 'path';
import SimpleCta from "../../molecules/simple-cta/simple-cta.jsx"

class SectionPage extends React.Component {

  render() {
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
                    <a href={path.join("/",sectionData.url, item.url)}>{item.title}</a>
                    <ul>
                      {item.children
                        ? item.children.map((inner, jndex) => {
                          return (
                            <li key={jndex}>
                              <a href={path.join("/",sectionData.url, item.url, inner.url)}>{inner.title}</a>
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
          <div className={styles.nineStepsCtaContainer}>
          <SimpleCta actionText="Start your business in 9 steps" buttonText="SEE THE GUIDE" url="https://www.google.com"/>
          </div>
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
