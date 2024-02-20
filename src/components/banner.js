import React from "react";
import { ReactComponent as RightArrow } from "../assets/arrow-right.svg";
import { ReactComponent as Github } from "../assets/github.svg";
import { ReactComponent as LinkedIn } from "../assets/linkedin.svg";
import { ReactComponent as Instagram } from "../assets/instagram.svg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="main">
      <div className="container">
        <div className="row">
          <h2
            className="main-title hover-display-image"
            data-image="/assets/profile.jpg"
          >
            <div className="line">
              <span>Vichea Nath</span>
            </div>
            <div className="line">
              <span>Full Stack Developer</span>
            </div>
          </h2>
          <div className="btn-row">
            <div className="wrapper-btn">
              <Link href="/" className="hover-rotate clicked">
                <RightArrow />
              </Link>
              <Link to="htts://github.com/vicheanath" className="clicked">
                <Github />
              </Link>
              <Link to="htts://linkedin.com/in/vicheanath" className="clicked">
                <LinkedIn />
              </Link>
              <Link to="htts://instagram.com/vicheanath" className="clicked">
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
