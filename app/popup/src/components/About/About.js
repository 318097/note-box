import React from "react";
import "./About.scss";
import { Icon } from "@codedrops/react-ui";

const About = ({ setActivePage }) => {
  return (
    <section id="about">
      <div className="header">
        <span className="flex center">
          <Icon
            fill="#fff"
            type="caret-left"
            className="icon back-icon"
            onClick={() => setActivePage("HOME")}
          />
          About
        </span>
      </div>
      <div className="about-content">
        <img src="https://raw.githubusercontent.com/318097/note-box/master/app/icons/icon32.png" />
        <h3>NoteBox</h3>
        <span>Developer: Mehul Lakhanpal</span>
        <span>Email: mehullakhanpal@gmail.com</span>
        <span>
          Website:{" "}
          <a href="www.codedrops.tech?utm_source=note-box&utm_content=about">
            www.codedrops.tech
          </a>
        </span>
        <a href="https://github.com/318097/note-box" target="_blank">
          Github
        </a>
      </div>
    </section>
  );
};

export default About;
