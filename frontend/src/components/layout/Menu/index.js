import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu as SemanticMenu } from "semantic-ui-react";
import { MenuContainer } from "./styles";

const { Item } = SemanticMenu;

const Menu = () => {
  const [activeItem, setActive] = useState("");

  const items = [
    {
      name: "Produtos",
      active: activeItem === "Produtos",
      onClick: () => setActive("Produtos"),
      to: "/produtos",
    },
  ];

  return (
    <MenuContainer>
      <SemanticMenu vertical text>
        {items.map(({ name, active, onClick, to }) => (
          <Item active={active} onClick={onClick}>
            <Link to={to}>{name}</Link>
          </Item>
        ))}
      </SemanticMenu>
    </MenuContainer>
  );
};

export default Menu;
