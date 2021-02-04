import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { ConfirmBox, Button, Icon, Input } from "@codedrops/react-ui";
import "./Notes.scss";

const createNewNote = ({ activeDomain, content, type = "NOTE" }) => ({
  url: activeDomain,
  id: uuid(),
  content,
  createdAt: new Date().toISOString(),
  done: false,
  type,
});

const Notes = ({ notes, setNotes, activeDomain, showHomePage }) => {
  const [content, setContent] = useState("");
  const [editNote, setEditNote] = useState(null);

  const addNote = () => {
    if (!content) return;

    setNotes((prev) => [...prev, createNewNote({ activeDomain, content })]);
    setContent("");
  };

  const setNoteToEdit = (id) => {
    setEditNote({
      id,
      mode: "EDIT",
    });
    const matchedNote = notes.find((item) => item.id === id);
    setContent(matchedNote.content);
  };

  const updateNote = () => {
    const { id } = editNote;
    updateNoteById(id, { content });
    clearNote();
  };

  const updateNoteById = (id, update) =>
    setNotes((prev) => [
      ...prev.map((item) => {
        return item.id === id
          ? {
              ...item,
              ...update,
            }
          : item;
      }),
    ]);

  const clearNote = () => {
    setContent("");
    setEditNote(null);
  };

  const deleteNote = (id) =>
    setNotes((prev) => [...prev.filter((item) => item.id !== id)]);

  return (
    <section>
      <div className="header">
        <span className="flex center">
          <Icon
            onClick={showHomePage}
            className="icon home-icon mr"
            type="home"
            fill={"#fff"}
          />
          <span className="active-domain">{activeDomain}</span>
        </span>
        <span>Total: {notes.length}</span>
      </div>
      <div className="list-container">
        {notes.length ? (
          notes.map((item, index) => (
            <CardItem
              key={item.id}
              item={item}
              index={index}
              editNote={editNote}
              clearNote={clearNote}
              setNoteToEdit={setNoteToEdit}
              deleteNote={deleteNote}
              updateNoteById={updateNoteById}
            />
          ))
        ) : (
          <div className="empty-message">Empty</div>
        )}
      </div>

      <Controls
        content={content}
        setContent={setContent}
        editNote={editNote}
        addNote={addNote}
        updateNote={updateNote}
      />
    </section>
  );
};

const CardItem = ({
  item: { content, id, done },
  index,
  editNote,
  clearNote,
  setNoteToEdit,
  deleteNote,
  updateNoteById,
}) => {
  return (
    <div
      key={id}
      className={`item ${editNote && editNote.id === id ? "highlight" : ""} ${
        done ? "done" : ""
      }`}
    >
      <div className="content">
        {`${index + 1}.`}
        <span>{content}</span>
      </div>
      <div className="actions">
        {editNote && editNote.id === id ? (
          <Button
            style={{ height: "26px" }}
            size="sm"
            className="btn"
            onClick={clearNote}
          >
            Cancel
          </Button>
        ) : (
          <span className="action-buttons">
            {!done && (
              <Icon
                title="Mark as done"
                size={14}
                onClick={() => updateNoteById(id, { done: true })}
                className="icon tick-icon"
                type="check"
              />
            )}
            <Icon
              title="Edit"
              size={14}
              onClick={() => setNoteToEdit(id)}
              className="icon edit-icon"
              type="edit"
            />
            <ConfirmBox onConfirm={() => deleteNote(id)}>
              <Icon
                title="Delete"
                size={14}
                className="icon delete-icon"
                type="delete"
              />
            </ConfirmBox>
          </span>
        )}
      </div>
    </div>
  );
};

const Controls = ({ content, setContent, editNote, addNote, updateNote }) => {
  return (
    <div className="controls">
      <Input
        autoFocus
        value={content}
        onChange={(e, value) => setContent(value)}
        onKeyPress={(e) => {
          if (e.which !== 13) return;
          editNote && editNote.mode === "EDIT" ? updateNote() : addNote();
        }}
        className="inputbox"
        placeholder="Enter Note.."
      />
      {editNote && editNote.mode === "EDIT" ? (
        <Button onClick={updateNote} className="btn">
          Update
        </Button>
      ) : (
        <Button onClick={addNote} className="btn">
          Add
        </Button>
      )}
    </div>
  );
};

export default Notes;
