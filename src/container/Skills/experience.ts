export class Experience {
  startDate: Date = new Date();
  endDate: Date = new Date();
  companyNames: string = "";
  location: string = "";
  jobTitles: string = "";
  jobDescriptions: string[] = [];
  technologies: string[] = [];

  constructor(data: Partial<Experience>) {
    Object.assign(this, data);
  }
}

Date.prototype.toDateString = function () {
  const isCurrent =
    `${this.getMonth() + 1}/${this.getFullYear()}` ===
    `${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
  if (isCurrent) {
    return `Present`;
  }
  return `${this.getMonth() + 1}/${this.getFullYear()}`;
};

export const experienceData: Experience[] = [
  new Experience({
    startDate: new Date(2024, 3),
    endDate: new Date(),
    companyNames: "Simpaz Corporation",
    location: "Oregon, USA",
    jobTitles: "Full Stack .NET Developer",
    jobDescriptions: [
      "Developed a robust and secure microservices-based Point of Sale (POS) and Inventory system using C#.NET Core, EF Core, Dapper, MVC Pattern, implementing Domain-Driven Design (DDD) and Command Query Responsibility Segregation (CQRS). Utilized PostgreSQL for data persistence, adhering to an N-tier architecture. Created an Angular frontend, integrated with REST APIs, for features like Stock Adjustment and Purchase Order Requests. Ensured comprehensive testing across the stack with XUnit, Moq, and Jasmine.",
      "Developed a multi-tenant SaaS HR application using C# .NET Core, leveraging Domain-Driven Design (DDD) and Command Query Responsibility Segregation (CQRS). Implemented secure tenant isolation with custom middleware and EF Core interceptors for seamless tenant separation within the business logic. Utilized Webpack to bundle Angular into micro-frontends, enabling modular separation for each tenancy module.",
      "Developed unit tests in the application layer using mock data and tested the domain layer to validate business logic. Implemented automated testing to ensure code correctness and reduce bugs in production deployments.",
      "Extensive experience with Visual Studio 2017-2022, utilizing a wide range of testing tools including XUnit, and NUnit for unit testing, as well as Moq for mock data generation. Proficient in using built-in debugging and profiling tools to ensure code quality and performance.",
      "Served as a Scrum Master for an Agile team, leading stand-up meetings, retrospectives, requirement thering, and story sizing to ensure on-time project delivery.",
      "Designed an optimized relational database schema to efficiently store and manage store stock adjustment history, ensuring effective query performance. Implemented pagination for enhanced query efficiency and developed advanced SQL constructs, including complex queries, stored procedures, and Common Table Expressions (CTEs), to retrieve data effectively.",
    ],
    technologies: [
      ".NET Core 8",
      "SQL Server",
      "MVC",
      "Dapper",
      "Entity Framework Core",
      "PostgreSQL",
      "Angular 17",
      "RxJs",
      "TypeScript",
      "jQuery",
      "Karma",
      "Jasmine",
      "HTML",
      "CSS",
      "Visual Studio",
      "Bootstrap",
      "Gitlab",
      "MassTransit",
      "Kubernetes",
      "RabbitMQ",
      "SSIS",
      "Xunit",
    ],
  }),
  new Experience({
    startDate: new Date(2021, 6),
    endDate: new Date(2023, 8),
    companyNames: "PHVCT A2888",
    location: "Phnom Penh, Cambodia",
    jobTitles: "Software Engineer",
    jobDescriptions: [
      "Implemented secure application API Integration login and register by using ASP.NET Core API and using Frontend React.js, HTML, CSS, jQuery, Webpack, and Bootstrap for UI and Grid System responsive to allow web application to support all device.",
      "Participated in the full development lifecycle of a Location Management System, from requirements gathering and planning to design class diagram and database design. Developed the system using .NET Core, MVC Pattern, SQL Server, jQuery, and Bootstrap to manage company agent registration and securely store documents on AWS S3, ensuring scalability.",
      "Implemented an API for analyzing and searching location distances by developing algorithms to compute distances and display results on a map. Used .NET Core, EF Core, .NET MVC for backend development, optimized search performance with database indexing, and created a React.js UI integrated with Google Maps API for visualizing results.",
      "Automated the build and deployment process by configuring a GitHub Action CI/CD pipeline. This streamlined approach facilitates efficient testing and ensures consistent deployment of Docker Images to the Docker Registry. Achieved a 20% reduction in deployment time.",
      "Created comprehensive API documentation and conducted API testing with Postman to ensure a smooth transition of the project to other teams with fully documented APIs.",
      "Enabled real-time communication between the application's backend and frontend by implementing a WebSocket application using SignalR. This fosters a more responsive user experience for critical functionalities.",
    ],
    technologies: [
      ".NET Core",
      "SQL Server",
      "MVC",
      "Dapper",
      "Entity Framework Core",
      "PostgreSQL",
      "React",
      "TypeScript",
      "JavaScript Framework Related",
      "Karma",
      "Jasmine",
      "Webpack",
      "HTML",
      "CSS",
      "Visual Studio",
      "Bootstrap",
      "Gitlab",
      "SignalR",
    ],
  }),

  new Experience({
    startDate: new Date(2018, 12),
    endDate: new Date(2021, 6),
    companyNames: "PLAN-B CAMBODIA",
    location: "Phnom Penh, Cambodia",
    jobTitles: "Full Stack Developer",
    jobDescriptions: [
     "Designed and optimized a News website using ASP.NET MVC, HTML, CSS, and jQuery, implementing server-side rendering to achieve high SEO quality and fast loading times.",
     "Developed reusable and well-tested React components using unit and integration testing frameworks. This approach ensured robust functionality and maintainability, facilitating efficient application development for various use cases.",
     "Boosted Single-Page Application (SPA) performance by 80% at startup. implementing a manual Webpack configuration with lazy loading, resulting in a significantly reduced React bundle size and faster loading times.",
     "Leveraged SQL Server Management Studio to optimize database queries. By analyzing execution plans and implementing efficient techniques, achieved a 30% improvement in data retrieval speed.",
     "Enhanced the user experience of .NET applications by effectively troubleshooting performance issues. Utilized Visual Studio's debugging tools to pinpoint bottlenecks and implement solutions, leading to a more responsive and efficient user experience.",
    ],
    technologies: [
      "ASP.NET Webform",
      ".NET MVC .Net Core",
      "SQL Server",
      "React JS",
      "Redux",
      "EF Core HTML",
      "CSS",
      "Figma",
      "Waterfall",
      "Scrum",
      "Tailwind CSS",
    ],
  }),
];
