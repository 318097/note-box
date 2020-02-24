const notes = [];

const header = document.querySelector(".header");
const noteListContainer = document.querySelector(".noteList");
const textbox = document.querySelector(".inputbox");
const addNoteButton = document.querySelector(".addNote");

const renderNotes = () => {
  const output = notes.map(note => {
    const element = document.createElement("div");
    element.setAttribute("class", "item");
    element.innerHTML = note.content;
    return element;
  });

  if (output.length) noteListContainer.appendChild(...output);
};

const handleClick = () => {
  const content = textbox.value;
  if (!content) return;

  notes.push({ id: 23, content });
  textbox.value = "";
  console.log(notes);
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

// chrome.storage.sync.get("color", function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute("value", data.color);
// });

// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({ active: true, currentWindow: true }, function(
//     tabs
//   ) {
//     chrome.tabs.executeScript(tabs[0].id, {
//       code: 'document.body.style.backgroundColor = "' + color + '";'
//     });
//   });
// };
