import React from "react";

export default function Main(props: any) {
  return (
    <main className="flex flex-col justify-evenly align-center mx-4 md:mx-auto container px-4 w-2/3 max-screen-md">
      {props.children}
    </main>
  );
}
