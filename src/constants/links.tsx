import { BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

// Navbar links
const navbar_links = [
  "home",
  "about",
  "work",
  "skills",
  "testimonial",
  "contact",
];

// Contact links
const contact_links = {
  email: "vicheanath23@gmail.com",
  phone: "+1 (641)-233-9735",
};

// Social links
const social_links = [
  {
    name: "Twitter",
    icon: <BsTwitter />,
    url: "http://twitter.com/vicheanath",
  },
  {
    name: "Facebook",
    icon: <FaFacebookF />,
    url: "http://facebook.com/vicheanath",
  },
  {
    name: "Github",
    icon: <AiFillGithub />,
    url: "http://github.com/vicheanath",
  },
];

// Source code
const resume =
  "https://drive.google.com/file/d/1464WpXcFNc3dHrRup-5DeRiV45ThTZch/view?usp=sharing";

const github = "https://github.com/vicheanath";

// links
const links = {
  navbar_links,
  contact_links,
  social_links,
  resume,
  github,
};

export default links;
