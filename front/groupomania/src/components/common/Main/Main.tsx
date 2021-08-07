import React from "react";

export default function Main(props: any) {
  return (
    <main
      className={[
        "flex",
        "flex-col",
        "justify-start",
        "items-center",
        "px-4",
        "pb-4",
        "md:w-4/5",
        "max-w-screen-md",
        "mx-auto",
        "pt-16",
        "md:pt-24",
      ].join(" ")}
    >
      {props.children}
    </main>
  );
}
