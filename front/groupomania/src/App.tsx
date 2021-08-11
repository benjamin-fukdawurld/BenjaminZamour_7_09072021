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
import Context from "./Context";
import ContextManager from "./ContextManager";

interface AppState {
  contextManager: ContextManager;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      contextManager: new ContextManager(() =>
        this.setState({ contextManager: this.state.contextManager })
      ),
    };
  }

  componentDidMount() {
    this.state.contextManager.refreshUser();
    this.setState({ contextManager: this.state.contextManager });
  }

  render() {
    return (
      <Context.Provider value={this.state.contextManager}>
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
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/signup">
              <SignUpPage />
            </Route>
            <Route exact path="/signin">
              <SignInPage />
            </Route>
            <Route
              exact
              path={["/user", "/user/:id"]}
              render={(props: any) => (
                <UserProfilePage id={props.match?.params?.id} />
              )}
            />
          </div>
        </ThemeProvider>
      </Context.Provider>
    );
  }
}

export default App;
