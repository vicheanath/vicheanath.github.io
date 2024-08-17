import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Testimonial.scss";

// Testimonial
const Testimonial = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  let brand = [
    {
      name: "Google",
      imgUrl: "https://cdn.sanity.io/images/3do82whm/production/7e7f1f4f0e7b4b3e8b3b3b3b3b3b3b3b3b3b3b3-2000x2000.png?w=200&h=200&fit=crop",
    },
  ];

  let testimonial = [
    {
      name: "John Doe",
      company: "Google",
      feedback: "I am very happy with the service. It was a great experience.",
      imgurl: "https://cdn.sanity.io/images/3do82whm/production/7e7f1f4f0e7b4b3e8b3b3b3b3b3b3b3b3b3b3b3-2000x2000.png?w=200&h=200&fit=crop",
    },
  ];

  // handle btn click
  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  // fetch testimonials data
  useEffect(() => {
    setBrands(brand);
    setTestimonials(testimonial);
  }, []);

  // current testimonial
  const test = testimonials[currentIndex];

  return (
    <>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            {/* customer image */}
            <img src={test.imgurl} alt="testimonial" />
            <div className="app__testimonial-content">
              {/* customer feedback */}
              <p className="p-text">{test.feedback}</p>
              {/* customer info */}
              <div>
                <h4 className="bold-text">{test.name}</h4>
                <h5 className="p-text">{test.company}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            {/* Left */}
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>
            {/* Right */}
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      {/* Brands */}
      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand._id}
          >
            <img src={brand.imgUrl} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__primarybg"
);
