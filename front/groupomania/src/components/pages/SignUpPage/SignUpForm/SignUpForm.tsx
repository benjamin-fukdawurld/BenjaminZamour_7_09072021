import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  getEmailErrors,
  getLoginErrors,
  getPasswordErrors,
} from "../../../../common/utils";

import Form from "../../../common/Form";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Context from "../../../../Context";

interface SignUpFormState {
  values: {
    email: string;
    login: string;
    password: string;
    confirmPassword: string;
  };
  errors: {
    email: string | null;
    login: string | null;
    password: string | null;
    confirmPassword: string | null;
  };
  touched: {
    email: boolean;
    login: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
  alert?: {
    variant: string;
    message: string;
  };
}

export default class SignUpForm extends Component<{}, SignUpFormState> {
  static contextType = Context;
  constructor(props: any) {
    super(props);

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange =
      this.handleConfirmPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      values: {
        email: "",
        login: "",
        password: "",
        confirmPassword: "",
      },
      errors: {
        email: "Missing email",
        login: "Missing login",
        password: "Missing password",
        confirmPassword: "Missing password",
      },
      touched: {
        email: false,
        login: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  handleEmailChange(event: any) {
    let values = this.state.values;
    let touched = this.state.touched;
    values.email = event.target.value;
    touched.email = true;
    this.setState({ values, touched }, () =>
      this.checkEmail(event.target.value)
    );
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

  handleConfirmPasswordChange(event: any) {
    let values = this.state.values;
    let touched = this.state.touched;
    values.confirmPassword = event.target.value;
    touched.confirmPassword = true;
    this.setState({ values, touched }, () =>
      this.checkPassword(event.target.value, true)
    );
  }

  async handleSubmit(event: any) {
    event.preventDefault();
    const { login, email, password } = this.state.values;

    try {
      await this.context.userService.signUp({ login, email, password });
      await this.context.userService.logIn({ login, password });
      if (this.context.updater) {
        this.context.updater();
      }
      window.location.href = "/";
    } catch (err: any) {
      console.error(err);
      this.setState({
        alert: { variant: "danger", message: err.message },
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

  checkEmail(email: string): boolean {
    const emailError = getEmailErrors(email);
    let errors = this.state.errors;
    if (!emailError) {
      errors.email = null;
    } else {
      errors.email = emailError;
    }

    this.setState({ errors });

    return !emailError;
  }

  checkPassword(password: string, isConfirm: boolean = false): boolean {
    const passwordError = getPasswordErrors(password);
    let errors = this.state.errors;
    if (!passwordError) {
      if (!isConfirm) {
        errors.password = null;
      } else {
        errors.confirmPassword = null;
      }
    } else {
      if (!isConfirm) {
        errors.password = passwordError;
      } else {
        errors.confirmPassword = passwordError;
      }
    }

    this.setState({ errors });

    return !passwordError;
  }

  get isValid() {
    return (
      !this.state.errors.email &&
      !this.state.errors.login &&
      !this.state.errors.password &&
      !this.state.errors.confirmPassword &&
      this.state.values.password === this.state.values.confirmPassword
    );
  }

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit} className="w-full max-w-sm">
          <div className={["flex", "flex-col", "items-center"].join(" ")}>
            <TextField
              required
              className="w-5/6"
              label="Pseudonyme"
              value={this.state.values.login}
              onChange={this.handleLoginChange}
              error={!!this.state.errors.login && this.state.touched.login}
              helperText={this.state.touched.login && this.state.errors.login}
              placeholder="Pseudonyme"
            />
            <TextField
              required
              className="w-5/6"
              label="Email"
              value={this.state.values.email}
              onChange={this.handleEmailChange}
              error={!!this.state.errors.email && this.state.touched.email}
              helperText={this.state.touched.email && this.state.errors.email}
              placeholder="Email"
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
            <TextField
              required
              className="w-5/6"
              type="password"
              label="Confirmer mot de passe"
              value={this.state.values.confirmPassword}
              onChange={this.handleConfirmPasswordChange}
              error={
                !!this.state.errors.confirmPassword &&
                this.state.touched.confirmPassword
              }
              helperText={
                this.state.touched.confirmPassword &&
                this.state.errors.confirmPassword
              }
              placeholder="Mot de passe"
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
                S'incrire
              </Button>
              <Link to="/signin">
                <Button
                  variant="contained"
                  color="primary"
                  component="div"
                  size="small"
                >
                  Connexion
                </Button>
              </Link>
            </div>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}
