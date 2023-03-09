import React from "react";
import { Navbar, Button, Container, Row, Col, NavbarBrand, NavbarText } from "reactstrap";

export const Heading = ({ title = "Title", addButton, addButtonText, inviteButton }) => {
  return (
    <Container className="mt-3">
      <nav className="page-header navbar-light bg-light">
        <Row style={{ alignItems: "center" }}>
          <Col xs={12} md={4}>
            <a className="navbar-brand">
              <b className="navbar-text pl-4">{title}</b>
            </a>
          </Col>
          <Col xs={12} md={8}>
            <div className="center">
              {addButton && (
                <Button onClick={addButton} color="primary" className="btn w-45 mr-2 ">
                  {addButtonText}
                </Button>
              )}
              {inviteButton && (
                <Button color="primary" className="btn mr-2 w-45" onClick={inviteButton}>
                  Invite Friend
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </nav>
    </Container>
  );
};
