import React from "react";
import Value from "./Value";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { TextFieldProps } from "@material-ui/core/TextField";

interface FieldProps {
  label: string;
  value: any;
  formatter?: (val: any) => any;
  inputFormatter?: (val: any) => any;
  onChange: (val: any) => any;
  error: string | null;
  touched?: boolean;
  isEditing: boolean;
  inputProps?: TextFieldProps;
  children?: any;
}

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: "bold",
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function Field(props: FieldProps) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography className={classes.label}>{props.label}:</Typography>
      <Value
        value={props.value}
        formatter={props.formatter}
        inputFormatter={props.inputFormatter}
        onChange={props.onChange}
        error={props.error}
        touched={props.touched}
        isEditing={props.isEditing}
        inputProps={props.inputProps}
      >
        {props.children}
      </Value>
    </React.Fragment>
  );
}
