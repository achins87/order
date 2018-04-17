import React, { Component } from 'react';
import './App.css';
import {Order} from './cart';
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
                <Redirect exact from="/" to="/order"/>
                <Route exact path="/order" component={Order}/>
            </Switch>
        </Router>
    );
  }
}

export default App;
