import React from "react";
import "./Home.scss";
import { messenger } from "../../utils";

const Home = ({ domainInfo, setDomainUrl, setDomainInfoVisibility }) => {
  const openDomainNotes = domain => {
    setDomainUrl(domain);
    setDomainInfoVisibility(false);
  };

  return (
    <section>
      <div className="header">
        <span>Domains</span>
        <span>
          <button className="btn" onClick={() => messenger({ action: "log" })}>
            Log
          </button>
          <button
            className="btn"
            onClick={() => messenger({ action: "clear" })}
          >
            Clear
          </button>
        </span>
      </div>
      <div className="listContainer">
        {Object.keys(domainInfo)
          .filter(domain => !!domainInfo[domain])
          .map(domain => (
            <div
              onClick={() => openDomainNotes(domain)}
              key={domain}
              className="item pointer"
            >
              <div className="content">{domain}</div>
              <div className="actions">
                <span className="count">{domainInfo[domain]}</span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Home;
