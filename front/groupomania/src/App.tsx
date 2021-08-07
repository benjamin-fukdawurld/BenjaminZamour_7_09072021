import React, { Component } from "react";
import { Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./components/pages/HomePage";
import SignUpPage from "./components/pages/SignUpPage";
import SignInPage from "./components/pages/SignInPage";
import UserProfilePage from "./components/pages/UserProfilePage";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { theme } from "./Theme";
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
        path: "/user",
        component: UserProfilePage,
      },
      {
        path: "/",
        component: HomePage,
      },
    ];

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          style={{
            backgroundImage: "url(/images/bg.jpg)",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          <Header />
          {pages.map((page) => (
            <Route exact {...page} key={page.path} />
          ))}
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
