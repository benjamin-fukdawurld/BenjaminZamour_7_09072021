import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUpPage from "./components/pages/SignUpPage";
import SignInPage from "./components/pages/SignInPage";

import Header from "./components/Header";
import HomPage from "./components/pages/HomePage";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/" component={HomPage} />
      </React.Fragment>
    );
  }
}

export default App;
