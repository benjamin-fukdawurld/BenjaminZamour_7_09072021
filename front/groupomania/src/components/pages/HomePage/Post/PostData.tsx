import React from "react";
import { useTheme, makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

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

interface PostDataProps {
  mediaUrl: string | null;
  title: string | null;
  description: string | null;
  tags: string[] | null;
}

export default function PostData(props: PostDataProps) {
  const theme = useTheme<any>();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      {props.mediaUrl && (
        <img
          className={classes.media}
          src={props.mediaUrl}
          alt={props.title ?? ""}
        />
      )}
      {props.description && (
        <Typography className={classes.description} variant="body1">
          {props.description}
        </Typography>
      )}
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
    </div>
  );
}
