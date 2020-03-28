import React, { useState, Fragment } from "react";
import { v4 as uuid } from "uuid";

import { ConfirmBox } from "../../UIComponents";
import { HomeIcon, EditIcon, DeleteIcon } from "../../assets/icons";
import "./Notes.scss";

const Notes = ({ notes, setNotes, domainUrl, showDomainInfo }) => {
  const [content, setContent] = useState("");
  const [editNote, setEditNote] = useState(null);

  const addNote = () => {
    if (!content) return;

    setNotes(prev => [
      ...prev,
      {
        url: domainUrl,
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

  const deleteNote = id =>
    setNotes(prev => [...prev.filter(item => item.id !== id)]);

  return (
    <section>
      <div className="header">
        <span className="flex">
          <span onClick={showDomainInfo} className="icon home-icon">
            <HomeIcon />
          </span>
          <span>Notes: {domainUrl}</span>
        </span>
        <span>Total: {notes.length}</span>
      </div>
      <div className="listContainer">
        {notes.length ? (
          notes.map(({ content, id }) => (
            <div
              key={id}
              className={`item${
                editNote && editNote.id === id ? " highlight" : ""
              }`}
            >
              <div className="content">{content}</div>
              <div className="actions">
                {editNote && editNote.id === id ? (
                  <button className="btn" onClick={clearNote}>
                    Cancel
                  </button>
                ) : (
                  <span className="actionButtons">
                    <span
                      onClick={() => setNoteToEdit(id)}
                      className="icon edit-icon"
                    >
                      <EditIcon />
                    </span>
                    <ConfirmBox onConfirm={() => deleteNote(id)}>
                      <span className="icon delete-icon">
                        <DeleteIcon />
                      </span>
                    </ConfirmBox>
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-message">Empty</div>
        )}
      </div>

      <div className="controls">
        <textarea
          value={content}
          onChange={({ target: { value } }) => setContent(value)}
          className="inputbox"
          placeholder="Enter Note.."
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
    </section>
  );
};

export default Notes;
