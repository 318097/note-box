import React from "react";
import "./Home.scss";

const Home = ({
  data,
  setActiveDomain,
  clearNotes,
  setActivePage,
  exportNotes,
  activeDomain,
}) => {
  const openDomainNotes = (domain) => {
    setActiveDomain(domain);
    setActivePage("DOMAIN");
  };

  return (
    <section>
      <div className="header">
        <span>Note Box: Domains</span>
        <span className="fcc menu">
          <span className="menu-item" onClick={() => setActivePage("ABOUT")}>
            About
          </span>
          <span className="menu-item ml" onClick={exportNotes}>
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
              className={`item pointer${
                activeDomain === domain ? " active-domain" : ""
              }`}
            >
              <div className="content-wrapper">
                <div className="content domain-name">{`${
                  index + 1
                }. ${domain}`}</div>
              </div>
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
