import React from 'react';
import { FormGroup,
         FormControl,
         ControlLabel
} from 'react-bootstrap';

export class CurrencyInput extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const { handleChange, handleFormat, value, ...rest} = this.props;
        return(
            <TextInput
                {...rest}
                onChange={handleChange}
                onBlur={handleFormat}
                value={value}
            />
        );
    }
}

const TextInput = (props) =>
    <div>
        <FormGroup>
            <ControlLabel>{props.label}</ControlLabel>
            <FormControl
                {...props}
                type="text"
            />
            <FormControl.Feedback />
        </FormGroup>
    </div>;

