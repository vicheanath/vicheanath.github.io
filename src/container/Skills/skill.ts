import { images } from "../../constants";

export class Skill {
  name: string = "";
  icon: string = "";
  bgColor: string = "";
  constructor(name: string, icon: string, bgColor: string) {
    this.name = name;
    this.icon = icon;
    this.bgColor = bgColor;
  }
}

export const skillData = [
  new Skill("C#", images.csharp, "#cf77e6"),
  new Skill(".NET Core", images.dotnetcore, "#cbcbcb"),
  new Skill("Angular", images.angular, "#e794d9"),
  new Skill("SQL Server", images.sqlserver, "#cbcbcb"),
  new Skill("Postgrest", images.posgrest, "#336791"),
  new Skill("Docker", images.docker, "#8ed0ec"),
  new Skill("RabbitMQ", images.rabbitmq, "#e9a171"),
  new Skill("Redis", images.redis, "#cbcbcb"),
  new Skill("Vite", images.vite, "#cbcbcb"),
  new Skill("jQuery", images.jquery, "#90cef5"),
  new Skill("Webpack", images.webpack, "#8dd6f9"),
  new Skill("EF Core", images.efcore, "#cbcbcb"),
  new Skill("Python", images.python, "#93c2e9"),
  new Skill("React", images.react, "#dbdbdb"),
  new Skill("Redux", images.redux, "#c8b0ee"),
  new Skill("Sass", images.sass, "#f0afcf"),
  new Skill("TypeScript", images.typescript, "#77c0f0"),
  new Skill("HTML", images.html, "#eb9580"),
  new Skill("JavaScript", images.javascript, "#f0db4f"),
  new Skill("Git", images.mu5, "#aad4eb"),
  new Skill("Node", images.node, "#a9e4a1"),
];
