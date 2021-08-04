import React, { Component } from "react";
//import { Link } from "react-router-dom";

import {
  getEmailErrors,
  getLoginErrors,
  getPasswordErrors,
} from "../../common/utils";
import axios from "axios";

interface SignUpFormState {
  values: {
    email: string;
    login: string;
    password: string;
    confirmPassword: string;
  };
  errors: {
    email?: string;
    login?: string;
    password?: string;
    confirmPassword?: string;
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

  handleSubmit(event: any) {
    event.preventDefault();
    const { login, email, password } = this.state.values;
    axios
      .post("http://localhost:5000/users/signup", { login, email, password })
      .then((res) =>
        axios
          .post("http://localhost:5000/users/login", { login, password })
          .then((res: any) => {
            localStorage.setItem(
              "groupomania_auth",
              JSON.stringify({ userId: res.data.userId, token: res.data.token })
            );
            const { values, errors, touched } = this.state;
            this.setState({ values, errors, touched });
            window.location.href = "/";
          })
      )
      .catch((err) => {
        console.error(err);
        this.setState({
          alert: { variant: "danger", message: err.message },
        });
      });
  }

  checkLogin(login: string): boolean {
    const loginError = getLoginErrors(login);
    let errors = this.state.errors;
    if (!loginError) {
      delete errors.login;
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
      delete errors.email;
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
        delete errors.password;
      } else {
        delete errors.confirmPassword;
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
    return <React.Fragment></React.Fragment>;

    /*
      <Form
          className="w-50 mx-auto d-flex flex-column justify-content-center align-items-center"
          onSubmit={this.handleSubmit}
        >
          <Form.Group className="w-100 mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="adresse email"
              value={this.state.values.email}
              isValid={!this.state.errors.email && this.state.touched.email}
              isInvalid={this.state.touched.email && !!this.state.errors.email}
              onChange={this.handleEmailChange}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {this.state.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="w-100 mb-3" controlId="formBasicLogin">
            <Form.Label>pseudonyme</Form.Label>
            <Form.Control
              type="text"
              placeholder="choisissez un pseudo"
              value={this.state.values.login}
              isValid={!this.state.errors.login && this.state.touched.login}
              isInvalid={this.state.touched.login && !!this.state.errors.login}
              onChange={this.handleLoginChange}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {this.state.errors.login}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="w-100 mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mot de passe"
              value={this.state.values.password}
              isValid={
                !this.state.errors.password && this.state.touched.password
              }
              isInvalid={
                this.state.touched.password && !!this.state.errors.password
              }
              onChange={this.handlePasswordChange}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {this.state.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="w-100 mb-3"
            controlId="formBasicConfirmPassword"
          >
            <Form.Label>Confirmer le mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirmer mot de passe"
              value={this.state.values.confirmPassword}
              isValid={
                !this.state.errors.confirmPassword &&
                this.state.touched.confirmPassword
              }
              isInvalid={
                this.state.touched.confirmPassword &&
                !!this.state.errors.confirmPassword
              }
              onChange={this.handleConfirmPasswordChange}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {this.state.errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <div>
            <Button variant="primary" type="submit" disabled={!this.isValid}>
              S'inscrire
            </Button>
            <Link to="/signin">
              <Button variant="link">Se connecter</Button>
            </Link>
          </div>
        </Form>
        {!!this.state.alert && (
          <Alert variant={this.state.alert.variant}>
            {this.state.alert.message}
          </Alert>
        )}
    */
  }
}
