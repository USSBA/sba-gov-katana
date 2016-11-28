import React from 'react';
import { FormGroup,
    FormControl,
    Checkbox,
    ControlLabel,
    Col
} from 'react-bootstrap';
import styles from '../common/styles.scss';

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
    <Col xs={6} xsOffset={3}>
        <FormGroup className="input1">
            <ControlLabel className={styles.controlLabel}>{props.label}</ControlLabel>
            <FormControl
                {...props}
                onChange={handleChange}
                type="text"
                />
            <FormControl.Feedback />
        </FormGroup>
    </Col>;

export const TextArea = ({handleChange, label, ...props}) =>
    <Col xs={6} xsOffset={3}>
        <FormGroup>
            <ControlLabel className={styles.controlLabel}>{label}</ControlLabel>
            <FormControl
                {...props}
                onChange={handleChange}
                componentClass="textArea"
                />
        </FormGroup>
    </Col>;

export const SelectBox = ({handleChange, label, ...props}) =>
    <Col xs={6} xsOffset={3}>
        <FormGroup>
           <ControlLabel className={styles.controlLabel}>{label}</ControlLabel>
           <FormControl
               {...props}
               onChange={handleChange}
               componentClass="select"
               />
        </FormGroup>
    </Col>;

export const CheckBox = ({handleClick, label, ...props}) =>
    <Col xs={6} xsOffset={3}>
        <FormGroup>
            <Checkbox {...props} onClick={handleClick}>{label}</Checkbox>
        </FormGroup>
    </Col>;
