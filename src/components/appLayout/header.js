import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem, NavbarToggler, Collapse, NavbarText } from "reactstrap";
import { ROLES } from "../../constants";

import { logout } from "../../redux/slices/user";

export const Header = () => {
  const role = useSelector(state => state.user.role);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const adminNavs = [
    // eslint-disable-next-line
    <NavLink to="/admin" activeClassName="active" className="nav-link">
      Admin
    </NavLink>,
    // eslint-disable-next-line
    <NavLink to="/meals" activeClassName="active" className="nav-link">
      Meals
    </NavLink>,
  ];
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="dark" dark expand="md" fixed={"true"}>
      <NavLink to="/" activeClassName="active" className="navbar-brand nav-link">
        Home
      </NavLink>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto ml-3" navbar>
          {role === ROLES.ADMIN &&
            adminNavs.map((item, key) => {
              return <NavItem key={key}>{item}</NavItem>;
            })}
        </Nav>
        <NavbarText onClick={() => dispatch(logout())} className="nav-link btn">
          Logout
        </NavbarText>
      </Collapse>
    </Navbar>
  );
};
