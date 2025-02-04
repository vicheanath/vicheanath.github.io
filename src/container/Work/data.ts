import _2mwin from "./../../assets/projects/2mwin.png";
import haha855 from "./../../assets/projects/haha.png";
import cssystem from "./../../assets/projects/cssystem.png";
import location from "./../../assets/projects/location.png";

import liveapp from "./../../assets/projects/liveapp/home.jpg";

export class Work {
  title: string = "";
  description: string = "";
  imageUrl: string = "";
  projectLink: string = "";
  codeLink: string = "";
  tags: Tag[] = [];
  techStack: string[] = [];

  constructor(
    title: string,
    description: string,
    imageUrl: string,
    projectLink: string,
    codeLink: string,
    tags: Tag[],
    techStack: string[] = []
  ) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.projectLink = projectLink;
    this.codeLink = codeLink;
    this.tags = tags;
    this.techStack = techStack;
  }
}

export class Tag {
  name: string = "";
  color: string = "";

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
  static SYSTEM = new Tag("System", "#313BAC");
  static WEB_DEVELOPMENT = new Tag("Web Development", "#313BAC");
  static ALL = new Tag("All", "#313BAC");
  static MOBILE_APP = new Tag("Mobile App", "#313BAC");
  static REACT_JS = new Tag("React JS", "#313BAC");
  static BACKEND = new Tag("Backend", "#313BAC");
  static FULL_STACK = new Tag("Full Stack", "#313BAC");

  static tags: Tag[] = [
    Tag.ALL,
    Tag.SYSTEM,
    Tag.WEB_DEVELOPMENT,
    Tag.MOBILE_APP,
    Tag.REACT_JS,
  ];
  static getTags(): Tag[] {
    return Tag.tags;
  }
}

export const worksData: Work[] = [
  new Work(
    "CS System",
    "CS System multi-tenant system is a for managing and tracking the payment of the company's employees.",
    cssystem,
    "https://www.google.com",
    "https://www.google.com",
    [Tag.SYSTEM, Tag.FULL_STACK],
    [".NET Core", "MVC", "Postgres", "Bootstrap", "React JS"]
  ),

  new Work(
    "Location",
    "Location is a web based system that allows users to track the location of their agents, across the country.",
    location,
    "https://www.google.com",
    "https://www.google.com",
    [Tag.SYSTEM, Tag.FULL_STACK],
    [".NET Core", "MVC", "Postgres"]
  ),

  new Work(
    "Live App",
    "Live App is a react native app that allows users to watch live streaming lottery draws.",
    liveapp,
    "https://www.google.com",
    "https://www.google.com",
    [Tag.MOBILE_APP, Tag.FULL_STACK],
    ["React Native", ".NET Core", "MVC", "Postgres"]
  ),
];
