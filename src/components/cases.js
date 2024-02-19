import React from "react";
import { ReactComponent as CasesNext } from "../assets/arrow-right.svg";
import { ReactComponent as CasesPrev } from "../assets/arrow-left.svg";

const projects = [
  {
    id: 1,
    subtitle: "Mini Property Management System",
    title: "Property management system website using React js and Spring.",
    img: "curology-min"
  },
  {
    id: 2,
    subtitle: "Chuon Nath Khmer dictionary", 
    title: "The Chuon Nath Khmer Dictionary is a Khmer-Khmer dictionary that was created by Samdech Sangha Raj Jhotañano Chuon Nath (1883-1969)",
    img: "yourspace-min"
  },
  {
    id: 3,
    subtitle: "Lumin",
    title: "For your best look ever",
    img: "lumin-min"
  }
];

const Cases = () => {
  return (
    <section className='cases'>
      <div className='container-fluid'>
        <div className='row'>
          {projects.map(caseItem => (
            <div className='case' key={caseItem.id}>
              <div className='case-details'>
                <span>{caseItem.subtitle}</span>
                <h2>{caseItem.title}</h2>
              </div>
              <div className='case-image'>
                <img
                  src={require(`../assets/${caseItem.img}.png`)}
                  alt={caseItem.title}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases;
