import React from "react";
import { NavigationDots, SocialMedia } from "../components";

const AppWrap = (
  Component: React.FC,
  idName: string | undefined,
  classNames: string | undefined
) =>
  function HOC() {
    return (
      <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />

        <div className="app__wrapper app__flex">
          <Component />
          <div className="copyright">
            <p className="p-text">
              &copy; {new Date().getFullYear()} <span>Vichea Nath</span>
            </p>
            <p className="p-text">All rights reserved</p>
          </div>
        </div>
        {/* Navigation Dots */}
        <NavigationDots active={idName !== undefined ? idName : ""} />
      </div>
    );
  };

export default AppWrap;
