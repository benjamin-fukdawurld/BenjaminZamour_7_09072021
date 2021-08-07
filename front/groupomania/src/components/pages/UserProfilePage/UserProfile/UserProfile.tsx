import React, { Component } from "react";
import Information from "../Information";
import Login from "../Login";

import { User, Avatar, InfoContainer } from "./style";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

interface UserProfileProps {
  user: any;
  departments: any[];
  isReadOnly?: boolean;
  touched: any;
  onChange: (usr: any) => void;
  onSave: () => void;
}

interface UserProfileState {
  isEditing: boolean;
}

export default class UserProfile extends Component<
  UserProfileProps,
  UserProfileState
> {
  constructor(props: UserProfileProps) {
    super(props);

    this.state = {
      isEditing: false,
    };
  }

  render() {
    return (
      <User component="article">
        <label htmlFor="contained-button-file">
          <IconButton component="span" disabled={!this.state.isEditing}>
            {this.state.isEditing && (
              <form>
                <input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  hidden
                  onChange={(event: any) => {
                    this.props.onChange({
                      avatar:
                        event.target?.files?.length > 0
                          ? event.target.files[0]
                          : null,
                    });
                  }}
                />
              </form>
            )}
            <Avatar
              title="avatar de l'utilisateur"
              alt="avatar de l'utilisateur"
              src={this.props.user?.avatarUrl}
            />
            <input type="file" hidden />
          </IconButton>
        </label>
        <Login value={this.props.user?.login} />
        <InfoContainer>
          <Information
            user={this.props.user}
            departments={this.props.departments}
            isEditing={this.state.isEditing}
            onChange={this.props.onChange}
          />
          <div className="text-right">
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => {
                if (this.state.isEditing) {
                  this.props.onSave();
                }
                this.setState({ isEditing: !this.state.isEditing });
              }}
            >
              {this.state.isEditing ? "Enregistrer" : "Éditer"}
            </Button>
          </div>
        </InfoContainer>
      </User>
    );
  }
}
