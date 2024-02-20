import React, { useEffect } from "react";
import Banner from "../components/banner";
import gsap from "gsap";
import Projects from "../components/Projects";
import IntroOverlay from "../components/introOverlay";
import Skills from "../components/Skills";

let tl = gsap.timeline({ defaults: { duration: 1 } });

const homeAnimation = (completeAnimation) => {
  tl.from(".line span", {
    y: 100,
    ease: "power4.out",
    delay: 1,
    skewY: 7,
    stagger: {
      amount: 0.3,
    },
  })
    .to(".overlay-top", {
      height: 0,
      ease: "expo.inOut",
      stagger: 0.4,
    })
    .to(".overlay-bottom", {
      width: 0,
      ease: "expo.inOut",
      delay: -0.8,
      stagger: {
        amount: 0.4,
      },
    })
    .to(".intro-overlay", {
      css: { display: "none" },
    })
    .from(".case-image img", {
      scale: 1.4,
      ease: "expo.inOut",
      delay: -2,
      stagger: {
        amount: 0.4,
      },
      onComplete: completeAnimation,
    });
};

const Home = () => {
  const [animationComplete, setAnimationComplete] = React.useState(false);

  useEffect(() => {
    // Prevent flashing
    gsap.to("body", { css: { visibility: "visible" } });

    homeAnimation(setAnimationComplete(true));
  }, []);

  return (
    <React.Fragment>
      {!animationComplete ? <IntroOverlay /> : ""}
      <Banner />
      <Projects />
      <Skills />
    </React.Fragment>
  );
};

export default Home;
