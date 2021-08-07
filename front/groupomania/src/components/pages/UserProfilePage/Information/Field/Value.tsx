import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

interface ValueProps {
  value?: any;
  defaultValue?: any;
  onChange: (val: any) => any;
  formatter?: (val: any) => any;
  inputFormatter?: (val: any) => any;
  error: string | null;
  touched?: boolean;
  isEditing?: boolean;
  inputProps?: TextFieldProps;
  children?: any;
}

const useStyles = makeStyles((theme) => ({
  display: (props: ValueProps) => ({
    color: !!props.value
      ? theme.palette.text.primary
      : theme.palette.text.secondary,
    textOverflow: "ellipsis",
  }),
}));

export default function Value(props: ValueProps) {
  const classes = useStyles(props);

  if (props.isEditing) {
    return (
      <TextField
        value={
          props.inputFormatter && props.value
            ? props.inputFormatter(props.value)
            : props.value ?? ""
        }
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        error={props.touched && !!props.error}
        helperText={props.touched && props.error}
        placeholder="Non renseigné"
        {...props.inputProps}
      >
        {props.children}
      </TextField>
    );
  }

  return (
    <Typography className={classes.display} title={props.value} gutterBottom>
      {(props.formatter && props.value
        ? props.formatter(props.value)
        : props.value) || "Non renseigné"}
    </Typography>
  );
}
