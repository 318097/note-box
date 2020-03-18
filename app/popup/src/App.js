import React, { useState, useEffect, Fragment } from "react";
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
  const [editNote, setEditNote] = useState(null);

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

  const setNoteToEdit = id => {
    setEditNote({
      id,
      mode: "EDIT"
    });
    const matchedNote = notes.find(item => item.id === id);
    setContent(matchedNote.content);
  };

  const updateNote = () => {
    const { id } = editNote;
    setNotes(prev => [
      ...prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            content
          };
        }
        return item;
      })
    ]);
    clearNote();
  };

  const clearNote = () => {
    setContent("");
    setEditNote(null);
  };

  const deleteNote = id => {
    setNotes(prev => [...prev.filter(item => item.id !== id)]);
  };

  return (
    <div className="container">
      <div className="header">{`Notes: ${domainUrl}`}</div>
      <div className="noteList">
        {notes.map(({ content, id }) => (
          <div
            key={id}
            className={`item ${editNote && editNote.id === id && "highlight"}`}
          >
            <div className="note">{content}</div>
            <div className="actions">
              {editNote && editNote.id === id ? (
                <button className="btn" onClick={clearNote}>
                  Cancel
                </button>
              ) : (
                <Fragment>
                  <span
                    onClick={() => setNoteToEdit(id)}
                    className="icon edit-icon"
                  >
                    <EditIcon />
                  </span>
                  <span
                    onClick={() => deleteNote(id)}
                    className="icon delete-icon"
                  >
                    <DeleteIcon />
                  </span>
                </Fragment>
              )}
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
        {editNote && editNote.mode === "EDIT" ? (
          <button onClick={updateNote} className="btn">
            Update
          </button>
        ) : (
          <button onClick={addNote} className="btn">
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
