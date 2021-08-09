import { AxiosInstance } from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { getAuthData, isLogged } from "../../../common/auth";
import Main from "../../common/Main";
import createServer from "../../../server/server";
import UserProfile from "./UserProfile";
import Context from "../../../Context";

interface UserProfileProps {}

interface UserProfileState {
  id: number;
  touched: any;
  userNewValues: any | null;
  departments: any[];
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
      id: getAuthData()?.userId as number,
      userNewValues: null,
      touched: {},
      departments: [],
    };

    this.server = createServer(getAuthData()?.token);

    this.handleSaveUser = this.handleSaveUser.bind(this);
  }

  async handleSaveUser() {
    try {
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
      this.setState({ userNewValues, touched: {} });
    } catch (err: any) {
      console.error(err.message);
    }
  }

  async componentDidMount() {
    try {
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
      this.setState({ userNewValues, departments: departmentRes.data });
    } catch (err: any) {
      console.error(err.message);
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
      </Main>
    );
  }
}
