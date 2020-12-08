import React, { Fragment } from "react";
import "./Home.scss";
import { messenger } from "../../utils";
import { Button } from "@codedrops/react-ui";

const Home = ({ data, setActiveDomain, clearNotes, setActivePage }) => {
  const openDomainNotes = (domain) => {
    setActiveDomain(domain);
    setActivePage("DOMAIN");
  };
  return (
    <section>
      <div className="header">
        <span>NoteBox: Domains</span>
        <span>
          {/* <Button
            size="sm"
            className="btn"
            onClick={() => messenger({ action: "log" })}
          >
            Log
          </Button> */}
          {/* <Button size="sm" className="btn" onClick={clearNotes}>
            Clear
          </Button> */}
        </span>
      </div>
      <div className="list-container">
        {Object.entries(data)
          .filter(([, notes]) => notes.length)
          .map(([domain, notes], index) => (
            <div
              onClick={() => openDomainNotes(domain)}
              key={domain}
              className="item pointer"
            >
              <div className="content">{`${index + 1}. ${domain}`}</div>
              <div className="actions">
                <span className="count">{notes.length}</span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Home;
