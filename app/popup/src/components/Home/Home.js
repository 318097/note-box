import React, { Fragment } from "react";
import "./Home.scss";
import { messenger } from "../../utils";
import { Button } from "@codedrops/react-ui";

const Home = ({ domainInfo, setDomainUrl, clearNotes, setShowDomainPage }) => {
  const openDomainNotes = (domain) => {
    setDomainUrl(domain);
    setShowDomainPage(true);
  };

  const domainList = Object.keys(domainInfo);
  return (
    <section>
      <div className="header">
        <span>Domains</span>
        <span>
          <Button
            size="sm"
            className="btn"
            onClick={() => messenger({ action: "log" })}
          >
            Log
          </Button>
          <Button size="sm" className="btn" onClick={clearNotes}>
            Clear
          </Button>
        </span>
      </div>
      <div className="list-container">
        {domainList.length ? (
          <Fragment>
            {domainList
              .filter((domain) => !!domainInfo[domain])
              .map((domain) => (
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
