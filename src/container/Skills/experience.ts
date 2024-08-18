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
    startDate: new Date(2024, 4),
    endDate: new Date(),
    companyNames: "Simpaz Corporation",
    location: "Oregon, USA",
    jobTitles: "Full Stack .NET Developer",
    jobDescriptions: [
      "Build a highly secure Point of Sale & Inventory using C# .NET Core, DDD, CQRS, Postgres, N-tire Layer. The secured API employed microservices for scalability and utilized TDD for high test coverage, ensuring a robust and maintainable codebase.",
      "Developed Task Scheduler Cron Job using C# .NET Core that nightly run update current stock in inventory and summarize report.",
      "Create ETL process using SSIS Package to collect sale and inventory historical data to report database for offline custom report without impact current system performance. This package has been scheduled to run once every night",
      "Build Secured REST API using C# .NET Core and CORS to allow only white list domain access to our API endpoint.",
      "Developed a multi-tenant SaaS HR Application using C# .NET Core, DDD, CQRS. This involved implementing secure tenant isolation, ensuring data separation and a personalized user experience for each tenant.",
      "Designed and isolated reusable Angular Components with comprehensive unit test with Jasmine, ensuring robust functionality and maintainability across diverse use cases.",
      "Maintains high code quality through unit testing with Xunit and adherence to TDD principles. Participates in code reviews and pair programming sessions, fostering collaboration and knowledge transfer within the development team.",
      "Utilized story sizing, event storming, and worked closely stakeholder engagement to define and break down user stories. This ensured a comprehensive understanding of project scope and facilitated successful sprint deliveries.",
      "Design a relational database schema to efficiently store the structure and user-submitted data for dynamic forms. Additionally, provide SQL constructs (complex query, stored procedure, CTE) to retrieve data effectively.",
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
      "Implemented secure application authentication using ASP.NET Core API and integrated Firebase Authentication. reduced the risk of unauthorized access and bolstered overall application security.",
      "Streamlined agent management for a nationwide network by developing a web application with C# .NET, leveraging a modular monolithic architecture. The application, paired with PostgreSQL, S3, EC2, EKS and React, automated agent registration and secured document storage. This shift from manual (Excel) processes to a centralized system improved operational efficiency by 70%.",
      "Experience using Code Scanning with SonaCloud in project to Reduce Bugs and Code Vulnerability.",
      "Automated the build and deployment process by configuring a GitHub Action CI/CD pipeline. This streamlined approach facilitates efficient testing and ensures consistent deployment of Docker Images to the Docker Registry. Achieved a 20% reduction in deployment time.",
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
    startDate: new Date(2020, 9),
    endDate: new Date(2021, 6),
    companyNames: "PLAN-B CAMBODIA",
    location: "Phnom Penh, Cambodia",
    jobTitles: "Full Stack Developer",
    jobDescriptions: [
      "Developed reusable and well-tested React components using unit and integration testing frameworks. This approach ensured robust functionality and maintainability, facilitating efficient application development for various use cases.",
      "Boosted Single-Page Application (SPA) performance by 80% at startup. implementing a manual Webpack configuration with lazy loading, resulting in a significantly reduced React bundle size and faster loading times.",
      "Leveraged SQL Server Management Studio to optimize database queries. By analyzing execution plans and implementing efficient techniques, achieved a 30% improvement in data retrieval speed.",
      "Enhanced the user experience of .NET applications by effectively troubleshooting performance issues. utilized Visual Studio's debugging tools to pinpoint bottlenecks and implement solutions, leading to a more responsive and efficient user experience",
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
