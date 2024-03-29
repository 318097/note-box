import React, { useState, Fragment, memo } from "react";
import { v4 as uuid } from "uuid";
import { isEqual } from "lodash";
import dayjs from "dayjs";
import { ConfirmBox, Button, Icon, Input, Select } from "@codedrops/react-ui";
import "./Notes.scss";
import { INITIAL_FILTER_STATE, sortOptions } from "../../constants";
import * as tracking from "../../tracking";

const createNewNote = ({ activeDomain, content, absUrl }) => ({
  id: uuid(),
  createdAt: new Date().toISOString(),
  done: false,
  url: activeDomain,
  content,
  absUrl,
});

const Notes = ({
  notesObj,
  setNotes,
  activeDomain,
  setActivePage,
  absUrl,
  filters,
  setFilters,
}) => {
  const { notes, exactNotes, totalCount, totalDone } = notesObj;

  const [content, setContent] = useState("");
  const [editNote, setEditNote] = useState(null);

  const addNote = () => {
    if (!content) return;

    setNotes((prev) => [
      ...prev,
      createNewNote({ activeDomain, content, absUrl }),
    ]);
    setContent("");
    tracking.track("Add Note", { url: activeDomain, absUrl });
  };

  const setNoteToEdit = (id) => {
    setEditNote({
      id,
      mode: "EDIT",
    });
    const matchedNote = [...notes, ...exactNotes].find(
      (item) => item.id === id
    );
    if (matchedNote) setContent(matchedNote.content);
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

  const showClearButton = !isEqual(filters, INITIAL_FILTER_STATE);

  return (
    <section>
      <div className="header">
        <span className="flex center">
          <Icon
            onClick={() => setActivePage("HOME")}
            className="icon home-icon mr"
            type="home"
            fill={"#fff"}
          />
          <span className="domain-name">{activeDomain}</span>
        </span>
        <span className="fcc">
          <span>Total: {totalCount}</span>
          {!!totalDone && (
            <span className="total-done">&nbsp;{`(${totalDone} done)`}</span>
          )}
        </span>
      </div>
      <div className="filters">
        <Input
          value={filters.search}
          onChange={(e, value) =>
            setFilters((prev) => ({ ...prev, search: value }))
          }
          className="inputbox"
          placeholder="Search"
          size="sm"
        />
        <Select
          size="sm"
          options={sortOptions}
          placeholder="Sort"
          value={filters.sortField}
          onChange={(e, value) =>
            setFilters((prev) => ({ ...prev, sortField: value }))
          }
        />
        <Button
          size="sm"
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              sortOrder: filters.sortOrder === "ASC" ? "DESC" : "ASC",
            }))
          }
        >
          {filters.sortOrder}
        </Button>
        {showClearButton && (
          <Icon
            onClick={() => setFilters(INITIAL_FILTER_STATE)}
            type="cancel-2"
          />
        )}
      </div>
      <div className="list-container">
        {notes.length || exactNotes.length ? (
          <Fragment>
            {!!exactNotes.length && (
              <div
                className="exact-match-container"
                style={notes.length ? {} : { borderBottom: "none" }}
              >
                <span className="exact-match">Exact URL match</span>
                {exactNotes.map((item, index) => (
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
                ))}
              </div>
            )}
            {notes.map((item, index) => (
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
            ))}
          </Fragment>
        ) : (
          <div className="empty-message">
            {filters.search ? "No search results." : "Empty"}
          </div>
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
  item: { content, id, done, createdAt },
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
      <div className="content-wrapper">
        <div className="content">
          {`${index + 1}. `}
          <span>{content}</span>
        </div>
        <span className="date">{`- ${dayjs(createdAt).format(
          "hh:mm A / DD MMM, YY"
        )}`}</span>
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

const Controls = memo(
  ({ content, setContent, editNote, addNote, updateNote }) => {
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
  }
);

export default Notes;
