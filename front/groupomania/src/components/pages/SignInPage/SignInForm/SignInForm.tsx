import React, { Component } from "react";
import { Link } from "react-router-dom";
import { checkEmail, getLoginErrors } from "../../../../common/utils";

import Form from "../../../common/Form";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Context from "../../../../Context";

interface SignInFormState {
  values: {
    login: string;
    password: string;
  };
  errors: {
    login: string | null;
    password: string | null;
  };
  touched: {
    login: boolean;
    password: boolean;
  };
  alert?: {
    variant: string;
    message: string;
  };
}

export default class SignInForm extends Component<any, SignInFormState> {
  static contextType = Context;

  constructor(props: any) {
    super(props);

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      values: {
        login: "",
        password: "",
      },
      errors: {
        login: "Pseudonyme invalide",
        password: "Mot de passe invalide",
      },
      touched: {
        login: false,
        password: false,
      },
    };
  }

  handleLoginChange(event: any) {
    let values = this.state.values;
    let touched = this.state.touched;
    values.login = event.target.value;
    touched.login = true;
    this.setState({ values, touched }, () =>
      this.checkLogin(event.target.value)
    );
  }

  handlePasswordChange(event: any) {
    let values = this.state.values;
    let touched = this.state.touched;
    values.password = event.target.value;
    touched.password = true;
    this.setState({ values, touched }, () =>
      this.checkPassword(event.target.value)
    );
  }

  async handleSubmit(event: any) {
    event.preventDefault();
    let data: any = {};
    if (checkEmail(this.state.values.login).isValid) {
      data.email = this.state.values.login;
    } else {
      data.login = this.state.values.login;
    }

    data.password = this.state.values.password;

    try {
      await this.context.userService.logIn(data).then((res: any) => {
        const { values, errors, touched } = this.state;
        this.setState({ values, errors, touched });
        window.location.href = "/";
      });
      if (this.context.updater) {
        this.context.updater();
      }
    } catch (err) {
      this.setState({
        alert: { variant: "danger", message: "Connexion échouée" },
      });
    }
  }

  checkLogin(login: string): boolean {
    const loginError = getLoginErrors(login);
    let errors = this.state.errors;
    if (!loginError) {
      errors.login = null;
    } else {
      errors.login = loginError;
    }

    this.setState({ errors });

    return !loginError;
  }

  checkPassword(password: string): boolean {
    const passwordError = password.length >= 6 ? null : "Mot de passe invalid";
    let errors = this.state.errors;
    if (!passwordError) {
      errors.password = null;
    } else {
      errors.password = passwordError;
    }

    this.setState({ errors });

    return !passwordError;
  }

  get isValid() {
    return !this.state.errors.login && !this.state.errors.password;
  }

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit} className="w-full max-w-sm">
          <div className={["flex", "flex-col", "items-center"].join(" ")}>
            <TextField
              required
              className="w-5/6"
              label="Pseudo ou Email"
              value={this.state.values.login}
              onChange={this.handleLoginChange}
              error={!!this.state.errors.login && this.state.touched.login}
              helperText={this.state.touched.login && this.state.errors.login}
              placeholder="pseudo ou email"
            />
            <TextField
              required
              className="w-5/6"
              type="password"
              label="Mot de passe"
              value={this.state.values.password}
              onChange={this.handlePasswordChange}
              error={
                !!this.state.errors.password && this.state.touched.password
              }
              helperText={
                this.state.touched.password && this.state.errors.password
              }
              placeholder="mot de passe"
            />
          </div>
          <div>
            <div className="w-full mt-4 flex justify-evenly items-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                disabled={!this.isValid}
              >
                Connexion
              </Button>

              <Link to="/signup">
                <Button
                  variant="contained"
                  color="primary"
                  component="div"
                  size="small"
                >
                  S'incrire
                </Button>
              </Link>
            </div>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}
