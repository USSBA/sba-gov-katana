import React from 'react'
import { basename } from 'path'
import {MultiSelectBox} from 'atoms'

import style from './select-range.scss'

class SelectRange extends React.Component {

  render() {      
      return (
        <div id={this.props.id}>
            <label>{this.props.label}</label>
            <MultiSelectBox
                {...this.props.start}
            />
             to 
             <MultiSelectBox
                {...this.props.end}
            />
        </div>
    );
  }
}

class SelectRangeGroup extends React.Component {

    renderSelectRanges() {
        const {items} = this.props;
        items.map((value) => {
            return <SelectRange {...value.props} />
        });
    }

    render() {
        return (
            <div id={this.props.id}>
                <label>{this.props.label}</label>
                {this.renderSelectRanges()}
            </div>
        );
    }
}

export default {SelectRange,
     SelectRangeGroup}
