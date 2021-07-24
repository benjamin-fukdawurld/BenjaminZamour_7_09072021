import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {
  checkEmail,
  getLoginErrors,
  getPasswordErrors,
} from "../../common/utils";
import axios from "axios";

interface SignInFormState {
  values: {
    login: string;
    password: string;
  };
  errors: {
    login?: string;
    password?: string;
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

  handleSubmit(event: any) {
    event.preventDefault();
    let data: any = {};
    if (checkEmail(this.state.values.login).isValid) {
      data.email = this.state.values.login;
    } else {
      data.login = this.state.values.login;
    }

    data.password = this.state.values.password;

    axios
      .post("http://localhost:5000/users/login", data)
      .then((res: any) => {
        localStorage.setItem(
          "groupomania_auth",
          JSON.stringify({ userId: res.data.userId, token: res.data.token })
        );
        const { values, errors, touched } = this.state;
        this.setState({ values, errors, touched });
        window.location.href = "/";
      })
      .catch((err) => {
        this.setState({
          alert: { variant: "danger", message: "Connexion échouée" },
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

  checkPassword(password: string): boolean {
    /*
    const passwordError = getPasswordErrors(password);
    let errors = this.state.errors;
    if (!passwordError) {
      delete errors.password;
    } else {
      errors.password = passwordError;
    }

    this.setState({ errors });

    return !passwordError;
    */

    return true;
  }

  get isValid() {
    return !this.state.errors.login && !this.state.errors.password;
  }

  render() {
    return (
      <React.Fragment>
        <Form
          className="w-50 mb-3 mx-auto d-flex flex-column justify-content-center align-items-center"
          onSubmit={this.handleSubmit}
        >
          <Form.Group className="w-100 mb-3" controlId="formBasicLogin">
            <Form.Label>Pseudo ou Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="pseudo ou email"
              value={this.state.values.login}
              isValid={!this.state.errors.login}
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
              isValid={!this.state.errors.password}
              isInvalid={
                this.state.touched.password && !!this.state.errors.password
              }
              onChange={this.handlePasswordChange}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {this.state.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <div>
            <Button variant="primary" type="submit" disabled={!this.isValid}>
              Se connecter
            </Button>
            <Link to="/signup">
              <Button variant="link">S'incrire</Button>
            </Link>
          </div>
        </Form>
        {!!this.state.alert && (
          <Alert variant={this.state.alert.variant}>
            {this.state.alert.message}
          </Alert>
        )}
      </React.Fragment>
    );
  }
}
