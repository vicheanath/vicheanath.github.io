import React, { useEffect, useState } from "react";
import IntroOverlay from "../components/introOverlay";
import Banner from "../components/banner";
import Cases from "../components/cases";
import gsap from "gsap";
import { useDimensions } from "../hooks/useDimensions";

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
  const [animationComplete, setAnimationComplete] = useState(false);
  const { height, width } = useDimensions();
  const completeAnimation = () => {
    setAnimationComplete(true);
  };

  useEffect(() => {
    homeAnimation(completeAnimation);
  }, []);

  useEffect(() => {
    let vh = height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [height, width]);

  return (
    <>
      {!animationComplete ? <IntroOverlay /> : ""}
      <Banner />
      <Cases />
    </>
  );
};

export default Home;
