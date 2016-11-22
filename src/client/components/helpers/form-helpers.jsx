import React from 'react';
import { FormGroup,
         FormControl,
         ControlLabel
} from 'react-bootstrap';

export default class CurrencyInput extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <FormGroup>
                    <ControlLabel>{this.props.label}</ControlLabel>
                    <FormControl
                        name="fundingAmount"
                        type="text"
                        placeholder={this.props.placeholder}
                        onChange={this.props.handleChange}
                        value={this.props.value}
                        onBlur={this.props.handleFormat}
                    />
                    <FormControl.Feedback />
                </FormGroup>
            </div>
        );
    }
}