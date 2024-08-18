import { images } from "../../constants";

export class TestimonialModel {
  name: string = "";
  company: string = "";
  feedback: string = "";
  imgurl: string = "";
  constructor(name: string, company: string, feedback: string, imgurl: string) {
    this.name = name;
    this.company = company;
    this.feedback = feedback;
    this.imgurl = imgurl;
  }
}
export class BrandModel {
  name: string = "";
  imgurl: string = "";
  constructor(name: string, imgurl: string) {
    this.name = name;
    this.imgurl = imgurl;
  }
}

export const brandData: BrandModel[] = [
  new BrandModel("Simpaz Corporation", images.simpaz),
  new BrandModel("PHVCT A2888", images.phvct),
];

export const testimonialsData: TestimonialModel[] = [
  {
    name: "Thearong Py",
    company: "PHVCT A2888",
    feedback:
      "Vichea is a very good developer. He is very professional and responsive. He is very good at communication and always on time. He can handle multiple tasks at the same time. He has a full set of skills and is always willing to learn new things.",
    imgurl: images.thearong,
  },
  {
    name: "Seng Hout",
    company: "Freelancer Team",
    feedback:
      "I have had the privilege of working closely with Vichea for the past four years, and I wholeheartedly recommend him as a highly skilled and professional full-stack developer. Vichea's expertise in software engineering, spanning design, front-end development, back-end development, and DevOps, is truly impressive. He approaches his work with humility, continuously seeking opportunities to learn and grow. With his strong work ethic, attention to detail, and problem-solving abilities, Vichea consistently delivers exceptional results. I have witnessed firsthand his dedication and passion for his craft, and I am confident that he would be a valuable asset to any team or organization.",
    imgurl: images.hout,
  },
];
