import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { theme } from "../../../../Theme";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    margin: "1rem auto",
  },

  root: {
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(12px)",
    borderRadius: "0.75rem!important",
    padding: theme.spacing(2),
  },

  details: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "start",
    alignItems: "flex-end",
  },

  input: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },

  accordionSummary: {
    minHeight: "1rem",
    margin: 0,
  },

  accordionContent: {
    margin: 0,
  },

  accordionIcon: {
    padding: 0,
  },
}));

export default function PostForm(props: any) {
  const classes = useStyles();

  const [currentTag, setCurrentTag] = useState("");

  return (
    <form className={classes.form} onSubmit={props.onSubmit}>
      <Accordion className={classes.root}>
        <AccordionSummary
          classes={{
            root: classes.accordionSummary,
            content: classes.accordionContent,
            expandIcon: classes.accordionIcon,
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color="primary" style={{ margin: 0, fontWeight: "bold" }}>
            Nouveau post
          </Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails className={classes.details}>
          <TextField
            required
            label="Titre"
            className={classes.input}
            value={props.postTitle}
            onChange={props.onTitleChange}
          />
          <TextField
            required
            label="Contenu du post"
            className={classes.input}
            value={props.postText}
            onChange={props.onTextChange}
            multiline
            rows={6}
          />
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl>
                <InputLabel htmlFor="tag-input-field">Tag</InputLabel>
                <Input
                  id="tag-input-field"
                  type="text"
                  value={currentTag}
                  onChange={(event: any) => setCurrentTag(event.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          props.onAddTag(currentTag);
                          setCurrentTag("");
                        }}
                        color="primary"
                        disabled={
                          !currentTag || props.postTags.includes(currentTag)
                        }
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
                {props.postTags.map((tag: string) => {
                  return (
                    <Grid item>
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
          <Button
            variant="contained"
            color="primary"
            disabled={!props.postText.length || !props.postTitle.length}
            style={{ marginTop: theme.spacing(2) }}
            type="submit"
          >
            Publier
          </Button>
        </AccordionDetails>
      </Accordion>
    </form>
  );
}
