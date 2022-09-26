import React from "react";
import { Nav, NavItem } from "@douyinfe/semi-ui";

const NavMenu: React.FC = () => {
  return (
    <Nav mode="horizontal">
      <Nav.Sub text="menu1">
        <NavItem text="111"></NavItem>
        <NavItem text="222"></NavItem>
      </Nav.Sub>
    </Nav>
  );
};

export default NavMenu;
