import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as UpArrow } from "../assets/up-arrow-circle.svg";
import { openMenu, closeMenu } from "../animations/menuAnimations";
import { useDimensions } from "../hooks/useDimensions";

// Define reducer

const Header = ({ dimensions }) => {
  const [menuState, setMenuState] = useState({ menuOpened: false });
  const { width, height } = useDimensions();
  useEffect(() => {
    if (menuState.menuOpened) {
      openMenu(width);
    } else if (!menuState.menuOpened) {
      closeMenu();
    }
  });

  return (
    <div className="header">
      <div className="container">
        <div className="row v-center space-between">
          <div className="logo">
            <Link to="/">
              Vichea Nath
            </Link>
          </div>
          <div className="nav-toggle">
            <div
              onClick={() => setMenuState({ menuOpened: true })}
              className="hamburger-menu link"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div
              className="hamburger-menu-close"
              onClick={() => setMenuState({ menuOpened: false })}
            >
              <UpArrow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
