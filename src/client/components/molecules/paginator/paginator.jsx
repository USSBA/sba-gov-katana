import React from 'react';
import s from "./paginator.scss";
import {ArrowButton} from "../../atoms";

class Paginator extends React.Component {
  render() {
    let start = Math.min(1 + ((this.props.pageNumber - 1) * this.props.pageSize), this.props.total);  // needs to Math.min with total in case total is zero
    let end = Math.min(start + this.props.pageSize - 1, this.props.total);
    return (
      <div id={this.props.id} className={s.container}>
        <p>
          <span>Showing&nbsp;&nbsp;
          </span>
          <span className={s.bold}>{start}&nbsp; -&nbsp;{end}&nbsp;&nbsp;
          </span>
          <span>of&nbsp;&nbsp;</span>
          <span className={s.bold}>
            {this.props.total}</span>
        </p>
        <ArrowButton isBack onActivate={this.props.onBack}/>
        <ArrowButton noLeftBorder onActivate={this.props.onForward}/>
      </div>
    )
  }
}

Paginator.propTypes = {
  id: React.PropTypes.string,
  onForward: React.PropTypes.func,
  onBack: React.PropTypes.func,
  pageNumber: React.PropTypes.number,
  pageSize: React.PropTypes.number,
  total: React.PropTypes.number
};

Paginator.defaultProps = {
  onForward: () => {},
  onBack: () => {},
  pageNumber: 1,
  pageSize: 0,
  total: 0
}

export default Paginator;
