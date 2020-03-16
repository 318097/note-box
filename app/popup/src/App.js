import React, { useState, useEffect } from "react";
import "./styles.css";

function messenger(action, cb) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action }, cb);
  });
}

function getData(key, cb) {
  chrome.storage.sync.get(key, cb);
}

function clearNotes() {
  chrome.storage.sync.clear(() => console.log("Cleared..."));
}

const App = () => {
  const [notes, setNotes] = useState([]);
  const [domainUrl, setDomainUrl] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    messenger("getURL", (url = "Others") => {
      setDomainUrl(url);

      getData("notes", data => {
        const domainNotes = (data.notes && data.notes[url]) || [];
        setNotes(domainNotes);
      });
    });
    console.log("**POPUP**");
  }, []);

  useEffect(() => {
    const saveNotes = () => {
      getData("notes", data => {
        const prevdata = data.notes || {};
        const updatedNotes = { ...prevdata, [domainUrl]: notes };
        chrome.storage.sync.set({ notes: updatedNotes });
      });
    };
    saveNotes();
  }, [notes]);

  const addNote = () => {
    if (!content) return;

    setNotes(prev => [
      ...prev,
      {
        id: Math.round(Math.random() * 100),
        content,
        createdAt: new Date().toISOString()
      }
    ]);
    setContent("");
  };

  return (
    <div className="container">
      <div className="header">{`Notes: ${domainUrl}`}</div>
      <div className="noteList">
        {notes.map(({ content, id }) => (
          <div key={id} className="item">
            {content}
          </div>
        ))}
      </div>
      <div className="controls">
        <textarea
          value={content}
          onChange={({ target: { value } }) => setContent(value)}
          className="inputbox"
        />
        <button onClick={addNote} className="addNote">
          Add
        </button>
      </div>
    </div>
  );
};

export default App;
