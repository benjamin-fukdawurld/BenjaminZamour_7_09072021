import { AxiosInstance } from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { getAuthData, isLogged } from "../../../common/auth";
import Main from "../../common/Main";
import createServer from "../../../server/server";
import UserProfile from "./UserProfile";
import Context from "../../../Context";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { theme } from "../../../Theme";

interface UserProfileProps {
  id?: number;
}

interface UserProfileState {
  id: number;
  touched: any;
  userNewValues: any | null;
  departments: any[];
  alert?: {
    open: boolean;
    severity: "error" | "success" | "info" | "warning";
    message: string;
  };
  progress?: boolean;
}

export default class UserProfilePage extends Component<
  UserProfileProps,
  UserProfileState
> {
  static contextType = Context;
  private server: AxiosInstance;
  constructor(props: any) {
    super(props);

    this.state = {
      id: props.id || (getAuthData()?.userId as number),
      userNewValues: null,
      touched: {},
      departments: [],
    };

    this.server = createServer(getAuthData()?.token);

    this.handleSaveUser = this.handleSaveUser.bind(this);
  }

  async handleSaveUser() {
    try {
      this.setState({ progress: true });
      if (Object.keys(this.state.touched).length === 0) {
        return;
      }

      const generateData = () => {
        if (!this.state.touched.avatar) {
          return Object.fromEntries(
            Object.keys(this.state.touched).map((key: string) => [
              key,
              this.state.userNewValues[key]
                ? this.state.userNewValues[key]
                : null,
            ])
          );
        }

        const formData = new FormData();
        formData.append("image", this.state.userNewValues.avatar);
        const user = Object.fromEntries(
          Object.keys(this.state.touched)
            .filter((key) => key !== "avatar")
            .map((key: string) => [
              key,
              this.state.userNewValues[key]
                ? this.state.userNewValues[key]
                : null,
            ])
        );
        formData.append("user", JSON.stringify(user));

        return formData;
      };

      await this.context.userService.update(this.state.id, generateData());
      await this.context.refreshUser();
      const userNewValues = Object.fromEntries(
        Object.entries(this.context.user).map(([key, value]) => {
          if (key === "birthDate" && value !== null) {
            return [key, new Date(value as string)];
          }

          return [key, value ? value : ""];
        })
      );
      this.setState({ progress: undefined, userNewValues, touched: {} });
    } catch (err: any) {
      this.setState({ progress: undefined });
      this.setState({
        alert: {
          open: true,
          severity: "error",
          message: "Échec de la mise à jour du profil",
        },
      });
    }
  }

  async componentDidMount() {
    try {
      this.setState({ progress: true });
      const userRes = await this.server.get(`users/${this.state.id}/profile`);
      const userNewValues = Object.fromEntries(
        Object.entries(userRes.data).map(([key, value]) => {
          if (key === "birthDate" && value !== null) {
            return [key, new Date(value as string)];
          }

          return [key, value ? value : ""];
        })
      );
      const departmentRes = await this.server.get(`departments`);
      this.setState({
        progress: undefined,
        userNewValues,
        departments: departmentRes.data,
      });
    } catch (err: any) {
      this.setState({ progress: undefined });
      this.setState({
        alert: {
          open: true,
          severity: "error",
          message: "Échec du chargement du profil",
        },
      });
    }
  }

  render() {
    if (!isLogged()) {
      return <Redirect to="/signin" />;
    }

    return (
      <Main>
        <UserProfile
          user={this.state.userNewValues}
          departments={this.state.departments}
          isReadOnly={
            this.state.userNewValues?.id &&
            this.state.userNewValues.id !== this.context.authData.userId
          }
          touched={this.state.touched}
          onChange={(fields: any) => {
            const keys = Object.keys(fields);
            const touched = this.state.touched;
            if ("birthDate" in fields) {
              fields.birthDate = new Date(fields.birthDate);
            }
            for (const key of keys) {
              touched[key] = true;
            }
            const userNewValues = Object.assign(
              {},
              this.state.userNewValues,
              fields
            );
            this.setState({ userNewValues, touched });
          }}
          onSave={this.handleSaveUser}
        />
        <Snackbar
          open={this.state.alert?.open}
          autoHideDuration={6000}
          onClose={() => this.setState({ alert: undefined })}
        >
          <Alert severity={this.state.alert?.severity}>
            {this.state.alert?.message}
          </Alert>
        </Snackbar>
        <Backdrop
          open={!!this.state.progress}
          style={{
            zIndex: theme.zIndex.drawer + 1,
            color: theme.palette.primary.main,
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Main>
    );
  }
}
