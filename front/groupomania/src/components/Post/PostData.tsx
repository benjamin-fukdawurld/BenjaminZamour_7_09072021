import React, { useState } from "react";
import { useTheme, makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import { PostDataProps } from "./interfaces";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import ImageIcon from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: any) => ({
  root: {
    margin: theme.spacing(2),
  },
  media: {},
  description: {},
  tagList: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "start",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  tag: {
    margin: theme.spacing(1),
    height: "1.5rem",
  },
}));

export default function PostData(props: PostDataProps) {
  const [currentTag, setCurrentTag] = useState("");
  const theme = useTheme<any>();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      {props.mediaUrl && (
        <div style={{ position: "relative" }}>
          <img
            className={classes.media}
            src={props.mediaUrl}
            alt={props.title ?? ""}
          />
          {props.isEditing && (
            <Fab
              style={{ position: "absolute", bottom: 0, right: 0 }}
              color="primary"
              title={"supprimer l'image"}
              onClick={props.onDeleteImage}
            >
              <DeleteIcon />
            </Fab>
          )}
        </div>
      )}
      {props.isEditing && (
        <label htmlFor="edit-post-image-file">
          <Button
            variant="contained"
            startIcon={<ImageIcon />}
            component="span"
            size="small"
          >
            <input
              accept="image/*"
              id="edit-post-image-file"
              type="file"
              hidden
              onChange={(event: any) => {
                if (!event.target.files.length) {
                  return;
                }
                props.onImageChange(
                  event.target.files[0],
                  URL.createObjectURL(event.target.files[0])
                );
              }}
            />
            Chosir une image
          </Button>
        </label>
      )}
      {props.description &&
        (props.isEditing ? (
          <TextField
            multiline
            rows={4}
            value={props.description}
            onChange={props.onDescriptionChange}
            style={{ width: "100%" }}
          />
        ) : (
          <Typography className={classes.description} variant="body1">
            {props.description}
          </Typography>
        ))}
      {props.isEditing ? (
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl>
              <InputLabel htmlFor="edit-tag-input-field">Tag</InputLabel>
              <Input
                id="edit-tag-input-field"
                type="text"
                value={currentTag}
                onChange={(event: any) => {
                  setCurrentTag(event.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        props.onAddTag(currentTag);
                        setCurrentTag("");
                      }}
                      color="primary"
                      disabled={!currentTag || props.tags?.includes(currentTag)}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {props.tags?.map((tag: string, index: number) => {
                return (
                  <Grid item key={index}>
                    <Chip
                      label={tag}
                      color="primary"
                      onDelete={() => props.onDeleteTag(tag)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.tagList}>
          {props.tags?.map((tag: string, index: number) => (
            <Chip
              key={index}
              label={tag}
              className={classes.tag}
              color="primary"
            />
          ))}
        </div>
      )}
    </div>
  );
}
