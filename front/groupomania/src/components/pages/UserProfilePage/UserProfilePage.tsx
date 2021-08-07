import { AxiosInstance } from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { getAuthData, isLogged } from "../../../common/auth";
import Main from "../../common/Main";
import createServer from "../../../common/server";
import UserProfile from "./UserProfile";

interface UserProfileProps {}

interface UserProfileState {
  id: number;
  touched: any;
  user: any | null;
  departments: any[];
}

export default class UserProfilePage extends Component<
  UserProfileProps,
  UserProfileState
> {
  private server: AxiosInstance;
  constructor(props: any) {
    super(props);

    this.state = {
      id: getAuthData()?.userId as number,
      user: null,
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
              this.state.user[key] ? this.state.user[key] : null,
            ])
          );
        }

        const formData = new FormData();
        formData.append("image", this.state.user.avatar);
        const user = Object.fromEntries(
          Object.keys(this.state.touched)
            .filter((key) => key !== "avatar")
            .map((key: string) => [
              key,
              this.state.user[key] ? this.state.user[key] : null,
            ])
        );
        formData.append("user", JSON.stringify(user));

        return formData;
      };

      await this.server.patch(`users/${this.state.id}`, generateData());

      this.setState({ touched: {} });
    } catch (err: any) {
      console.error(err.message);
    }
  }

  async componentDidMount() {
    try {
      const userRes = await this.server.get(`users/${this.state.id}/profile`);
      const user = Object.fromEntries(
        Object.entries(userRes.data).map(([key, value]) => {
          if (key === "birthDate" && value !== null) {
            return [key, new Date(value as string)];
          }

          return [key, value ? value : ""];
        })
      );
      const departmentRes = await this.server.get(`departments`);
      this.setState({ user, departments: departmentRes.data });
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
          user={this.state.user}
          departments={this.state.departments}
          isReadOnly={this.state.user}
          touched={this.state.touched}
          onChange={(fields: any) => {
            const keys = Object.keys(fields);
            const touched = this.state.touched;
            for (const key of keys) {
              touched[key] = true;
            }
            const user = Object.assign({}, this.state.user, fields);
            this.setState({ user, touched });
          }}
          onSave={this.handleSaveUser}
        />
      </Main>
    );
  }
}
