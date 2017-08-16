import React from "react";
import styles from "./document-card-collection.scss";
import _ from "lodash";
import DocumentCard from "../../molecules/document-card/document-card.jsx";

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

  constructor() {
    super();

    this.state = {
      cols: 3
    };

  }

  render() {

    const rows = arrayChunk(this.props.documents, this.state.cols);

    return (

      <div className={"document-card-collection " + styles.cardCollection}>
        {rows.map((row, rowIndex) => {
          
          return (
            
            <div className={styles.row} key={`row-${rowIndex}`}>
              {row.map((col, colIndex) => {

                return (

                  <div
                    key={`col-${colIndex}`}
                    className={styles.card}>
                    
                    <DocumentCard
                      doc={col}
                      showDetails={this.props.showDetails}
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
