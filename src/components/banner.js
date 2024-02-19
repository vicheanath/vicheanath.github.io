import React from "react";
import { ReactComponent as RightArrow } from "../assets/arrow-right.svg";
import { ReactComponent as Github } from "../assets/github.svg";
import { ReactComponent as LinkedIn } from "../assets/linkedin.svg";
import { ReactComponent as Instagram } from "../assets/instagram.svg";
import { Link } from "react-router-dom";
import Profile from "./Profile";

const Banner = () => {
  return (
    <section className="main">
      <div className="container">
        <div className="row">
          <h2 className="main-title hover-display-image" data-image={require("../assets/profile.jpeg")}>
            <div className="line"> 
              <span>Vichea Nath</span>
            </div>
            <div className="line">
              <span>Full Stack Developer</span>
            </div>
          </h2>
          {/* <Profile/> */}
          <div className="btn-row">
            <div className="wrapper-btn">
              <Link href="/" className="hover-rotate">
                <RightArrow />
              </Link>
              <Link to="htts://github.com/vicheanath">
                <Github />
              </Link>
              <Link to="htts://linkedin.com/in/vicheanath">
                <LinkedIn />
              </Link>
              <Link to="htts://instagram.com/vicheanath">
                <Instagram />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
