import React, { useEffect } from "react";
import Banner from "../components/banner";
import gsap from "gsap";
import Projects from "../components/Projects";
import IntroOverlay from "../components/introOverlay";

let tl = gsap.timeline({ defaults: { duration: 1 } });

const homeAnimation = (animationComplete) => {
  tl.from(".line span", {
    y: 100,
    duration: 1.8,
    delay: 1,
    skewY: 7,
    stagger: 0.3,
  })
    .to(".overlay-top", { height: 0, duration: 1, stagger: 0.4, delay: -0.5 })
    .to(".overlay-bottom", { width: 0, duration: 1, stagger: 0.4, delay: -0.8 })
    .to(".intro-overlay", { css: { display: "none" } });
};

const Home = () => {
  const [animationComplete, setAnimationComplete] = React.useState(false);

  useEffect(() => {
    // Prevent flashing
    gsap.to("body", { css: { visibility: "visible" } });

    homeAnimation(setAnimationComplete(true));
  }, []);

  return (
    <div className="container">
      {!animationComplete ? <IntroOverlay /> : ""}
      <Banner />
      <Projects />
    </div>
  );
};

export default Home;
