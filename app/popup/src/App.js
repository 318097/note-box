import React, { useState, useEffect } from "react";
import "./App.scss";

import Home from "./components/Home";
import Notes from "./components/Notes";
import { messenger, getData } from "./utils";

const App = () => {
  const [domainInfoVisibility, setDomainInfoVisibility] = useState(false);
  const [domainUrl, setDomainUrl] = useState("others");
  const [notes, setNotes] = useState([]);
  const [domainInfo, setDomainInfo] = useState([]);

  useEffect(() => {
    messenger("getURL", url => setDomainUrl(url || "others"));
  }, []);

  useEffect(() => {
    if (!domainUrl) return;

    getData("notes", ({ notes = {} }) => {
      const domainNotes = notes[domainUrl] || [];
      setNotes(domainNotes);

      const domainInfo = [];
      for (let url in notes) {
        domainInfo.push({ domain: url, count: notes[url].length });
      }
      setDomainInfo(domainInfo);
    });
  }, [domainUrl]);

  useEffect(() => {
    const saveNotes = () => {
      getData("notes", db => {
        const prevdata = db.notes || {};
        const updatedNotes = {
          ...prevdata,
          [domainUrl]: [...notes]
        };
        console.log("Updated Notes:", updatedNotes);
        chrome.storage.sync.set({ notes: updatedNotes });
      });
    };
    saveNotes();
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
          notes={notes}
          setNotes={setNotes}
          domainUrl={domainUrl}
          showDomainInfo={showDomainInfo}
        />
      )}
    </div>
  );
};

export default App;
