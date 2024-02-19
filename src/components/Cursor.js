import React, { useEffect } from "react";
import { gsap } from "gsap";

const Cursor = () => {
  useEffect(() => {
    let cursor = document.querySelector(".cursor");
    const cursorMove = (e) => {
      let x = e.clientX;
      let y = e.clientY;
      gsap.to(cursor, { top: y, left: x, duration: 0.5, ease: "power4.out" });
    };

    document.addEventListener("mousemove", cursorMove);

    const cursorHover = (e) => {
      cursor.classList.add("active");
    };

    const cursorUnhover = (e) => {
      cursor.classList.remove("active");
    };

    const cursorClick = () => {
      cursor.classList.add("click");

      setTimeout(() => {
        cursor.classList.remove("click");
      }, 500);
    };

    const linksElement = ["a", "button", ".link"];

    const links = document.querySelectorAll(linksElement.join(", "));

    links.forEach((link) => {
      link.addEventListener("mouseover", () => {
        cursor.classList.add("hovered");
      });
      link.addEventListener("mouseleave", () => {
        cursor.classList.remove("hovered");
      });
    });

    const hoverDisplayImage = document.querySelectorAll(".hover-display-image");

    hoverDisplayImage.forEach((image) => {
      const imageURL = image.dataset.image;
      image.addEventListener("mouseover", () => {
        cursor.classList.add("hovered-image");
        gsap.to(cursor, { backgroundImage: `url(${imageURL})` });
      });
      image.addEventListener("mouseleave", () => {
        cursor.classList.remove("hovered-image");
        gsap.to(cursor, { backgroundImage: "none" });
      });
    });

    document.addEventListener("mouseover", cursorHover);
    document.addEventListener("mouseout", cursorUnhover);
    document.addEventListener("click", cursorClick);

    return () => {
      document.removeEventListener("mouseover", cursorHover);
      document.removeEventListener("mouseout", cursorUnhover);
      document.removeEventListener("click", cursorClick);
    };
  }, []);

  return (
    <div className="wrap-cursor">
      <div className="cursor"></div>
    </div>
  );
};

export default Cursor;
