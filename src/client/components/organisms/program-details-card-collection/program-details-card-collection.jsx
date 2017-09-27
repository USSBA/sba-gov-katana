import React, {Component} from "react";
import _ from "lodash";
import {CardCollection} from "organisms";
import styles from "./program-details-card-collection.scss";

class ProgramDetailsCardCollection extends Component {

  render() {

    const defaultCategoryConfig = {category: "Program-Details-Card"};
    const {cards} = this.props;
    const remapData = () => {

      return (

        cards.map((item) => {

          let eventConfig = null;
          if (this.props.eventConfig) {
            const actionConfig = {action: item.title};
            eventConfig = {
              ...defaultCategoryConfig,
              ...this.props.eventConfig,
              ...actionConfig
            };
          }
          return {
            titleText: item.title,
            subtitleText: item.description,
            link: item.fullUrl,
            eventConfig: eventConfig
          };

        })

      );
      
    };

    return (
      <div>
        {cards !== null &&
          <CardCollection cards={remapData()} leftAligned/>}
      </div>
    );

  }
  
}

const defaultCardsData = [
  {
    "title": "Title A",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
  }, {
    "title": "Title B",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
  }, {
    "title": "Title C",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
  }, {
    "title": "Title D",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
  }, {
    "title": "Title E",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
  }, {
    "title": "Title F",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
  }
];

ProgramDetailsCardCollection.defaultProps = {
  "cards": defaultCardsData,
  "leftAligned": true
};

export default ProgramDetailsCardCollection;
