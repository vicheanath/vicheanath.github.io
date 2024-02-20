import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as UpArrow } from "../assets/up-arrow-circle.svg";
import { openMenu, closeMenu } from "../animations/menuAnimations";
import { useDimensions } from "../hooks/useDimensions";
import { FaMoon, FaSun } from "react-icons/fa";
// Define reducer

const Header = () => {
  const [menuState, setMenuState] = useState({ menuOpened: false });
  const { width } = useDimensions();
  useEffect(() => {
    if (menuState.menuOpened) {
      openMenu(width);
    } else if (!menuState.menuOpened) {
      closeMenu();
    }
  });

  const handleChangeThemeToggle = () => {
    const isDark = document.body.classList.contains("dark");
    if (isDark) {
      document.body.classList.remove("dark");
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  };
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  return (
    <div className="header">
      <div className="container">
        <div className="row v-center space-between">
          <div className="logo">
            <Link to="/">Vichea Nath</Link>
          </div>

          <div className="nav">
            <button
              onClick={handleChangeThemeToggle}
              className="theme-switcher"
            >
              {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
            </button>

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
    </div>
  );
};
export default Header;
