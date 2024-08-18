export class About {
  title: string = "";
  description: string = "";
  imgUrl: string = "";
  constructor(title: string, description: string, imgUrl: string) {
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}

export const aboutData: About[] = [
  new About(
    "Software Development",
    "I focus on developing full-stack applications that are scalable, secure, and maintainable.",
    "https://cdn.sanity.io/images/te28uz5q/production/db53adca404b7410a2869db815e4ce77da2e7e53-1200x900.png"
  ),
  new About(
    "Frontend Development",
    "I focus on crafting beautiful, user-driven interfaces that are easy to use and understand.",
    "https://cdn.sanity.io/images/te28uz5q/production/db53adca404b7410a2869db815e4ce77da2e7e53-1200x900.png"
  ),
  new About(
    "React Native Development",
    "I focus on developing cross-platform mobile applications that are scalable, secure, and maintainable.",
    "https://cdn.sanity.io/images/te28uz5q/production/db53adca404b7410a2869db815e4ce77da2e7e53-1200x900.png"
  ),
  new About(
    "Scripting & Automation",
    "I focus on writing scripts to automate repetitive tasks and save time. I have experience with Python, C# and web scraping.",
    "https://cdn.sanity.io/images/te28uz5q/production/db53adca404b7410a2869db815e4ce77da2e7e53-1200x900.png"
  ),
];
