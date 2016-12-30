import React from 'react';
import { Grid, Navbar, Nav, NavItem, NavDropdown, MenuItem, Row, Col, Image, Button, Glyphicon, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import * as ContentActions from "../../actions/content.js";

class HappeningNow extends React.Component {
    componentDidMount(){
        this.props.actions.fetchHappeningNow();
    }
  render() {
    let items = [];
    let mdSize = 3;
    if(this.state.happeningNow){
        items = this.state.happeningNow.list;
        // TODO adjust mdSize based on list length
    }
    return (
        <Grid>
            <Row>
                {
                    items.map(function(item){
                        return <Col xs={12} sm={6} md={mdSize}>
                            <a href={item.field_url.url}>
                                <img src={item.field_image.file.uri} alt={item.field_image.alt}></img>
                            </a>
                            <p>{item.title}</p>
                        </Col>
                    })
                }
            </Row>
        </Grid>
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    happeningNow: reduxState.contentReducer.happeningNow
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ContentActions, dispatch)
  }
}
export default connect(
  mapReduxStateToProps,
  mapDispatchToProps
)(AdditionalInfoForm);
