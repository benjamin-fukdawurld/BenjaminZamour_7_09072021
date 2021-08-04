import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUpPage from "./components/pages/SignUpPage";
import SignInPage from "./components/pages/SignInPage";

import Header from "./components/Header";
import HomePage from "./components/pages/HomePage";

class App extends Component {
  render() {
    const pages = [
      {
        path: "/signup",
        component: SignUpPage,
      },
      {
        path: "/signin",
        component: SignInPage,
      },
      {
        path: "/",
        component: HomePage,
      },
    ];

    return (
      <React.Fragment>
        <Header />
        {pages.map((page) => (
          <Route exact {...page} key={page.path} />
        ))}
      </React.Fragment>
    );
  }
}

export default App;
