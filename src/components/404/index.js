import React from "react";
import { Container } from "reactstrap";
import "./404.css";

export const NotFound = props => {
  return (
    <Container>
      <div className="NotFound">
        <h1>404 Not Found</h1>
        <button
          onClick={() => {
            props.history.push("/login");
          }}
        >
          Go to Main Page
        </button>
      </div>
    </Container>
  );
};
