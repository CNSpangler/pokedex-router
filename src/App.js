import React, { Component } from 'react';
import './App.css';
import { 
  Route, 
  Link,
  Switch,
  BrowserRouter as Router, 
} from 'react-router-dom';
import ListPage from './ListPage.js';
import DetailPage from './DetailPage.js';
import About from './About.js';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1>Gotta Catch 'em All!</h1>
          <Link to="/">Home</Link><br />
          <Link to="/about/a">About Me</Link><br />
          <div className="switch">
            <Switch>
              <Route exact path="/:search?" component={ListPage} />
              <Route path="/about" component={About} />
              <Route path="/:pokemon/:page" component={DetailPage} />
              {/* <Route component={NotFound} /> */}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}