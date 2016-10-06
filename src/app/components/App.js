import React from "react";
import {connect} from 'react-redux'

import { User } from './User';
import { Main } from './Main';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "Max"
        };
    }

    changeUsername(newName) {

    }

    render() {
        return (
            <div className="container">
                <Main changeUsername={this.changeUsername.bind(this)}/>
                <User username={this.props.user.username}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer,
    math: state.mathReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setName: name => {
      dispatch({
        type: "SET_NAME",
        payload: name
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
