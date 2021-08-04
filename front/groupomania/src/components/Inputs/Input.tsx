import React, { Component, RefObject } from "react";

type HtmlInputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

interface InnerInputProps {
  type: HtmlInputType;
  autocomplete?: string;
  autofocus?: boolean;
  disabled?: boolean;
  form?: string;
  list?: string;
  name?: string;
  readonly?: boolean;
  required?: boolean;
  tabindex?: number;
  placeholder: string;
}

interface InputProps {
  value?: any;
  defaultValue?: any;
  onChange?: any;
  inputRef?: RefObject<HTMLInputElement>;
  inputProps?: InnerInputProps;
  validationCallback: (val: any) => string | null;
}

interface InputState {
  touched: boolean;
  error: string | null;
}

export default class Input extends Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);

    this.state = {
      touched: false,
      error: props.validationCallback(props.value ?? props.defaultValue),
    };
  }

  render() {
    const { value, defaultValue } = this.props;
    return (
      <input
        {...{ value, defaultValue }}
        ref={this.props.inputRef}
        {...this.props.inputProps}
      />
    );
  }
}
