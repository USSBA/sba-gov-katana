import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as NameActions from '../action-creators/name.js';

class NameInput extends React.Component {
    static propTypes = {
        actions: React.PropTypes.object.isRequired
    }
    doStuff(event){
        let value = event.target.value;
        this.props.actions.updateName(num);
    }
    render(){
        return (
            <div>
            <ul>
                {this.props.names.map((n) => (<li>n</li>))}
            </ul>
            <input 
                type="text"
                value={this.props.name}
                onChange={this.doStuff}
            />   
            </div>
        );
    }
}

function mapStateToProps(state) {
  console.log("The state is " + JSON.stringify(state));
  return {
    name: state.name,
    names: state.names
  };
}

function mapDispatchToProps(dispatch) {
  return{
    actions: bindActionCreators(NameActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameInput);



