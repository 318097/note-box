import React, { Fragment } from "react";
import "./Home.scss";
import { messenger } from "../../utils";

const Home = ({
  domainInfo,
  setDomainUrl,
  clearNotes,
  setDomainInfoVisibility
}) => {
  const openDomainNotes = domain => {
    setDomainUrl(domain);
    setDomainInfoVisibility(false);
  };

  const domainList = Object.keys(domainInfo);
  return (
    <section>
      <div className="header">
        <span>Domains</span>
        <span>
          <button className="btn" onClick={() => messenger({ action: "log" })}>
            Log
          </button>
          <button className="btn" onClick={clearNotes}>
            Clear
          </button>
        </span>
      </div>
      <div className="listContainer">
        {domainList.length ? (
          <Fragment>
            {domainList
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
          </Fragment>
        ) : (
          <div className="empty-message">Empty</div>
        )}
      </div>
    </section>
  );
};

export default Home;
