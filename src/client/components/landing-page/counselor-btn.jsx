import React from 'react';
import styles from '../../styles/buttons.scss';
import { Button, Row, Col, FormGroup, FormControl  } from 'react-bootstrap'


export class CounselorBtn extends React.Component {
    constructor(){
        super()
        this.state = {
            displayZip: false
        }
    }

    displayZipBtn(){
        this.setState({displayZip: true});
    }



    render(){
        return(
            <div>
                {!this.state.displayZip ? (

                    <Button
                            className={ styles.helpBtn + " pull-right"}
                            onClick={this.displayZipBtn.bind(this)}
                    >
                        TALK TO A COUNSELOR
                    </Button>

                ) : (
                    <div>
                            <Col xs={6}>
                                <FormGroup style={{display: "inline"}}>
                                    <FormControl style={{display: "inline"}} type="text" placeholder="Enter Zipcode" />
                                </FormGroup>
                            </Col>
                                <Button
                                    className={ styles.findCounselorsBtn + " pull-right" }
                                    onClick={this.on}
                                >
                                    LETS DO THIS
                                </Button>
                    </div>
                )}
            </div>
        )
    }
}

export default CounselorBtn;