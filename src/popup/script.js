window.onload = () => {
  const notes = [];
  let domainUrl = "Others";

  const header = document.querySelector(".header");
  const noteListContainer = document.querySelector(".noteList");
  const textbox = document.querySelector(".inputbox");
  const addNoteButton = document.querySelector(".addNote");

  initialize();

  function renderNotes() {
    noteListContainer.textContent = "";
    notes.forEach(note => {
      const element = document.createElement("div");
      element.setAttribute("class", "item");
      element.innerHTML = note.content;

      noteListContainer.appendChild(element);
    });
  }

  function addNote() {
    const content = textbox.value;
    if (!content) return;

    notes.push({
      id: Math.round(Math.random() * 100),
      content,
      createdAt: new Date().toISOString()
    });
    textbox.value = "";
    renderNotes();
    saveNotes();
  }

  function initialize() {
    addNoteButton.addEventListener("click", addNote);
    header.addEventListener("click", () => messenger("logData"));
    messenger("getURL", url => {
      header.innerHTML = `Notes: ${url || "Others"}`;
      domainUrl = url;

      getDate("notes", data => {
        const domainNotes = (data.notes && data.notes[url]) || [];
        notes.push(...domainNotes);
        renderNotes();
      });
    });
    console.log("**POPUP**");
  }

  function clearNotes() {
    chrome.storage.sync.clear(() => console.log("Cleared..."));
  }

  function messenger(action, cb) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { action }, cb);
    });
  }

  function saveNotes() {
    getDate("notes", data => {
      const prevdata = data.notes || {};
      const updatedNotes = { ...prevdata, [domainUrl]: notes };
      chrome.storage.sync.set({ notes: updatedNotes }, result =>
        console.log("Saved:", result)
      );
    });
  }

  function getDate(key, cb) {
    chrome.storage.sync.get(key, cb);
  }
};
