import React, { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Testimonial.scss";
import {
  brandData,
  BrandModel,
  TestimonialModel,
  testimonialsData,
} from "./testimonial";
import { motion } from "framer-motion";

const TestimonialPage: React.FC = () => {
  const [brands, setBrands] = useState<BrandModel[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialModel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    setBrands(brandData);
    setTestimonials(testimonialsData);
  }, []);

  const test = testimonials[currentIndex];

  return (
    <>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={test.imgurl} alt="testimonial" />
            <div className="app__testimonial-content">
              <p className="p-text">{test.feedback}</p>
              <div>
                <h4 className="bold-text">{test.name}</h4>
                <h5 className="p-text">{test.company}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
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

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand.name}
          >
            <img src={brand.imgurl} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

const Testimonial = AppWrap(
  MotionWrap(TestimonialPage, "app__testimonial"),
  "testimonial",
  "app__primarybg"
);

export default Testimonial;
