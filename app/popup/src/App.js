import React, { useState, useEffect } from "react";
import "./App.scss";

import Home from "./components/Home";
import Notes from "./components/Notes";
import { messenger, getData, setData } from "./utils";

const App = () => {
  const [domainInfoVisibility, setDomainInfoVisibility] = useState(false);
  const [domainUrl, setDomainUrl] = useState("others");
  const [notes, setNotes] = useState([]);
  const [domainInfo, setDomainInfo] = useState({});

  useEffect(() => {
    messenger({ action: "getURL" }, url => {
      setDomainUrl(url || "others");
      getData("notes", data => setNotes([...(data["notes"] || [])]));
    });
  }, []);

  useEffect(() => {
    const metaInfo = {};
    notes.forEach(({ url }) => {
      metaInfo[url] = metaInfo[url] ? metaInfo[url] + 1 : 1;
    });
    setDomainInfo(metaInfo);
    if (notes.length) setData("notes", [...notes]);
  }, [notes]);

  const showDomainInfo = () => {
    setDomainInfoVisibility(true);
    setDomainUrl(null);
  };

  return (
    <div className="container">
      {domainInfoVisibility ? (
        <Home
          domainInfo={domainInfo}
          setDomainUrl={setDomainUrl}
          setDomainInfoVisibility={setDomainInfoVisibility}
        />
      ) : (
        <Notes
          notes={notes.filter(note => note.url === domainUrl)}
          setNotes={setNotes}
          domainUrl={domainUrl}
          showDomainInfo={showDomainInfo}
        />
      )}
    </div>
  );
};

export default App;
