import React from 'react';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import styles from '../../styles/buttons.scss';


export const ExpertHelpBtn = (props) => <div>
                                          <Button block className={ styles.helpBtn } href="#">EXPERT HELP</Button>
                                        </div>;