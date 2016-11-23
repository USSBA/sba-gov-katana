import React from 'react';
import { FormGroup,
    FormControl,
    ControlLabel,
    Col
} from 'react-bootstrap';


//standard react form components to be used throughout application

export class CurrencyInput extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const { handleChange, handleFormat, value, ...rest} = this.props;
        return(
            <TextInput
                {...rest}
                handleChange={handleChange}
                onBlur={handleFormat}
                value={value}
            />
        );
    }
}

export const TextInput = ({handleChange, ...props}) =>
    <Col md={6} mdOffset={3}>
        <FormGroup className="input1">
            <ControlLabel>{props.label}</ControlLabel>
            <FormControl
                {...props}
                onChange={handleChange}
                type="text"
                />
            <FormControl.Feedback />
        </FormGroup>
    </Col>;

export const TextArea = ({handleChange, label, ...props}) =>
    <Col md={6} mdOffset={3}>
        <FormGroup>
            <ControlLabel>{label}</ControlLabel>
            <FormControl
                {...props}
                onChange={handleChange}
                componentClass="textArea"

                />
        </FormGroup>
    </Col>;

export const SelectBox = ({handleChange, label, ...props}) =>
    <Col md={6} mdOffset={3}>
        <FormGroup>
           <ControlLabel>{label}</ControlLabel>
           <FormControl
               {...props}
               onChange={handleChange}
               componentClass="select"
               />
        </FormGroup>
    </Col>;
