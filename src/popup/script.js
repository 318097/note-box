const notes = [];

const header = document.querySelector(".header");
const noteListContainer = document.querySelector(".noteList");
const textbox = document.querySelector(".inputbox");
const addNoteButton = document.querySelector(".addNote");

const renderNotes = () => {
  noteListContainer.textContent = "";
  notes.forEach(note => {
    const element = document.createElement("div");
    element.setAttribute("class", "item");
    element.innerHTML = note.content;

    noteListContainer.appendChild(element);
  });
};

const handleClick = () => {
  const content = textbox.value;
  if (!content) return;

  notes.push({ id: 23, content });
  textbox.value = "";
  renderNotes();
};

const initialize = () => {
  addNoteButton.addEventListener("click", handleClick);
  renderNotes();
};
initialize();
console.log("**POPUP**");

const messenger = (action, cb) => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action }, cb);
  });
};

messenger("getURL", url => {
  header.innerHTML = url;
});
