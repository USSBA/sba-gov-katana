import React from 'react';
import styles from '../../styles/buttons.scss';
import { Button, Row, Col, FormGroup, FormControl  } from 'react-bootstrap'
import axios from 'axios';


export class CounselorBtn extends React.Component {
    constructor(){
        super();
        this.state = {
            displayZip: false,
            zip: ""
        }
    }

    displayZipBtn(){
        this.setState({displayZip: true});
    }

    postZipcode(){
        axios.post('/matchCounselors', {
            zipcode: this.state.zip
        })
            .then(function (res){
                document.location = res.data.redirectTo
            })
            .then(function (err){console.log(err)})
    }

    handleChange(e){
        this.setState({zip: e.target.value});
    }


    render() {
        return (
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
                                <FormControl style={{display: "inline"}}
                                             type="text"
                                             placeholder="Enter Zipcode"
                                             onChange={(e) => this.handleChange(e)}
                                />
                            </FormGroup>
                        </Col>

                        <Button
                            className={ styles.findCounselorsBtn + " pull-right" }
                            onClick={this.postZipcode.bind(this)}
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