import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PostLoginPage from "./PostLoginPage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Welcome from "./Welcome";
import MainPage from "./MainPage";
import { Flash } from "./flash";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Flash />
          <div>
            <Route exact path="/" component={Welcome} />
            <ProtectedRoute path="/files" component={MainPage} />
            <Route path = "/after-login" component={PostLoginPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
