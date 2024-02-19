import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <div className="container">
        <div className="nav-columns">
          <div className="nav-column">
            <div className="nav-label">Menu</div>
            <ul className="nav-links">
              <li>
                <Link to="/case-studies">Portfolio</Link>
              </li>
              <li>
                <Link to="/approach">Education</Link>
              </li>
              <li>
                <Link to="/services">Skills</Link>
              </li>
              <li>
                <Link to="/about-us">About</Link>
              </li>
            </ul>
          </div>
          <div className="nav-column">
            <div className="nav-label">Contact</div>
            <div className="nav-infos">
              <ul className="nav-info">
                <li className="nav-info-label">Email</li>
                <li>
                  <Link to="/contact" exact>
                    Get in touch with us
                  </Link>
                </li>
                <li>
                  <Link to="/audit" exact>
                    Get a free audit
                  </Link>
                </li>
              </ul>
              <ul className="nav-info">
                <li className="nav-info-label">Address</li>
                <li>1000 N 4th Street</li>
                <li>Fairfield, IA 52557</li>
                <li>United States</li>
              </ul>
              <ul className="nav-info">
                <li className="nav-info-label">Phone</li>
                <li>+1 (641) 233 9735</li>
              </ul>
              <ul className="nav-info">
                <li className="nav-info-label">Legal</li>
                <li>Privacy & Cookies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
