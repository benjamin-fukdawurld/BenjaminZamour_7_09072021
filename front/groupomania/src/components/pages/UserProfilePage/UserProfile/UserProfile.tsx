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
  onDelete: () => void;
}

interface UserProfileState {
  isEditing: boolean;
  avatarPreviewUrl: string | null;
}

export default class UserProfile extends Component<
  UserProfileProps,
  UserProfileState
> {
  constructor(props: UserProfileProps) {
    super(props);

    this.state = {
      isEditing: false,
      avatarPreviewUrl: null,
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
                    this.setState({
                      avatarPreviewUrl: URL.createObjectURL(
                        event.target.files[0]
                      ),
                    });
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
              src={this.state.avatarPreviewUrl ?? this.props.user?.avatarUrl}
            />
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
          {!this.props.isReadOnly && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => {
                  this.props.onDelete();
                }}
              >
                Supprimer
              </Button>
              <Button
                variant="contained"
                size="small"
                color="primary"
                style={{ marginLeft: "1rem" }}
                onClick={() => {
                  if (this.state.isEditing) {
                    this.props.onSave();
                  }

                  if (this.state.avatarPreviewUrl) {
                    URL.revokeObjectURL(this.state.avatarPreviewUrl);
                  }

                  this.setState({
                    isEditing: !this.state.isEditing,
                    avatarPreviewUrl: null,
                  });
                }}
              >
                {this.state.isEditing ? "Enregistrer" : "Éditer"}
              </Button>
            </div>
          )}
        </InfoContainer>
      </User>
    );
  }
}
