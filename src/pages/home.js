import React, { useEffect } from "react";
import Banner from "../components/banner";
import gsap from "gsap";

let tl = gsap.timeline({ defaults: { duration: 1 } });

const homeAnimation = () => {
  tl.from(".line span", {
    y: 100,
    ease: "power4.out",
    delay: 1,
    skewY: 7,
    stagger: {
      amount: 0.3,
    },
  });
};

const Home = () => {
  useEffect(() => {
    // Prevent flashing
    gsap.to("body", 0, { css: { visibility: "visible" } });

    homeAnimation();
  }, []);

  return (
    <>
      {/* {!animationComplete ? <IntroOverlay /> : ""} */}
      <Banner />
      {/* <Cases /> */}
    </>
  );
};

export default Home;
