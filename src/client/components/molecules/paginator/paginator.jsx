import React from 'react';
import s from "./paginator.scss";
import {ArrowButton} from "../../atoms";

class Paginator extends React.Component {
  render() {
    return (
      <div id={this.props.id} className={s.container}>
        <p>
          <span>Showing&nbsp;&nbsp;
          </span>
          <span className={s.bold}>{this.props.start}&nbsp;
            -&nbsp;{this.props.end}&nbsp;&nbsp;
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
  onBack: React.PropTypes.func
};

export default Paginator;
