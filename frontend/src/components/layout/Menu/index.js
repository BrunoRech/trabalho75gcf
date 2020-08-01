import React, { useState } from "react";
import { Menu as SemanticMenu } from "semantic-ui-react";
import { MenuContainer, Link } from "./styles";

const { Item } = SemanticMenu;

const Menu = () => {
  const [activeItem, setActive] = useState("");

  const items = [
    {
      name: "Dashboard",
      to: "/",
    },
    {
      name: "Produtos",
      to: "/produtos",
    },
  ];

  return (
    <MenuContainer>
      <SemanticMenu vertical text>
        {items.map(({ name, to }) => (
          <Item active={name === activeItem} onClick={() => setActive(name)}>
            <Link to={to}>{name}</Link>
          </Item>
        ))}
      </SemanticMenu>
    </MenuContainer>
  );
};

export default Menu;
