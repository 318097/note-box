import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import EditIcon from "./assets/edit.svg";
import DeleteIcon from "./assets/delete.svg";
import "./styles.css";

function messenger(action, cb) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action }, cb);
  });
}

function getData(key, cb) {
  chrome.storage.sync.get(key, cb);
}

// function clearNotes() {
//   chrome.storage.sync.clear(() => console.log("Cleared..."));
// }

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
        id: uuid(),
        content,
        createdAt: new Date().toISOString()
      }
    ]);
    setContent("");
  };

  const deleteNote = id => {
    setNotes(prev => [...prev.filter(item => item.id !== id)]);
  };

  return (
    <div className="container">
      <div className="header">{`Notes: ${domainUrl}`}</div>
      <div className="noteList">
        {notes.map(({ content, id }) => (
          <div key={id} className="item">
            <div className="note">{content}</div>
            <div className="actions">
              <span className="icon edit-icon">
                <EditIcon />
              </span>
              <span onClick={() => deleteNote(id)} className="icon delete-icon">
                <DeleteIcon />
              </span>
            </div>
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
