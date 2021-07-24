import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { IconLeft, Icon } from "../Icons";
import Button from "react-bootstrap/Button";
import { getAuthData } from "../../common/auth";

export default function Header(props: any) {
  const authData = getAuthData();
  return (
    <header className="w-100 mb-3 bg-primary text-white p-4 d-flex flex-row justify-content-between align-items-center">
      <Link to="/">
        {useMediaQuery({ query: "(max-width: 768px)" }) ? (
          <Icon className="text-white" />
        ) : (
          <IconLeft className="text-white" />
        )}
      </Link>
      <div>
        {authData?.authenticated ? (
          <React.Fragment>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "2.5rem", height: "2.5rem" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Button>
            <Button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "2.5rem", height: "2.5rem" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/signup">
              <Button variant="primary">Se connecter</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary">S'incrire</Button>
            </Link>
          </React.Fragment>
        )}
      </div>
    </header>
  );
}
