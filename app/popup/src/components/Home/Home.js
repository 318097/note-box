import React from "react";
import "./Home.scss";

const Home = ({
  data,
  setActiveDomain,
  clearNotes,
  setActivePage,
  exportNotes,
}) => {
  const openDomainNotes = (domain) => {
    setActiveDomain(domain);
    setActivePage("DOMAIN");
  };
  return (
    <section>
      <div className="header">
        <span>NoteBox: Domains</span>
        <span className="fcc">
          <span
            className="about pointer"
            onClick={() => setActivePage("ABOUT")}
          >
            About
          </span>
          <span className="about pointer ml" onClick={exportNotes}>
            Export
          </span>
        </span>
        {/* <Button size="sm" className="btn" onClick={clearNotes}>
            Clear
          </Button> */}
      </div>
      <div className="list-container">
        {Object.entries(data)
          .filter(([, count]) => count)
          .map(([domain, count], index) => (
            <div
              onClick={() => openDomainNotes(domain)}
              key={domain}
              className="item pointer"
            >
              <div className="content active-domain">{`${
                index + 1
              }. ${domain}`}</div>
              <div className="actions">
                <span className="count">{count}</span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Home;
