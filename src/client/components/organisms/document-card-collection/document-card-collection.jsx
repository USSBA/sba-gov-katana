import React from "react";
import styles from "./document-card-collection.scss";
import _ from "lodash";
import DocumentCard from "../../molecules/document-card/document-card.jsx";

const config = {
  cols: 3
}

const arrayChunk = (arr, size) => {
  
  if (!Array.isArray(arr)) {
    throw new TypeError("Input should be Array");
  }

  if (typeof size !== "number") {
    throw new TypeError("Size should be a Number");
  }

  const result = [];
  for (let index = 0; index < arr.length; index += size) {
    result.push(arr.slice(index, size + index));
  }

  return result;

};

class DocumentCardCollection extends React.Component {

  render() {

    const cardRows = arrayChunk(this.props.documents, config.cols);

    return (

      <div className={"document-card-collection " + styles.cardCollection}>
        {cardRows.map((cardRow, rowIndex) => {
          
          return (
            
            <div className={styles.cardRow} key={`cardRow-${rowIndex}`}>
              {cardRow.map((card, cardIndex) => {

                return (

                  <div
                    key={`card-${cardIndex}`}
                    className={styles.card}>
                    
                    <DocumentCard
                      doc={card}
                      showDetails={this.props.showDetails}
                      showBorder={false}
                    />

                  </div>

                );
              })}
            </div>

          );

        })}
      </div>

    );

  }
}

DocumentCardCollection.propTypes = {
  documents: React.PropTypes.array
};

DocumentCardCollection.defaultProps = {
  showDetails: true
};
export default DocumentCardCollection;
