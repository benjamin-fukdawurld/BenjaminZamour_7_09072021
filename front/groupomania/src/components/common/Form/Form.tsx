import React from "react";

export default function Form(props: any) {
  return (
    <form
      className={[
        "rounded-lg",
        "bg-white",
        "bg-opacity-60",
        "backdrop-filter",
        "backdrop-blur-sm",
        "p-4",
        "mx-2",
        props.className,
      ].join(" ")}
      onSubmit={props.onSubmit}
    >
      {props.children}
    </form>
  );
}
